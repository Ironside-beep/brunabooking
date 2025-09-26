import logo from "@/assets/logo.jpg";
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useCart } from '@/contexts/CartContext';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export const Header = ({ onMenuToggle, isMenuOpen }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const { getTotalItems, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-elegant border-b border-border/50' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={logo}
              alt="Logo Studio Bruna"
              className="w-10 h-10 rounded-full object-cover shadow-rose"
            />

            <div className="flex flex-col leading-none">
              <h1 className="text-xl font-playfair font-bold bg-gradient-primary bg-clip-text text-transparent">
                STUDIO
              </h1>
              <span className="text-sm font-playfair font-medium text-muted-foreground">
                BRUNA
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-sm font-medium hover:text-primary transition-smooth">
              Serviços
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-smooth">
              Contato
            </a>
            <a href="#hours" className="text-sm font-medium hover:text-primary transition-smooth">
              Horários
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Cart Button */}
            <Button
              variant="outline" 
              size="icon"
              onClick={toggleCart}
              className="relative h-10 w-10 border-border/50 bg-card/50 backdrop-blur-sm transition-smooth hover:bg-card hover:shadow-elegant"
            >
              <ShoppingBag className="h-5 w-5" />
              <AnimatePresence>
                {getTotalItems() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 h-5 w-5 bg-gradient-primary text-xs font-bold text-primary-foreground rounded-full flex items-center justify-center shadow-rose"
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={onMenuToggle}
              className="md:hidden h-10 w-10 border-border/50 bg-card/50 backdrop-blur-sm transition-smooth hover:bg-card hover:shadow-elegant"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};