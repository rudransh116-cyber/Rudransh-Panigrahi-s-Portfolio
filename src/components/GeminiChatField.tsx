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

// Exactly 2 responsive suggestion pills as featured in the reference design
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
    }, 280);
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

  // Send message to Gemini API only when user triggers send
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
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center">
      {/* Subtle Glow Aura behind input */}
      <motion.div
        animate={{
          scale: isHovered ? 1.04 : 1,
          opacity: isHovered ? 0.85 : 0.5,
        }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-2 rounded-full bg-gradient-to-r from-pink-500/25 via-rose-500/30 to-orange-400/25 blur-lg pointer-events-none"
      />

      {/* Main Page Trigger Input Pill with shared layout ID */}
      <motion.div
        layoutId="gemini-chat-morph-container"
        id="gemini-ai-chat-input-wrapper"
        onClick={handleOpenChat}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full cursor-pointer select-none z-20"
        transition={{
          type: 'spring',
          stiffness: 340,
          damping: 32,
          mass: 0.85,
        }}
      >
        <div className="gradient-border-user-pill chat-input-glow transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.99]">
          <div className="relative flex items-center justify-between w-full bg-white/95 backdrop-blur-md rounded-full px-4 py-3 sm:py-3.5 shadow-sm">
            {/* Union Icon */}
            <div className="shrink-0 mr-3 flex items-center justify-center">
              <UnionIcon size={26} className="transition-transform duration-300 hover:rotate-45" />
            </div>

            {/* Placeholder Text */}
            <div className="flex-1 text-left text-xs sm:text-sm text-neutral-500 font-normal truncate">
              Type your message or click to ask AI...
            </div>

            {/* Circular Send Vector Icon Button */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 flex items-center justify-center shadow-sm shrink-0 ml-2">
              <VectorIcon size={15} />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-2.5 text-[11px] font-mono text-neutral-400 tracking-tight text-center">
        <span>Click to open Rudransh's AI Assistant</span>
      </div>

      {/* SEAMLESS CONTINUOUS MORPHING CHATBOX PORTAL */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="gemini-chat-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/40 backdrop-blur-sm [overscroll-behavior:contain]"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                onClick={(e) => {
                  if (e.target === e.currentTarget) handleCloseChat();
                }}
              >
                {/* Seamless Morphing Modal Container */}
                <motion.div
                  layoutId="gemini-chat-morph-container"
                  transition={{
                    type: 'spring',
                    stiffness: 340,
                    damping: 32,
                    mass: 0.85,
                  }}
                  className="relative w-full max-w-xl sm:max-w-2xl bg-white rounded-3xl sm:rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[88vh] border border-neutral-100 z-[10000] [overscroll-behavior:contain]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* MODAL HEADER */}
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, delay: 0.08 }}
                    className="px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b border-neutral-100 shrink-0 bg-white select-none"
                  >
                    {/* Left: Cat Avatar & Title */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-neutral-200 shadow-sm bg-neutral-100">
                        <img
                          src="/src/assets/images/cat_comment_avatar_1787680043876.jpg"
                          alt="Rudransh's Assistant"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-[#111111] tracking-tight">
                        Rudransh’s AI Assistant
                      </h3>
                    </div>

                    {/* Right: Close Button styled in red text with hover underline */}
                    <button
                      id="close-gemini-chat-btn"
                      type="button"
                      onClick={handleCloseChat}
                      className="text-sm sm:text-base font-medium text-rose-500 hover:text-rose-600 transition-colors cursor-pointer underline-offset-4 hover:underline px-1 py-0.5"
                    >
                      Close
                    </button>
                  </motion.div>

                  {/* CHAT MESSAGES BODY */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22, delay: 0.1 }}
                    ref={chatScrollRef}
                    className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-7 space-y-4 sm:space-y-5 bg-white min-h-[220px] max-h-[460px] [overscroll-behavior:contain]"
                  >
                    {/* If no messages sent yet, show friendly guidance */}
                    {messages.length === 0 && (
                      <div className="flex flex-col items-center justify-center text-center py-6 sm:py-8 px-4 text-neutral-400">
                        <div className="mb-3 p-3 rounded-2xl bg-gradient-to-tr from-pink-50 to-orange-50 border border-pink-100/60">
                          <UnionIcon size={34} />
                        </div>
                        <p className="text-sm font-medium text-neutral-700">
                          Welcome to Rudransh's AI Design Concierge
                        </p>
                        <p className="text-xs text-neutral-400 mt-1 max-w-sm">
                          Send "Hi!" or tap a suggestion below to learn about design systems, FinTech dashboards, and background.
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
                          /* USER MESSAGE BUBBLE (Gradient border pill, right-aligned) */
                          <div className="gradient-border-user-pill max-w-[88%] sm:max-w-[75%] shadow-sm">
                            <div className="bg-white rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base text-neutral-900 font-normal">
                              {msg.text}
                            </div>
                          </div>
                        ) : (
                          /* MODEL / AI MESSAGE BUBBLE (Left-aligned with Union icon on the left) */
                          <div className="flex items-start gap-2.5 sm:gap-3 max-w-[95%] sm:max-w-[88%]">
                            <div className="shrink-0 mt-1.5">
                              <UnionIcon size={24} />
                            </div>
                            <div className="gradient-border-card shadow-sm flex-1">
                              <div className="bg-white rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base text-neutral-800 leading-relaxed font-normal">
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Loading indicator */}
                    {isLoading && (
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="shrink-0 mt-1">
                          <UnionIcon size={24} />
                        </div>
                        <div className="gradient-border-card shadow-sm">
                          <div className="bg-white rounded-2xl px-4 sm:px-5 py-3 text-xs sm:text-sm text-neutral-500 flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-pink-500" />
                            <span>Gemini is generating response...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* QUICK PROMPTS CHIPS - Responsive & Seamless */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.12 }}
                    className="px-4 sm:px-6 md:px-7 py-2 bg-white flex flex-wrap sm:flex-nowrap items-center justify-end gap-2 shrink-0 border-t border-neutral-50 select-none"
                  >
                    {QUICK_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(prompt)}
                        className="text-[11px] sm:text-xs md:text-[13px] px-3 sm:px-4 py-1.5 rounded-full border border-neutral-700/80 bg-white text-neutral-850 hover:bg-neutral-100/80 active:scale-95 transition-all cursor-pointer whitespace-nowrap shadow-2xs font-normal"
                      >
                        {prompt}
                      </button>
                    ))}
                  </motion.div>

                  {/* BOTTOM INPUT BAR */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="p-3.5 sm:p-5 md:p-6 bg-white shrink-0 pt-1 sm:pt-2"
                  >
                    <div className="gradient-border-user-pill chat-input-glow transition-all">
                      <div className="relative flex items-center w-full bg-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2.5">
                        {/* Left Union Icon */}
                        <div className="shrink-0 mr-1.5 sm:mr-2 flex items-center justify-center">
                          <UnionIcon size={26} />
                        </div>

                        {/* Input field */}
                        <input
                          ref={modalInputRef}
                          type="text"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type your message or question..."
                          className="w-full bg-transparent text-xs sm:text-sm md:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none px-1.5 sm:px-2"
                        />

                        {/* Send Button with Vector Icon */}
                        <button
                          id="send-gemini-chat-btn"
                          type="button"
                          onClick={() => handleSendMessage()}
                          disabled={!query.trim() || isLoading}
                          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 flex items-center justify-center text-white disabled:opacity-40 hover:opacity-95 active:scale-90 transition-all cursor-pointer shrink-0 shadow-sm"
                          aria-label="Send message"
                        >
                          <VectorIcon size={15} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
