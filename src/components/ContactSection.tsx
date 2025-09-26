import { motion } from 'framer-motion';
import { MessageCircle, Phone, MapPin, Instagram, Facebook, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    subtitle: 'Resposta rápida',
    info: '(11) 98630-4563',
    action: () => window.open('https://wa.me/5511986304563?text=Olá! Gostaria de mais informações sobre os serviços do Studio Bruna! 💖', '_blank'),
    color: 'text-green-500',
    bgColor: 'bg-green-500/10 hover:bg-green-500/20'
  },
  {
    icon: Phone,
    title: 'Telefone',
    subtitle: 'Ligação direta',
    info: '(11) 98630-4563',
    action: () => window.open('tel:+5511986304563', '_self'),
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10 hover:bg-blue-500/20'
  },
  {
    icon: MapPin,
    title: 'Localização',
    subtitle: 'Como chegar',
    info: 'Recanto Verde do Sol',
    action: () => {
      const address = 'Travessa Flamínio Bellini Carri, 91 - Recanto Verde do Sol';
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      window.open(mapsUrl, '_blank');
    },
    color: 'text-red-500',
    bgColor: 'bg-red-500/10 hover:bg-red-500/20'
  },
  {
    icon: Instagram,
    title: 'Instagram',
    subtitle: '@studiobruna',
    info: 'Siga-nos',
    action: () => window.open('https://www.instagram.com/studio_bruna12', '_blank'),
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10 hover:bg-pink-500/20'
  }
];

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Vamos Conversar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Entre em contato conosco e agende sua transformação
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card
                className={`h-full cursor-pointer transition-all duration-300 hover:shadow-elegant border-border/50 ${method.bgColor} group`}
                onClick={method.action}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <method.icon className="h-6 w-6 text-primary-foreground" />
                  </div>

                  <h3 className="font-playfair font-semibold text-lg mb-1 group-hover:text-primary transition-smooth">
                    {method.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-2">
                    {method.subtitle}
                  </p>

                  <p className={`text-sm font-medium ${method.color}`}>
                    {method.info}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-primary text-primary-foreground shadow-elegant max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-playfair">
                Pronta para Transformar seu Visual?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg opacity-90">
                Estou ansiosa para cuidar da sua beleza com todo carinho e profissionalismo
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.open('https://wa.me/5511986304563?text=Olá! Quero agendar minha transformação no Studio Bruna! 💖✨', '_blank')}
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 shadow-elegant"
                >
                  <MessageCircle className="h-4 w-4" />
                  Agendar Agora
                </Button>

                <Button
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  Ver Serviços
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-xs opacity-80">Anos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">200+</div>
                  <div className="text-xs opacity-80">Clientes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">⭐ 5.0</div>
                  <div className="text-xs opacity-80">Avaliação</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
      </div>
    </section>
  );
};