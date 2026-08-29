import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { UnionIcon } from './icons/UnionIcon';
import { VectorIcon } from './icons/VectorIcon';
import { Loader2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

// Exactly 2 responsive suggestion pills
const QUICK_PROMPTS = [
  'How should I contact him?',
  'Tell me about his co-curricular activities',
];

export const GeminiChatField: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const modalInputRef = useRef<HTMLInputElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Open modal with "Hi!" autofilled and focus input
  const handleOpenChat = () => {
    setIsOpen(true);
    if (!query.trim()) {
      setQuery('Hi!');
    }
    setTimeout(() => {
      if (modalInputRef.current) {
        modalInputRef.current.focus();
        modalInputRef.current.select();
      }
    }, 100);
  };

  // Close modal handler
  const handleCloseChat = () => {
    setIsOpen(false);
  };

  // Lock body scroll and prevent background chaining when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [isOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseChat();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen]);

  // Auto-scroll chat to bottom when messages update
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  // Send message to Gemini API
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend !== undefined ? textToSend : query).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setQuery('');
    setIsLoading(true);

    try {
      const history = updatedMessages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server status ${res.status}`);
      }

      const data = await res.json();
      const modelReply =
        data.reply ||
        "Hi! I'm Rudransh's AI design concierge powered by Gemini. Ask me anything about his projects, design systems, design philosophy, or skills.";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'model',
        text: modelReply,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat API error:', err);
      const fallbackReply =
        text.toLowerCase().includes('hi') || text.toLowerCase().includes('hello')
          ? "Hi! I'm Rudransh's AI design concierge powered by Gemini. Ask me anything about his projects, design systems, design philosophy, or skills."
          : text.toLowerCase().includes('contact')
          ? "You can contact Rudransh directly at rudransh116@gmail.com, or connect via GitHub, X (Twitter), and LinkedIn!"
          : text.toLowerCase().includes('co-curricular') || text.toLowerCase().includes('activit')
          ? "Beyond design and software engineering, Rudransh is an avid competitive badminton player, acrylic & oil painter, and retro CRT enthusiast."
          : "Rudransh is a UI/UX Designer & Product Engineer specializing in scalable design systems, FinTech dashboards, and interactive creative tools. Reach out at rudransh116@gmail.com!";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'model',
        text: fallbackReply,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        modalInputRef.current?.focus();
      }, 80);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto flex flex-col items-center">
      {/* Subtle Glow Aura behind input */}
      <motion.div
        animate={{
          scale: isHovered ? 1.03 : 1,
          opacity: isHovered ? 0.75 : 0.45,
        }}
        transition={{ duration: 0.25 }}
        className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-rose-500/25 to-orange-400/20 blur-md pointer-events-none"
      />

      {/* Main Page Trigger Input Pill - Stays completely intact, no stretching */}
      <div
        id="gemini-ai-chat-input-wrapper"
        onClick={handleOpenChat}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full cursor-pointer select-none z-20"
      >
        <div className="gradient-border-user-pill chat-input-glow transition-all duration-250 transform hover:scale-[1.012] active:scale-[0.99]">
          <div className="relative flex items-center justify-between w-full bg-white/95 backdrop-blur-md rounded-full px-3.5 sm:px-4.5 py-2.5 sm:py-3 shadow-xs">
            {/* Union Icon */}
            <div className="shrink-0 mr-2.5 flex items-center justify-center">
              <UnionIcon size={24} className="transition-transform duration-300 hover:rotate-45" />
            </div>

            {/* Placeholder Text */}
            <div className="flex-1 text-left text-xs sm:text-sm text-neutral-500 font-normal truncate">
              Type your message or click to ask AI...
            </div>

            {/* Circular Send Vector Icon Button */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 flex items-center justify-center shadow-xs shrink-0 ml-2">
              <VectorIcon size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* CLEAN, LIGHTWEIGHT REVEALING POP-UP MODAL */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="gemini-chat-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/45 backdrop-blur-sm [overscroll-behavior:contain]"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                onClick={(e) => {
                  if (e.target === e.currentTarget) handleCloseChat();
                }}
              >
                {/* Clean Pop-Up Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 12 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-lg sm:max-w-xl bg-white rounded-2xl sm:rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[82vh] border border-neutral-100 z-[10000] [overscroll-behavior:contain]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* MODAL HEADER */}
                  <div className="px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between border-b border-neutral-100 shrink-0 bg-white select-none">
                    {/* Left: Cat Avatar & Title */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-neutral-200 shadow-xs bg-neutral-100">
                        <img
                          src="/src/assets/images/cat_comment_avatar_1787680043876.jpg"
                          alt="Rudransh's Assistant"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xs sm:text-sm font-semibold text-[#111111] tracking-tight">
                        Rudransh’s AI Assistant
                      </h3>
                    </div>

                    {/* Right: Close Button */}
                    <button
                      id="close-gemini-chat-btn"
                      type="button"
                      onClick={handleCloseChat}
                      className="text-xs sm:text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors cursor-pointer underline-offset-4 hover:underline px-1 py-0.5"
                    >
                      Close
                    </button>
                  </div>

                  {/* CHAT MESSAGES BODY */}
                  <div
                    ref={chatScrollRef}
                    className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 sm:space-y-4 bg-white min-h-[190px] max-h-[400px] [overscroll-behavior:contain]"
                  >
                    {/* If no messages sent yet, show guidance */}
                    {messages.length === 0 && (
                      <div className="flex flex-col items-center justify-center text-center py-5 sm:py-6 px-3 text-neutral-400">
                        <div className="mb-2.5 p-2.5 rounded-2xl bg-gradient-to-tr from-pink-50 to-orange-50 border border-pink-100/60">
                          <UnionIcon size={28} />
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-neutral-700">
                          Welcome to Rudransh's AI Design Concierge
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-1 max-w-xs">
                          Send "Hi!" or tap a suggestion below to explore his design systems, projects, and skills.
                        </p>
                      </div>
                    )}

                    {/* Message stream */}
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`w-full flex ${
                          msg.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {msg.role === 'user' ? (
                          /* USER MESSAGE BUBBLE */
                          <div className="gradient-border-user-pill max-w-[85%] sm:max-w-[75%] shadow-xs">
                            <div className="bg-white rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-[13px] text-neutral-900 font-normal">
                              {msg.text}
                            </div>
                          </div>
                        ) : (
                          /* MODEL / AI MESSAGE BUBBLE */
                          <div className="flex items-start gap-2 sm:gap-2.5 max-w-[92%] sm:max-w-[86%]">
                            <div className="shrink-0 mt-1">
                              <UnionIcon size={20} />
                            </div>
                            <div className="gradient-border-card shadow-xs flex-1">
                              <div className="bg-white rounded-2xl px-3.5 sm:px-5 py-2.5 sm:py-3.5 text-xs sm:text-[13px] text-neutral-800 leading-relaxed font-normal">
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Loading indicator */}
                    {isLoading && (
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <div className="shrink-0 mt-1">
                          <UnionIcon size={20} />
                        </div>
                        <div className="gradient-border-card shadow-xs">
                          <div className="bg-white rounded-2xl px-3.5 sm:px-4 py-2.5 text-xs text-neutral-500 flex items-center gap-2">
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-pink-500" />
                            <span>Gemini is generating response...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* QUICK PROMPTS CHIPS */}
                  <div className="px-4 sm:px-5 py-2 bg-white flex flex-wrap sm:flex-nowrap items-center justify-end gap-1.5 sm:gap-2 shrink-0 border-t border-neutral-50 select-none">
                    {QUICK_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(prompt)}
                        className="text-[10px] sm:text-xs px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-neutral-700/80 bg-white text-neutral-850 hover:bg-neutral-100/80 active:scale-95 transition-all cursor-pointer whitespace-nowrap shadow-2xs font-normal"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>

                  {/* BOTTOM INPUT BAR */}
                  <div className="p-3 sm:p-4 bg-white shrink-0 pt-1 sm:pt-1.5">
                    <div className="gradient-border-user-pill chat-input-glow transition-all">
                      <div className="relative flex items-center w-full bg-white rounded-full px-3 py-1.5 sm:py-2">
                        {/* Left Union Icon */}
                        <div className="shrink-0 mr-1.5 flex items-center justify-center">
                          <UnionIcon size={22} />
                        </div>

                        {/* Input field */}
                        <input
                          ref={modalInputRef}
                          type="text"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type your message or question..."
                          className="w-full bg-transparent text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none px-1.5"
                        />

                        {/* Send Button with Vector Icon */}
                        <button
                          id="send-gemini-chat-btn"
                          type="button"
                          onClick={() => handleSendMessage()}
                          disabled={!query.trim() || isLoading}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 flex items-center justify-center text-white disabled:opacity-40 hover:opacity-95 active:scale-90 transition-all cursor-pointer shrink-0 shadow-xs"
                          aria-label="Send message"
                        >
                          <VectorIcon size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
