import { motion } from 'framer-motion';
import { Clock, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const schedule = [
  { day: 'Segunda a Sexta', hours: '09h00 às 12h00 | 12h30 às 18h00', available: true },
  { day: 'Sábado', hours: '08h00 às 12h00 | 12h30 às 16h00', available: true },
  { day: 'Domingo', hours: 'Fechado', available: false },
];

export const BusinessHours = () => {
  const handleLocationClick = () => {
    const address = 'Travessa Flamínio Bellini Carri, 91 - Recanto Verde do Sol';
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <section id="hours" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Horários & Localização
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos prontas para atendê-la com excelência
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Business Hours Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-playfair">Horário de Funcionamento</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {schedule.map((item, index) => (
                  <motion.div
                    key={item.day}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex justify-between items-center p-4 rounded-lg transition-smooth ${item.available
                        ? 'bg-muted/30 hover:bg-muted/50'
                        : 'bg-destructive/10 hover:bg-destructive/20'
                      }`}
                  >
                    <span className="font-medium">{item.day}</span>
                    <span className={`text-sm ${item.available ? 'text-primary' : 'text-destructive'
                      }`}>
                      {item.hours}
                    </span>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 p-4 bg-gradient-secondary rounded-lg text-center"
                >
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">
                    Agendamentos preferencialmente via WhatsApp
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Respondemos rapidamente!
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-playfair">Nossa Localização</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-medium mb-2">Endereço:</h4>
                    <p className="text-sm text-muted-foreground">
                      Travessa Flamínio Bellini Carri, 91
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Recanto Verde do Sol
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-gradient-secondary rounded-lg">
                      <div className="text-2xl font-bold text-primary">5+</div>
                      <div className="text-xs text-muted-foreground">Anos de experiência</div>
                    </div>
                    <div className="p-3 bg-gradient-secondary rounded-lg">
                      <div className="text-2xl font-bold text-primary">200+</div>
                      <div className="text-xs text-muted-foreground">Clientes satisfeitas</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    onClick={handleLocationClick}
                    variant="gradient"
                    size="lg"
                    className="w-full"
                  >
                    <MapPin className="h-4 w-4" />
                    Como Chegar
                  </Button>
                </motion.div>


              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};