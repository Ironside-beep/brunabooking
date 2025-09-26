import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Image, MessageCircle, Clock, Sparkles } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { href: '#services', label: 'Serviços', icon: Sparkles },
  { href: '#contact', label: 'Contato', icon: MessageCircle },
  { href: '#hours', label: 'Horários', icon: Clock },
];

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 30 
            }}
            className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 max-w-[90vw] bg-card/95 backdrop-blur-md border-l border-border/50 shadow-elegant z-50"
          >
            <div className="p-6">
              <nav className="space-y-4">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={onClose}
                    className="flex items-center space-x-4 p-4 rounded-lg transition-smooth hover:bg-muted/50 group"
                  >
                    <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center group-hover:shadow-rose transition-smooth">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-lg font-medium group-hover:text-primary transition-smooth">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Decorative Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 p-6 bg-gradient-primary rounded-xl text-primary-foreground text-center"
              >
                <h3 className="font-playfair font-semibold text-lg mb-2">
                  Agende já!
                </h3>
                <p className="text-sm opacity-90">
                  Transforme seu visual conosco
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};