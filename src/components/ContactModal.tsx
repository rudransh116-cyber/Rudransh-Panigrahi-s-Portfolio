import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Send, CheckCircle2, Copy, Sparkles, Linkedin, Twitter, Github } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const emailAddress = 'rudransh116@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setMessage('');
      setEmail('');
      setFormSent(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 border border-neutral-100 overflow-hidden"
          >
            {/* Ambient Pink Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-pink-300/30 blur-2xl rounded-full pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-xl font-bold text-neutral-900">Get in Touch</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
              Available for design systems leadership, high-impact product engineering, and collaborative consulting.
            </p>

            {/* Direct Email Pill */}
            <div className="mt-5 p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-mono text-neutral-800 truncate">{emailAddress}</span>
              </div>
              <button
                onClick={copyEmail}
                className="px-3 py-1.5 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Quick Contact Form */}
            {formSent ? (
              <div className="my-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-emerald-900">Message sent successfully!</p>
                <p className="text-xs text-emerald-700 mt-1">Rudransh will reply to your inquiry shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                <div>
                  <label className="block text-xs font-mono text-neutral-500 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-500 mb-1">Message or Project Scope</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell me about your product vision, design system or timeline..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 bg-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-black hover:bg-neutral-800 active:scale-[0.99] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}

            {/* Social Links */}
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
              <span>Location: Global / Remote</span>
              <div className="flex gap-3 text-neutral-600 font-mono">
                <span className="hover:text-black cursor-pointer">LinkedIn</span>
                <span>•</span>
                <span className="hover:text-black cursor-pointer">GitHub</span>
                <span>•</span>
                <span className="hover:text-black cursor-pointer">Figma</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
