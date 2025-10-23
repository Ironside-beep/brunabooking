import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export const FloatingScheduleButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleWhatsAppClick = () => {
    const message = `🌸 Olá! Gostaria de agendar um horário no Studio Bruna!

📅 Tenho interesse em conhecer os serviços disponíveis.

Obrigada! 💖`;
    
    const phoneNumber = '5511986304563';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-8 right-8 z-50"
        >
          {/* Expanded Menu */}
          <AnimatePresence>
            {isExpanded && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsExpanded(false)}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
                />
                
                {/* Menu Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-20 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-pink-100 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 text-white">
                    <h3 className="font-semibold text-lg">Agende seu horário</h3>
                    <p className="text-sm text-pink-50">Escolha como prefere continuar</p>
                  </div>

                  {/* Actions */}
                  <div className="p-4 space-y-3">
                    <button
                      onClick={handleWhatsAppClick}
                      className="flex items-center space-x-4 w-full p-4 rounded-xl bg-green-50 hover:bg-green-100 border border-green-200 transition-all duration-300 group hover:scale-[1.02] hover:shadow-lg"
                    >
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-gray-800">WhatsApp</div>
                        <div className="text-xs text-gray-600">Resposta rápida garantida</div>
                      </div>
                      <div className="text-green-600 font-bold">→</div>
                    </button>
                  
                    <button
                      onClick={() => {
                        setIsExpanded(false);
                        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex items-center space-x-4 w-full p-4 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-all duration-300 group hover:scale-[1.02] hover:shadow-lg"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-gray-800">Ver Serviços</div>
                        <div className="text-xs text-gray-600">Escolha seu tratamento</div>
                      </div>
                      <div className="text-pink-600 font-bold">→</div>
                    </button>
                  </div>
                
                  {/* Footer */}
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span>Atendimento disponível agora</span>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-xl hover:shadow-2xl transition-shadow flex items-center justify-center group overflow-hidden"
          >
            {/* Animated gradient background */}
            <motion.div
              animate={{
                background: [
                  'linear-gradient(45deg, #ec4899, #f43f5e)',
                  'linear-gradient(45deg, #f43f5e, #ec4899)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute inset-0"
            />

            {/* Icon */}
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              {isExpanded ? (
                <X className="h-7 w-7 text-white" />
              ) : (
                <Calendar className="h-7 w-7 text-white" />
              )}
            </motion.div>

            {/* Pulse Animation Ring */}
            {!isExpanded && (
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-pink-400 rounded-full"
              />
            )}

            {/* Notification Badge */}
            {!isExpanded && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="text-white text-sm font-bold"
                >
                  !
                </motion.div>
              </motion.div>
            )}
          </motion.button>

          {/* Floating Tooltip */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.5 }}
                className="absolute right-20 top-1/2 transform -translate-y-1/2 pointer-events-none"
              >
                <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl relative">
                  <div className="font-semibold text-sm whitespace-nowrap">
                    Agende Agora! ✨
                  </div>
                  <div className="text-xs text-gray-300">
                    Clique para opções
                  </div>
                  
                  {/* Arrow */}
                  <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2">
                    <div className="w-0 h-0 border-l-8 border-l-gray-900 border-t-4 border-b-4 border-t-transparent border-b-transparent" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};