import { motion } from 'framer-motion';
import { Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Service } from '@/types/services';
import { useCart } from '@/contexts/CartContext';
import { serviceCategories } from '@/data/services';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const { addItem } = useCart();
  const category = serviceCategories[service.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card hover:border-primary/20 transition-all duration-300 hover:shadow-elegant">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl" role="img" aria-label={category.name}>
                  {category.icon}
                </span>
                <span className="text-xs font-medium text-muted-foreground px-2 py-1 bg-muted/50 rounded-full">
                  {category.name}
                </span>
              </div>
              
              <h3 className="font-playfair font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-smooth">
                {service.name}
              </h3>
              
              {/* Exibe a descrição se existir */}
              {service.description && (
                <p className="text-sm text-muted-foreground mb-3">
                  {service.description}
                </p>
              )}
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-right">
              <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                R$ {service.price}
              </div>
            </div>

            <Button
              onClick={() => addItem(service)}
              variant="gradient"
              size="sm"
              className="group-hover:scale-105 transition-bounce"
            >
              <Plus className="h-4 w-4" />
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
