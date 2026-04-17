import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // OpenRouter API Proxy
  app.post("/api/chat", async (req, res) => {
    const { messages } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error("Missing OPENROUTER_API_KEY in environment variables.");
      return res.status(500).json({ error: "Server configuration error" });
    }

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "https://ais-dev-wgeyx7z5y5tyonbust4hw5-266954197155.us-east1.run.app", // Optional, for including your app on openrouter.ai rankings.
          "X-Title": "HSAP Assistant", // Optional. Shows in rankings on openrouter.ai.
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "nvidia/nemotron-3-super-120b-a12b:free",
          "messages": [
            {
              "role": "system",
              "content": "Você é um expert em questões Hospitalares, um assistente virtual altamente qualificado para os colaboradores do Hospital Santo Antônio da Patrulha (HSAP). Seu objetivo é ajudar médicos, enfermeiros e equipe administrativa com informações técnicas, protocolos hospitalares, dúvidas sobre fluxos de atendimento e suporte geral. Seja sempre cordial, empático, preciso e profissional. Suas respostas devem ser baseadas em conhecimentos médicos e administrativos hospitalares sólidos."
            },
            ...messages
          ]
        })
      });

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error calling OpenRouter:", error);
      res.status(500).json({ error: "Failed to fetch from OpenRouter" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
