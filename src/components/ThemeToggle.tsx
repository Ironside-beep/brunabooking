import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="h-10 w-10 border-border/50 bg-card/50 backdrop-blur-sm transition-smooth hover:bg-card hover:shadow-elegant"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 transition-smooth" />
      ) : (
        <Sun className="h-5 w-5 transition-smooth" />
      )}
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
};