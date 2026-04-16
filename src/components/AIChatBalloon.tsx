/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Minimize2,
  Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function AIChatBalloon() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Olá! Sou o assistente virtual do Hospital Santo Antônio da Patrulha. Como posso ajudar você hoje?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const chatHistory = messages.map(m => ({
        role: m.role === "model" ? "assistant" : "user",
        content: m.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...chatHistory, { role: "user", content: userMessage }]
        }),
      });

      const data = await response.json();
      const modelText = data.choices?.[0]?.message?.content || "Desculpe, não consegui processar sua solicitação agora.";
      setMessages(prev => [...prev, { role: "model", text: modelText }]);
    } catch (error) {
      console.error("Erro no chat IA:", error);
      setMessages(prev => [...prev, { role: "model", text: "Ocorreu um erro na conexão. Por favor, tente novamente mais tarde." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isExpanded ? "700px" : "500px",
              width: isExpanded ? "600px" : "400px",
              maxWidth: "90vw",
              maxHeight: "85vh"
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="shadow-2xl rounded-3xl overflow-hidden border border-slate-200 bg-white flex flex-col"
          >
            <Card className="border-none shadow-none flex flex-col h-full rounded-none">
              <CardHeader className="bg-blue-600 text-white p-4 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-1.5 rounded-lg">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold">Assistente HSAP</CardTitle>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] opacity-80">IA Ativa</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-white hover:bg-white/10"
                    onClick={() => setIsExpanded(!isExpanded)}
                    title={isExpanded ? "Reduzir" : "Expandir"}
                  >
                    {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-white hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-grow p-4 overflow-hidden flex flex-col">
                    <div 
                      className="flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent" 
                      ref={scrollRef}
                    >
                      <div className="space-y-4 pb-4">
                        {messages.map((msg, i) => (
                          <div 
                            key={i} 
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                msg.role === "user" ? "bg-slate-100" : "bg-blue-100"
                              }`}>
                                {msg.role === "user" ? <User className="w-4 h-4 text-slate-600" /> : <Bot className="w-4 h-4 text-blue-600" />}
                              </div>
                              <div className={`p-3 rounded-2xl text-sm ${
                                msg.role === "user" 
                                  ? "bg-blue-600 text-white rounded-tr-none whitespace-pre-wrap" 
                                  : "bg-slate-100 text-slate-800 rounded-tl-none"
                              }`}>
                                {msg.role === "model" ? (
                                  <div className="markdown-content prose prose-sm max-w-none">
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                  </div>
                                ) : (
                                  msg.text
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="flex gap-2 items-center bg-slate-100 p-3 rounded-2xl rounded-tl-none">
                              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                              <span className="text-xs text-slate-500">Digitando...</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 border-t bg-slate-50">
                    <form 
                      className="flex w-full gap-2" 
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                      }}
                    >
                      <Input 
                        placeholder="Digite sua dúvida..." 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="rounded-xl border-slate-200 bg-white"
                        disabled={isLoading}
                      />
                      <Button 
                        type="submit" 
                        size="icon" 
                        className="bg-blue-600 hover:bg-blue-700 rounded-xl flex-shrink-0"
                        disabled={isLoading || !input.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors relative group"
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
        )}
        <div className="absolute right-full mr-4 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
          <p className="text-sm font-bold text-slate-800">Dúvidas? Fale com a IA</p>
        </div>
      </motion.button>
    </div>
  );
}
