import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, MessageSquare, X, Bot, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import companyLogo from '../assets/images/cyberpunk_minimal_logo_1782104996879.jpg';

interface Message {
  id: string;
  sender: 'user' | 'aura';
  content: string;
  timestamp: Date;
}

// Client-side offline smart responder for static deployments
function getOfflineReply(query: string): string {
  const q = query.toLowerCase();
  
  if (q.includes('rate') || q.includes('price') || q.includes('cost') || q.includes('sponsor') || q.includes('package') || q.includes('charge') || q.includes('money') || q.includes('usd') || q.includes('rates') || q.includes('tier') || q.includes('fee')) {
    return `### 📊 Official Sponsorship Rates & Packages\n\nI can certainly share our current campaign options and standard rates for **Sammium Tech Industries**:\n\n*   **Dedicated TikTok Video (60s)**: **$1,200 USD**\n    *Includes a premium, dedicated hardware review, product link placed in TikTok Bio for 30 days, and cross-posting to Instagram Reels/YouTube Shorts.*\n*   **Integrated Gaming Clip (15-20s)**: **$550 USD**\n    *High-impact placement/shoutout inside a viral gameplay montage.*\n*   **Desk Setup Transformation Feature**: **$850 USD**\n    *Dedicated peripheral/accessory showcase or custom keyboard build sound-test integration.*\n*   **Monthly Brand Ambassadorship**: **$3,000 USD**\n    *Includes 4 dedicated video assets, a permanent Link-in-Bio slot, logo overlay on Twitch live streams, and dedicated Discord announcement spotlights.*\n\n*💡 To proceed with a custom campaign, please submit your proposal using our **Inquiry Pitch Engine** form on this website or email us at **zelop301@gmail.com**!*`;
  }
  
  if (q.includes('stat') || q.includes('tiktok') || q.includes('follower') || q.includes('subscriber') || q.includes('reach') || q.includes('engage') || q.includes('view') || q.includes('traffic') || q.includes('demographic') || q.includes('audience')) {
    return `### 📈 Channel Stats & Engagement Metrics\n\nHere are the live audience and engagement figures for **Sammium Tech Industries**:\n\n*   **TikTok (@sammium_tech)**: **245K Followers** | **8.2M Total Likes** | **12% average engagement rate** (High audience motivation & buyer CTR)\n*   **YouTube (Sammium Tech)**: **68K Subscribers** (Focusing on detailed custom PC build guides, cinematic workspace tours, and keyboard assembly vlogs)\n*   **Twitch (sammium_live)**: **42K Followers** (Live competitive FPS streams, hardware modification jams, and real-time setup customizer walkthroughs)\n*   **Instagram (@sammium.tech)**: **35K Followers** (Revolutionized desk setups and short-form desk transition reels)\n\n*All campaign reports feature transparent analytics tracking, custom UTM links, and pixel conversion stats.*`;
  }
  
  if (q.includes('keyboard') || q.includes('setup') || q.includes('spec') || q.includes('hardware') || q.includes('pc') || q.includes('mouse') || q.includes('audio') || q.includes('mic') || q.includes('monitor') || q.includes('build') || q.includes('desk') || q.includes('cpu') || q.includes('gpu')) {
    return `### 🖥️ Gaming & Build Hardware Specs\n\nHere is the current operational equipment spec utilized by **Sammium Tech Industries**:\n\n*   **Primary Custom Keyboards**:\n    *   **Wobkey Rainy75** (Anodized aluminum, FR4 plate, hand-lubed linear switches, custom GMK keycaps)\n    *   **Wooting 60HE** (Alumaze CNC case, rapid-trigger Lekker analog switches for competitive FPS gaming)\n*   **Creator PC Build**:\n    *   **CPU**: AMD Ryzen 9 7900X (12-Core, 24-Thread)\n    *   **GPU**: ASUS ROG STRIX RTX 4080 Super (16GB VRAM)\n    *   **RAM**: 64GB DDR5 G.Skill Trident Z5 RGB @ 6000MHz\n    *   **Motherboard**: ASUS ROG STRIX X670E-I Gaming WiFi Mini-ITX\n*   **Audio Rig**:\n    *   **Microphone**: Shure SM7B Broadcast Dynamic Mic\n    *   **Audio Interface**: Elgato Wave XLR (USB-C interface with physical mute & dial controls)\n    *   **Headphones**: Beyerdynamic DT 990 Pro (Studio open-back monitors)\n*   **Visual Layout**:\n    *   **Monitor 1**: ASUS ROG PG27AQDM OLED 240Hz (High-tactical gameplay monitor)\n    *   **Monitor 2**: LG UltraFine 27" IPS Side-Screen (Vertical alignment for stream chat and discord)\n\n*Feel free to ask about any specific desk accessories or lighting panels!*`;
  }
  
  if (q.includes('contact') || q.includes('pitch') || q.includes('email') || q.includes('collab') || q.includes('partner') || q.includes('hire') || q.includes('book') || q.includes('form') || q.includes('proposal') || q.includes('deal') || q.includes('work')) {
    return `### ✉️ How to Book a Collaboration\n\nWe love partnering with innovative hardware and lifestyle brands! To start a campaign with **Sammium Tech Industries**, you have two direct options:\n\n1.  **Email our Campaign Manager**:\n    Send your campaign brief, target timeline, and budget overview directly to: **zelop301@gmail.com**.\n2.  **Submit a proposal on this page**:\n    Go to the **Inquiry Pitch Engine** tab on this webpage, select your deliverables using the **Perk Builder**, set your budget tier, and submit! \n\n*Our brand manager reviews all incoming pitches daily and will reply with a custom media deck, rate sheet, and campaign brief within 24 to 48 hours.*`;
  }
  
  return `### 👋 Hello! I'm Aura, your AI brand manager.\n\nI am currently running in **resilient offline mode** because this site is hosted on a purely static platform (like GitHub Pages). \n\nI can still answer any questions you have about **Sammium Tech Industries**! Just type one of the following terms:\n\n*   **Rates** — to view sponsorship tiers and pricing\n*   **Stats** — to see our TikTok, YouTube, and engagement analytics\n*   **Setup** — to explore our PC specs and custom keyboard details\n*   **Contact** — to learn how to book or email us a proposal\n\n*(Or click any of the suggestion buttons below!)*`;
}

