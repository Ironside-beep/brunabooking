import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

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
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Expanded Menu */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-16 right-0 bg-card/95 backdrop-blur-md border border-border/50 rounded-2xl p-4 shadow-elegant min-w-[200px]"
              >
                <div className="space-y-3">
                  <button
                    onClick={handleWhatsAppClick}
                    className="flex items-center space-x-3 w-full p-3 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-600 transition-smooth group"
                  >
                    <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="font-medium text-sm">WhatsApp</div>
                      <div className="text-xs opacity-70">Resposta rápida</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center space-x-3 w-full p-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-smooth group"
                  >
                    <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="font-medium text-sm">Ver Serviços</div>
                      <div className="text-xs opacity-70">Escolha seu tratamento</div>
                    </div>
                  </button>
                </div>
                
                <div className="mt-4 pt-3 border-t border-border/50 text-center">
                  <p className="text-xs text-muted-foreground">
                    ⏰ Resposta em até 5 minutos
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="floating"
              className="shadow-elegant hover:shadow-rose group"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Calendar className="h-6 w-6" />
              </motion.div>
            </Button>

            {/* Pulse Animation */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-primary rounded-full"
            />

            {/* Notification Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                !
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Quick Actions Tooltip */}
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2 shadow-elegant pointer-events-none"
            >
              <div className="text-sm font-medium whitespace-nowrap">
                AGENDAR AGORA
              </div>
              <div className="text-xs text-muted-foreground">
                Clique para opções
              </div>
              
              {/* Arrow */}
              <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-card/95 border-t-2 border-b-2 border-t-transparent border-b-transparent" />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};