import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const galleryImages = [
  {
    id: 1,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop',
    title: 'Progressiva Premium',
    description: 'Cabelo liso e sedoso'
  },
  {
    id: 2,
    category: 'color',
    image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?w=400&h=300&fit=crop',
    title: 'Luzes Californianas',
    description: 'Tons dourados naturais'
  },
  {
    id: 3,
    category: 'eyebrows',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop',
    title: 'Design de Sobrancelhas',
    description: 'Formato perfeito com henna'
  },
  {
    id: 4,
    category: 'treatment',
    image: 'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?w=400&h=300&fit=crop',
    title: 'Botox Capilar',
    description: 'Recuperação total dos fios'
  },
  {
    id: 5,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1580618671320-b9afbc471e46?w=400&h=300&fit=crop',
    title: 'Corte Moderno',
    description: 'Estilo contemporâneo'
  },
  {
    id: 6,
    category: 'color',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=300&fit=crop',
    title: 'Mega Hair Loiro',
    description: 'Volume e comprimento'
  },
  {
    id: 7,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=300&fit=crop',
    title: 'Escova Modeladora',
    description: 'Movimento e brilho'
  },
  {
    id: 8,
    category: 'treatment',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop',
    title: 'Hidratação Intensiva',
    description: 'Nutrição profunda'
  },
  {
    id: 9,
    category: 'eyebrows',
    image: 'https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=400&h=300&fit=crop',
    title: 'Micropigmentação',
    description: 'Resultado natural'
  }
];

const categories = [
  { value: 'all', label: 'Todos', icon: '✨' },
  { value: 'hair', label: 'Cabelo', icon: '💇‍♀️' },
  { value: 'color', label: 'Coloração', icon: '🎨' },
  { value: 'eyebrows', label: 'Sobrancelhas', icon: '✨' },
  { value: 'treatment', label: 'Tratamentos', icon: '💆‍♀️' },
];

export const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Galeria de Inspirações
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja nossos trabalhos e inspire-se para sua próxima transformação
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${activeCategory === category.value
                  ? 'bg-gradient-primary text-primary-foreground shadow-elegant'
                  : 'bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card hover:shadow-rose'
                }`}
            >
              <span role="img" aria-label={category.label}>
                {category.icon}
              </span>
              <span className="font-medium">{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="group h-full bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card hover:shadow-elegant transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">

                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-elegant">
                      {categories.find(c => c.value === image.category)?.label || 'Serviço'}
                    </div>

                    {/* Heart Icon */}
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Heart className="h-4 w-4 text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-playfair font-semibold text-lg mb-1 group-hover:text-primary transition-smooth">
                          {image.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {image.description}
                        </p>

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-1 text-primary">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="font-medium">Resultado profissional</span>
                          </div>
                          <span className="text-muted-foreground capitalize">
                            {categories.find(c => c.value === image.category)?.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-primary rounded-2xl p-8 text-primary-foreground">
            <h3 className="font-playfair text-2xl font-semibold mb-2">
              Inspire-se e transforme-se conosco!
            </h3>
            <p className="opacity-90 mb-6">
              Agende seu horário e descubra como podemos realçar sua beleza natural
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://wa.me/5511986304563?text=Olá! Vi a galeria e gostaria de agendar um serviço! 💖', '_blank')}
              className="bg-white text-primary px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-smooth shadow-elegant"
            >
              ✨ Agendar Agora
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};