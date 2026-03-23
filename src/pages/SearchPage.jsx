import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Search, Send, Bot, User, Sparkles, MapPin, Phone,
  FileText, Briefcase, RefreshCw, AlertCircle, Building,
  Stethoscope, GraduationCap, ChevronLeft
} from 'lucide-react';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Gemini Integration Setup
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const API_KEY = "AIzaSyCczXoIVmQffDYgZG7DwEPeLIA6RwZ10ig";
const genAI = new GoogleGenerativeAI(API_KEY);

const systemInstruction = `أنت المساعد الرقمي فائق الذكاء لمنصة "فلسطين الآن"، واسمك "مساعد فلسطين".
مهمتك: تقديم إجابات سريعة، دقيقة، ومفيدة جداً للمواطنين الفلسطينيين في مجالات: الخدمات الحكومية، أرقام الطوارئ، الرعاية الصحية، الأخبار، فرص العمل، والتعليم.
أسلوبك:
- كن مهذباً لأقصى حد، محترفاً، وإيجابياً وداعماً.
- استخدم لغة عربية فصحى واضحة، مع لمسات دافئة في الترحيب.
- نسق إجاباتك بشكل جميل جداً باستخدام Markdown (قوائم النقطية، الخط العريض، العناوين المنسقة).
- أجب بشكل منظم، مختصر ومفيد، دون مقدمات طويلة.
- إذا سئلت عن معلومات حساسة، وجه المواطن بلطف للجهات الرسمية.`;

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction,
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Suggested Prompts
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const suggestions = [
  { id: 1, text: "كيف أستخرج جواز سفر فلسطيني؟", desc: "الإجراءات والوثائق", icon: FileText, color: "text-blue", bg: "bg-blue/10", border: "border-blue/20" },
  { id: 2, text: "ما هي أرقام الطوارئ للشرطة والإسعاف؟", desc: "الخطوط الساخنة", icon: Phone, color: "text-red", bg: "bg-red/10", border: "border-red/20" },
  { id: 3, text: "أين تقع المستشفيات الحكومية في رام الله؟", desc: "الرعاية الصحية", icon: Stethoscope, color: "text-green-bright", bg: "bg-green-bright/10", border: "border-green-bright/20" },
  { id: 4, text: "ما هي شروط التقدم لمنحة جامعية؟", desc: "التعليم العالي", icon: GraduationCap, color: "text-accent-light", bg: "bg-accent/10", border: "border-accent/20" },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Custom Markdown Components for Styling
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const mkComponents = {
  p: ({ children }) => <p className="mb-4 leading-relaxed text-[15.5px] text-t2">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pr-5 mb-5 space-y-2 marker:text-primary-light text-t2">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pr-5 mb-5 space-y-2 marker:text-primary-light text-t2 font-medium">{children}</ol>,
  li: ({ children }) => <li className="pl-2 leading-relaxed">{children}</li>,
  h2: ({ children }) => <h2 className="text-xl font-extrabold mb-4 mt-6 text-primary-light flex items-center gap-2 before:content-[''] before:block before:w-1.5 before:h-6 before:bg-primary-light before:rounded-full">{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg font-bold mb-3 mt-5 text-t1 border-b border-border pb-2 inline-block">{children}</h3>,
  h4: ({ children }) => <h4 className="text-base font-bold mb-2 mt-4 text-t1">{children}</h4>,
  strong: ({ children }) => <strong className="font-bold text-t1 bg-primary/10 px-1 rounded">{children}</strong>,
  a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" className="text-accent hover:text-accent-light hover:underline font-semibold inline-flex items-center gap-1 transition-colors">{children} <ChevronLeft size={12}/></a>,
  blockquote: ({ children }) => <blockquote className="border-r-4 border-primary/50 pr-4 py-2 my-4 bg-gradient-to-l from-surface-2/80 to-transparent rounded-l-xl text-t2 italic shadow-sm">{children}</blockquote>,
  code: ({ inline, children }) => inline 
    ? <code className="bg-surface-3 px-1.5 py-0.5 rounded-md text-primary-light font-mono text-[13px] border border-border shrink-0" dir="ltr">{children}</code>
    : <pre className="bg-[#0A0F0D] p-4 rounded-xl overflow-x-auto mb-5 border border-border shadow-inner" dir="ltr"><code className="text-[13px] font-mono text-t2 leading-loose">{children}</code></pre>
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Main Page Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function SearchPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize chat session on mount
  useEffect(() => {
    try {
      chatRef.current = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.65,
        },
      });
    } catch (e) {
      console.error("Failed to initialize chat:", e);
      setError("حدث خطأ في التهيئة. يرجى إعادة تحميل الصفحة.");
    }
  }, []);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    const query = text.trim();
    if (!query) return;

    // Add user message to UI
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      if (!chatRef.current) throw new Error("Chat not initialized");
      
      const result = await chatRef.current.sendMessage(query);
      const responseText = result.response.text();

      // Add bot response to UI
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (err) {
      console.error("Gemini Error:", err);
      let printErr = err.message || "حدث خطأ غير متوقع في جلب البيانات.";
      if (printErr.includes("403") || printErr.includes("API key")) {
         printErr = "نظام الذكاء الاصطناعي يقوم بالتحديث حالياً، يرجى المحاولة بعد قليل.";
      }
      setError(printErr);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setError(null);
    chatRef.current = model.startChat({
      history: [],
      generationConfig: { maxOutputTokens: 1024, temperature: 0.65 },
    });
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-70px)] bg-bg pt-[70px] relative font-cairo overflow-hidden" dir="rtl">
      
      {/* ━━━ Animated Background Orbs ━━━ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 40, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" 
        />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col relative z-10 px-4 sm:px-6 lg:px-8 pb-32">
        
        {/* ━━━ Header / Empty State ━━━ */}
        <AnimatePresence mode="wait">
          {messages.length === 0 && (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex-1 flex flex-col items-center justify-center pt-16 pb-12 w-full"
            >
              {/* Bot Avatar Glowing */}
              <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/30 transition-all duration-700"></div>
                <div className="w-24 h-24 bg-surface-2 border border-border rounded-[2rem] flex items-center justify-center shadow-2xl shadow-primary/10 relative z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(26,107,60,0.3)_180deg,transparent_360deg)] rounded-[2rem]"
                  />
                  <div className="w-[88px] h-[88px] bg-surface-2 rounded-[1.7rem] flex items-center justify-center relative z-20">
                    <Bot size={44} className="text-primary-light drop-shadow-[0_0_15px_rgba(42,138,80,0.8)]" />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-2 right-2 text-accent-light"
                    >
                      <Sparkles size={16} />
                    </motion.div>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-t1 mb-4 text-center tracking-tight leading-tight">
                مرحباً بك في <span className="gradient-text drop-shadow-sm">مساعد فلسطين الذكي</span>
              </h1>
              <p className="text-t2 text-center max-w-xl mx-auto mb-12 text-lg font-medium">
                بوابتك الرقمية لكل ما تحتاجه. اسألني عن الخدمات الحكومية، الأخبار العاجلة، الإجراءات الرسمية، أو الوظائف المتاحة.
              </p>

              {/* Suggestions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                {suggestions.map((s, i) => (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1, type: "spring", stiffness: 100 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSend(s.text)}
                    className="group relative overflow-hidden flex items-start gap-4 p-5 rounded-2xl border border-border bg-surface-2/60 backdrop-blur-md text-right transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${s.bg} ${s.border} border`}>
                      <s.icon size={22} className={s.color} />
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-t1 mb-1 group-hover:text-primary-light transition-colors">{s.text}</span>
                      <span className="text-[13px] text-t3 font-medium">{s.desc}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ━━━ Chat History ━━━ */}
        {messages.length > 0 && (
          <div className="flex-1 overflow-y-auto py-8 space-y-8 scrollbar-hide">
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-8 pb-4 border-b border-border sticky top-0 bg-bg/80 backdrop-blur-md z-10 py-4 px-2 rounded-b-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary-light border border-primary/30 shadow-[0_0_10px_rgba(26,107,60,0.2)]">
                  <Bot size={18} />
                </div>
                <div>
                  <h2 className="font-bold text-t1 text-sm">محادثة المساعد الذكي</h2>
                  <p className="text-[11px] text-primary-light font-medium">متصل وجاهز للمساعدة</p>
                </div>
              </div>
              <button
                onClick={handleClear}
                className="flex items-center gap-2 text-xs font-bold text-t3 hover:text-red transition-all px-4 py-2 rounded-xl border border-transparent hover:border-red/20 hover:bg-red/10 group"
              >
                <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" /> 
                <span>محادثة جديدة</span>
              </button>
            </motion.div>

            {messages.map((msg, idx) => {
              const isUser = msg.role === 'user';
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm ${
                    isUser 
                      ? 'bg-surface-3 border-border text-t2' 
                      : 'bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30 text-primary-light shadow-primary/20'
                  }`}>
                    {isUser ? <User size={20} /> : <Bot size={22} />}
                  </div>

                  {/* Bubble */}
                  <div className={`flex flex-col max-w-[90%] sm:max-w-[80%] ${isUser ? 'items-end' : 'items-start'} group`}>
                    <div className={`px-6 py-4 rounded-3xl relative ${
                      isUser 
                        ? 'bg-surface-3 border border-border rounded-tr-sm text-t1 shadow-md'
                        : 'bg-surface/60 backdrop-blur-md border border-border rounded-tl-sm text-t1 shadow-lg shadow-black/20'
                    }`}>
                      {/* Generative AI Glow Effect for Bot */}
                      {!isUser && (
                        <div className="absolute top-0 right-0 w-full h-full rounded-3xl rounded-tl-sm bg-gradient-to-b from-primary/5 to-transparent pointer-events-none opacity-50"></div>
                      )}
                      
                      <div className="relative z-10">
                        {isUser ? (
                          <p className="text-[15.5px] font-medium whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                        ) : (
                          <div className="markdown-container">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mkComponents}>
                              {msg.text}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-[11px] text-t3 mt-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      {isUser ? 'أنت' : 'مساعد فلسطين'} • {new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute:'2-digit' })}
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center shrink-0 text-primary-light shadow-lg shadow-primary/20">
                  <Bot size={22} className="animate-pulse" />
                </div>
                <div className="bg-surface/60 backdrop-blur-md border border-border px-6 py-5 rounded-3xl rounded-tl-sm flex items-center gap-2 shadow-lg w-[100px]">
                  <div className="flex gap-1.5 w-full justify-center">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2.5 h-2.5 rounded-full bg-primary-light"
                        animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex justify-center my-6 overflow-hidden">
                  <div className="bg-red/10 border border-red/30 text-red px-5 py-3.5 rounded-2xl flex items-center gap-3 text-sm font-bold shadow-lg shadow-red/5 max-w-md w-full">
                    <AlertCircle size={20} className="shrink-0" />
                    <span className="leading-relaxed">{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div ref={messagesEndRef} className="h-10" />
          </div>
        )}

      </div>

      {/* ━━━ Floating Input Dock ━━━ */}
      <div className="fixed bottom-0 left-0 w-full z-30 pb-6 pt-10 bg-gradient-to-t from-bg via-bg/90 to-transparent pointer-events-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pointer-events-auto">
          <motion.div 
            animate={{ 
              boxShadow: isFocused ? '0 10px 40px -10px rgba(26,107,60,0.3)' : '0 10px 30px -15px rgba(0,0,0,0.5)',
              borderColor: isFocused ? 'rgba(42,138,80,0.4)' : 'rgba(255,255,255,0.07)'
            }}
            className="relative flex items-end gap-3 bg-surface-2/90 backdrop-blur-2xl border border-border rounded-[2rem] p-2.5 transition-all duration-300"
          >
            {/* Pulsing glow inside the input area when focused */}
            <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`}></div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="ابحث عن معاملة، استفسر عن خدمة، أو اطرح سؤالاً..."
              className="flex-1 bg-transparent text-t1 text-base placeholder:text-t3/80 outline-none resize-none max-h-32 min-h-[52px] py-3.5 px-5 leading-relaxed font-medium z-10 scrollbar-hide"
              rows={input.split('\n').length > 1 ? Math.min(input.split('\n').length, 4) : 1}
              disabled={isLoading}
            />
            
            <div className="flex shrink-0 z-10 pl-1 pb-1">
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isLoading}
                className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center shrink-0 transition-all duration-300 ${
                  input.trim() && !isLoading
                    ? 'bg-primary text-white shadow-[0_0_20px_rgba(26,107,60,0.4)] hover:bg-primary-light hover:scale-105 active:scale-95'
                    : 'bg-surface-3 border border-border text-t3 opacity-70 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-primary-light" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <Send size={20} className="rtl:rotate-180 ml-1" />
                )}
              </button>
            </div>
          </motion.div>
          <p className="text-center text-[12px] text-t3 mt-4 font-semibold tracking-wide drop-shadow-sm flex items-center justify-center gap-1.5">
            <Sparkles size={12} className="text-primary/70" />
            مساعد فلسطين الذكي - تجريبية. قد يخطئ في بعض المعلومات.
            <Sparkles size={12} className="text-primary/70" />
          </p>
        </div>
      </div>
    </div>
  );
}
