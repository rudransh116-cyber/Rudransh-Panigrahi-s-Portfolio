import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is not set. Using intelligent fallback responses.');
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are the interactive AI Portfolio Assistant for Rudransh Panigrahi, a premier UI/UX Designer & Product Engineer.
Respond politely, concisely, and insightfully in the first person on behalf of Rudransh's portfolio or as his intelligent design concierge.

About Rudransh Panigrahi:
- Role: UI/UX Designer & Product Engineer
- Core Focus: Design systems, micro-interactions, full-stack prototyping, FinTech, Healthcare, AI-assisted creative workflows.
- Impact: Has shipped production-ready interfaces used by over 500,000 users worldwide.
- Key Projects:
  1. Nova FinTech Dashboard (High-frequency trading & wealth analytics with microsecond charts).
  2. Pulse Healthcare OS (Hospital workflow management, triage system & clinical records).
  3. Canvas Multiplayer Studio (Collaborative vector design tool with real-time multiplayer cursors).
  4. Chrono Time Engine (Minimalist focus & habit intelligence app).
- Technical & Design Skills: Figma, Design Systems, Motion Design, React, TypeScript, Tailwind CSS, Node.js, Express, Canvas API, Interactive WebGL/2D Physics.
- Contact: Email at rudransh116@gmail.com, GitHub, X (Twitter), LinkedIn.

Guidelines for Answers:
- Keep answers concise (2 to 4 sentences or brief scannable bullet points).
- Warm, professional, articulate, and design-minded tone.
- If asked about availability, state that Rudransh is open to select design engineering opportunities, contract roles, and visionary product design collaborations.
`;

function generatePortfolioFallback(message: string): string {
  const msgLower = message.trim().toLowerCase();

  if (msgLower === 'hi' || msgLower === 'hi!' || msgLower === 'hello' || msgLower === 'hey' || msgLower.startsWith('hi ') || msgLower.startsWith('hello ')) {
    return "Hi! I'm Rudransh's AI design concierge powered by Gemini. Ask me anything about his projects, design systems, design philosophy, or skills.";
  }

  if (msgLower.includes('contact') || msgLower.includes('email') || msgLower.includes('reach') || msgLower.includes('hire') || msgLower.includes('connect')) {
    return "You can contact Rudransh directly at rudransh116@gmail.com, or connect via GitHub, X (Twitter), and LinkedIn using the links in the header. He's always open to discussing new design engineering and product opportunities!";
  }

  if (msgLower.includes('co-curricular') || msgLower.includes('hobby') || msgLower.includes('hobbies') || msgLower.includes('activities') || msgLower.includes('interest')) {
    return "Beyond interface design and engineering, Rudransh is an avid competitive badminton player, acrylic & oil painter, retro CRT enthusiast, and generative design explorer. Check out the Photos tab in the Works section to see his studio and art!";
  }

  if (msgLower.includes('who') || msgLower.includes('about') || msgLower.includes('rudransh') || msgLower.includes('background') || msgLower.includes('tell me')) {
    return "Rudransh is a UI/UX Designer & Product Engineer specializing in scalable design systems, FinTech dashboards, and interactive creative tools. Feel free to ask about his specific projects, technical stack, or reach out at rudransh116@gmail.com!";
  }

  if (msgLower.includes('project') || msgLower.includes('work') || msgLower.includes('portfolio') || msgLower.includes('case stud')) {
    return "Rudransh's key projects include:\n• Nova FinTech Dashboard (High-frequency trading & wealth analytics)\n• Pulse Healthcare OS (Clinical workflow & triage system)\n• Canvas Multiplayer Studio (Collaborative vector design with live physics)\n• Chrono Time Engine (Minimalist focus & habit intelligence app)\n\nYou can explore deep-dive case studies by clicking 'Works' in the navigation bar.";
  }

  if (msgLower.includes('skill') || msgLower.includes('stack') || msgLower.includes('tech') || msgLower.includes('tool') || msgLower.includes('figma')) {
    return "Rudransh's core expertise spans:\n• Design: Figma, scalable Design Systems, micro-interactions, motion graphics, WCAG accessibility\n• Engineering: React, TypeScript, Tailwind CSS, Node.js, Express, Canvas API, 2D physics simulation\n• Product: High-scale UX for 500k+ global users across FinTech and Healthcare.";
  }

  if (msgLower.includes('fintech') || msgLower.includes('nova') || msgLower.includes('trading')) {
    return "The Nova FinTech Dashboard is a high-frequency trading and wealth analytics platform featuring microsecond latency visualizers, portfolio risk heatmaps, and customizable multi-window workspaces.";
  }

  if (msgLower.includes('health') || msgLower.includes('pulse') || msgLower.includes('hospital')) {
    return "Pulse Healthcare OS is an enterprise clinical operations platform designed for rapid ER patient intake, smart triage routing, and unified electronic health record inspection.";
  }

  return "Rudransh is a UI/UX Designer & Product Engineer specializing in scalable design systems, FinTech dashboards, and interactive creative tools. Feel free to ask about his specific projects, technical stack, or reach out at rudransh116@gmail.com!";
}

async function generateWithFallbackModels(
  ai: GoogleGenAI,
  contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>
): Promise<string> {
  // Ordered valid supported models to try for high availability and capacity resilience
  const modelsToTry = [
    'gemini-flash-latest',
    'gemini-3.7-flash',
    'gemini-3.1-flash-lite',
    'gemini-3.1-pro-preview'
  ];
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      if (response.text && response.text.trim().length > 0) {
        return response.text;
      }
    } catch (err: any) {
      lastError = err;
      // Continue to next available model candidate smoothly
    }
  }

  throw lastError || new Error('All model candidates failed');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Gemini Chat API endpoint with automatic resilience & model fallback
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'A valid message string is required.' });
      }

      const ai = getAiClient();

      if (!ai) {
        // Fallback response if API key is not configured
        const fallbackReply = generatePortfolioFallback(message);
        return res.json({ reply: fallbackReply });
      }

      // Build conversation contents
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item && item.role && item.text) {
            contents.push({
              role: item.role === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }],
            });
          }
        }
      }

      // Add current user message
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      try {
        const reply = await generateWithFallbackModels(ai, contents);
        return res.json({ reply });
      } catch (geminiError: any) {
        console.warn('All Gemini models encountered high load or error, using intelligent portfolio fallback:', geminiError?.message || geminiError);
        const fallbackReply = generatePortfolioFallback(message);
        return res.json({ reply: fallbackReply });
      }
    } catch (err: any) {
      console.error('Chat endpoint error:', err);
      const fallbackReply = generatePortfolioFallback(req.body?.message || '');
      return res.json({ reply: fallbackReply });
    }
  });

  // Vite middleware in development vs Static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
