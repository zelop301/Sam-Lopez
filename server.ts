import express from "express";
import path from "path";
import dns from "dns";
import { GoogleGenAI } from "@google/genai";

// Ensure IPv4 binds correctly in sandbox environment
dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client Lazily/Safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Creator profile details for AI System Prompt
const CREATOR_PROFILE = {
  name: "Zelo",
  niche: "High-tactical FPS gaming, custom PC builds, and premium desk setups",
  email: "zelop301@gmail.com",
  socials: {
    tiktok: "@zelo_gaming (245K followers, 8.2M total likes, 12% engagement)",
    twitch: "zelo_live (42K followers)",
    youtube: "Zelo Gaming Tech (68K subscribers)",
    instagram: "@zelo.tech (35K followers)",
  },
  sponsorships: [
    {
      name: "Dedicated Sponsor TikTok (60s)",
      price: "$1,200 USD",
      deliverable: "Custom detailed review, product Link-in-Bio for 30 days, cross-post to Instagram Reels/YouTube Shorts."
    },
    {
      name: "Integrated Gaming Clip (15-20s)",
      price: "$550 USD",
      deliverable: "Seamless product showcase inside a viral gameplay moment, overlay branding."
    },
    {
      name: "Desk Setup Feature",
      price: "$850 USD",
      deliverable: "Peripheral/tech gear highlight in a 'Desk Setup Transformation' or keyboard sound-test video."
    },
    {
      name: "Monthly Brand Ambassadorship",
      price: "$3,000 USD",
      deliverable: "4 Dedicated video assets, permanent custom bio link, Twitch panel logo placement, Discord partner integrations."
    }
  ],
  setup: {
    pc: "CPU: AMD Ryzen 9 7900X | GPU: ASUS ROG RTX 4080 Super | RAM: 64GB DDR5 G.Skill Trident Z5 | Motherboard: ASUS X670E-I",
    keyboards: [
      "Custom Wobkey Rainy75 (FR4 Plate, Linear Switches, GMK Keycaps)",
      "Wooting 60HE (Alumaze Case, Lekker Switches)"
    ],
    audio: "Mic: Shure SM7B | Interface: Wave XLR | Headphones: Beyerdynamic DT 990 Pro",
    monitor: "ASUS ROG PG27AQDM OLED 240Hz & LG UltraFine 27\" Side Monitor"
  }
};

// API end point for Brand Assistant Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getGeminiClient();

    // Prepare system instructions with all background data
    const systemPrompt = `You are "Aura", the elegant, highly professional AI Business & Brand Manager representation for Zelo, a prominent TikTok Gaming & Tech Content Creator.
Your job is to interact with prospective brands, sponsors, agencies, and fans who want to collaborate with Zelo.
Here is the official Creator Profile for Zelo:
- Name: ${CREATOR_PROFILE.name}
- Niche: ${CREATOR_PROFILE.niche}
- Contact Email: ${CREATOR_PROFILE.email}
- Social Channels:
  * TikTok: ${CREATOR_PROFILE.socials.tiktok}
  * Twitch: ${CREATOR_PROFILE.socials.twitch}
  * YouTube: ${CREATOR_PROFILE.socials.youtube}
  * Instagram: ${CREATOR_PROFILE.socials.instagram}
- Sponsorship options:
  ${JSON.stringify(CREATOR_PROFILE.sponsorships, null, 2)}
- Gaming & Desk Setup specifications:
  ${JSON.stringify(CREATOR_PROFILE.setup, null, 2)}

Guidelines:
1. Be extremely polite, minimalist, highly articulate, and business-focused. Speak as Zelo's agent.
2. If asked about sponsorships, guide them through the options, pricing, and let them know they can fill out the 'Inquiry Pitch Form' directly on the page so Zelo can review their pitch manually.
3. Be transparent about rates, but encourage bundle discounts or tailored content plans for long-term collaborations. 
4. Always stay in character. If asked about personal or unrelated topics, gently redirect the conversation to Zelo's gaming, tech, or business.
5. Keep your responses structured, clean, and concise (aesthetic and minimalist!). Use bullet points for prices or deliverables. Use markdown beautifully.`;

    // Format chat history for @google/genai SDK
    // Since we are starting a live generateContent, we can specify systemInstruction inside config
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ 
      error: "Failed to process chat response.", 
      details: error.message || "Unknown error"
    });
  }
});

// Configure Vite integration
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode with Vite ESM middleware
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Started Vite Development Middleware.");
  } else {
    // Production statics
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static files in Production mode.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error("Critical server startup crash:", err);
});
