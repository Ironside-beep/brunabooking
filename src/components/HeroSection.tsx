import { motion } from 'framer-motion';
import { Calendar, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const handleScrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">

      {/* Background Animation */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-8"
        >

          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 shadow-elegant"
          >
            <Star className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              Salão de Beleza Premium
            </span>
          </motion.div>

          {/* Main Title */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold"
            >
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                STUDIO
              </span>
              <br />
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                BRUNA
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Transforme seu visual com nossos tratamentos exclusivos.
              <br />
              <span className="text-primary font-medium">Beleza, elegância e inovação em cada detalhe.</span>
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={handleScrollToServices}
              variant="hero"
              size="xl"
              className="px-8"
            >
              <Sparkles className="h-5 w-5" />
              Ver Serviços
            </Button>

            <Button
              onClick={() => window.open('https://wa.me/5511986304563?text=Olá! Gostaria de agendar um horário no Studio Bruna 💖', '_blank')}
              variant="outline"
              size="xl"
              className="px-8 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card hover:shadow-elegant transition-smooth"
            >
              <Calendar className="h-5 w-5" />
              Agendar Agora
            </Button>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16"
          >
            {[
              { title: 'Produtos Premium', desc: 'Apenas os melhores produtos' },
              { title: 'Profissional Qualificada', desc: 'Especializada e Experiente' },
              { title: 'Agendamento Online', desc: 'Rápido e prático via WhatsApp' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:bg-card/50 transition-smooth group hover:shadow-elegant"
              >
                
                <h3 className="font-playfair font-semibold text-lg mb-2 group-hover:text-primary transition-smooth">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};