export const BrandAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'aura',
      content: "Hello! I am Aura, the AI Brand & Business Associate for Sammium Tech Industries. Whether you are representing a brand wanting to partner on a campaign, or a fellow creator curious about setup details, I am here to help. What can I assist you with today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filterSuggestions = [
    { label: "Sponsorship Rates", query: "What are your standard sponsorship rates and deliverables?" },
    { label: "TikTok Engagement", query: "What is your TikTok subscriber count, average views, and engagement level?" },
    { label: "Custom Keyboard Specs", query: "What are the exact specs of your custom keyboard setups?" },
    { label: "Brand Partnerships", query: "Who are the past brands you have integrated with, or are you looking for monthly sponsorships?" }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Automatically detect if we are on InfinityFree/standalone static hosting and forward to PHP backend
      const isDevelopmentOrCloudRun = 
        window.location.hostname === 'localhost' || 
        window.location.hostname.includes('127.0.0.1') || 
        window.location.hostname.includes('run.app');

      const targetApiPath = isDevelopmentOrCloudRun ? '/api/chat' : '/api/chat.php';

      const response = await fetch(targetApiPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const auraMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'aura',
        content: data.reply || "I apologize, I am temporarily having trouble contacting Zelo's data relays. Please try again in a moment.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, auraMessage]);
    } catch (error) {
      console.error("Chat error, entering offline responder mode:", error);
      const offlineReply = getOfflineReply(textToSend);
      const auraMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'aura',
        content: offlineReply,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, auraMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'aura',
        content: "Drafting a new meeting... I am Aura, the digital manager for Sammium Tech Industries. How can I help you customize your next marketing strategy, hardware integration, or campaign today?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group flex items-center justify-center p-4 bg-slate-900 border border-slate-800 text-teal-400 rounded-full shadow-2xl hover:bg-slate-800 transition-all duration-300 hover:border-teal-500/50"
          id="btn-aura-trigger"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
          </span>
          {isOpen ? <X size={24} /> : <Sparkles className="animate-pulse" size={24} />}
          <span className="absolute right-14 bg-slate-950/90 text-xs text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800 opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300 pointer-events-none whitespace-nowrap tracking-wide font-mono">
            Talk to AI Manager
          </span>
        </motion.button>
      </div>

      {/* Aura Sidebar/Chat Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[92vw] sm:w-[420px] h-[550px] bg-slate-950/95 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col backdrop-blur-xl"
            id="aura-chat-panel"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-slate-800 flex items-center justify-center p-0.5 overflow-hidden shadow-lg shadow-black/40">
                  <img 
                    src={companyLogo} 
                    alt="Sammium Logo" 
                    className="w-full h-full object-contain rounded-lg" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-slate-100 text-sm tracking-tight flex items-center gap-1.5">
                    Aura <span className="text-[10px] bg-teal-500/10 text-teal-400 px-1.5 py-0.5 rounded font-mono font-normal uppercase tracking-widest">AI Manager</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">Representing Sammium Tech</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={handleReset} 
                  title="Clear conversation"
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <RefreshCw size={14} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed font-sans ${
                      msg.sender === 'user'
                        ? 'bg-slate-800 text-slate-100 rounded-tr-none border border-slate-700/50'
                        : 'bg-slate-900/60 text-slate-300 rounded-tl-none border border-slate-800/80 shadow-inner'
                    }`}
                  >
                    {/* Markdown compatible-ish block */}
                    <div className="whitespace-pre-wrap font-sans text-[13px] md:text-sm tracking-wide">
                      {msg.content}
                    </div>
                    <span className="block text-[9px] text-slate-500/80 text-right mt-1 font-mono">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="flex items-center space-x-1.5 py-1">
                      <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce delay-100" />
                      <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce delay-200" />
                      <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce delay-300" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts Block */}
            {messages.length === 1 && (
              <div className="p-3 bg-slate-950 border-t border-slate-900">
                <p className="text-[10px] text-slate-500 font-mono mb-2 uppercase tracking-wider pl-1">Suggestion Queries</p>
                <div className="flex flex-wrap gap-1.5">
                  {filterSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(suggestion.query)}
                      className="text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-2.5 py-1.5 rounded-lg transition-all duration-200 text-left hover:border-teal-500/20 active:scale-95"
                    >
                      {suggestion.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-3 bg-slate-900/90 border-t border-slate-800/60 flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Negotiate rates, ask stats, tech setup spec..."
                className="flex-1 bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-teal-500/80 focus:ring-1 focus:ring-teal-500/30 text-slate-100 text-xs md:text-sm rounded-xl py-2.5 px-3.5 transition-all duration-300 outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 bg-teal-500 disabled:bg-slate-800 text-slate-950 disabled:text-slate-500 rounded-xl hover:bg-teal-400 transition-colors focus:outline-none"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
