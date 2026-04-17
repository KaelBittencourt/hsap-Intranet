export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
        "HTTP-Referer": req.headers.referer || "https://hsap-intranet.vercel.app", 
        "X-Title": "HSAP Assistant",
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
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error calling OpenRouter:", error);
    return res.status(500).json({ error: "Failed to fetch from OpenRouter" });
  }
}
