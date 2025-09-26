import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/ServiceCard';
import { services, serviceCategories } from '@/data/services';

type CategoryFilter = 'all' | 'hair' | 'eyebrows' | 'treatments';

const filterOptions = [
  { value: 'all' as CategoryFilter, label: 'Todos', icon: '✨' },
  { value: 'hair' as CategoryFilter, label: 'Cabelo'},
  { value: 'eyebrows' as CategoryFilter, label: 'Sobrancelhas'},
  { value: 'treatments' as CategoryFilter, label: 'Tratamentos'},
];

export const ServiceGrid = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const filteredServices = activeFilter === 'all' 
    ? services 
    : services.filter(service => service.category === activeFilter);

  return (
    <section id="services" className="py-20 bg-gradient-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Nossos Serviços
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transforme seu visual com nossos tratamentos exclusivos e técnicas modernas
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              variant={activeFilter === option.value ? 'gradient' : 'outline'}
              className={`transition-all duration-300 ${
                activeFilter === option.value 
                  ? 'shadow-elegant scale-105' 
                  : 'hover:shadow-rose'
              }`}
            >
              <span className="mr-2" role="img" aria-label={option.label}>
                {option.icon}
              </span>
              {option.label}
            </Button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </motion.div>

        {/* Service Count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-muted-foreground">
            {filteredServices.length} serviço{filteredServices.length !== 1 ? 's' : ''} 
            {activeFilter !== 'all' && (
              <span> em {filterOptions.find(f => f.value === activeFilter)?.label}</span>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};