import { Service } from '@/types/services';

// Lista completa de serviços
export const services: Service[] = [
  // Mega Hair
  { 
    id: 'mega-loiro-mel', 
    name: 'Mega cabelo loiro mel', 
    duration: '1h', 
    price: 200, 
    category: 'hair',
    description: 'Neste valor está incluso quatro telas de 200 gramas, tela adicional = 35 reais' // adicionado
  },
  { 
    id: 'mega-preto', 
    name: 'Mega hair preto', 
    duration: '1h', 
    price: 200, 
    category: 'hair',
    description: 'Neste valor está incluso quatro telas de 200 gramas, tela adicional = 35 reais' // adicionado
  },

  // Sobrancelhas
  { id: 'sobrancelha-simples', name: 'Sobrancelha (simples)', duration: '30min', price: 20, category: 'eyebrows' },
  { id: 'design-henna', name: 'Design sobrancelhas com henna', duration: '1h', price: 30, category: 'eyebrows' },

  // Progressivas (movidas para hair)
  { id: 'progressiva-curto', name: 'Progressiva cabelo curto', duration: '4h', price: 160, category: 'hair' },
  { id: 'progressiva-medio', name: 'Progressiva cabelo médio', duration: '4h30', price: 180, category: 'hair' },
  { id: 'progressiva-longo', name: 'Progressiva cabelo longo', duration: '4h', price: 210, category: 'hair' },
  { id: 'progressiva-extra-longo', name: 'Progressiva cabelo extra longo', duration: '4h30', price: 280, category: 'hair' },

  // Reconstrução e Nutrição
  { id: 'reconstrucao-escova', name: 'Reconstrução + escova', duration: '2h', price: 70, category: 'treatments' },
  { id: 'nutricao-escova', name: 'Nutrição + escova', duration: '2h', price: 70, category: 'treatments' },
  { id: 'nutricao-sem-escova', name: 'Nutrição sem escova', duration: '30min', price: 35, category: 'treatments' },

  // Escova e Hidratação
  { id: 'pacote-escova', name: 'Pacote de escova (1 mês)', duration: '1h30', price: 140, category: 'treatments', description: 'parcelado + taxa 5%' },
  { id: 'escova-lavagem', name: 'Escova (lavagem + escova)', duration: '1h30', price: 35, category: 'treatments' },
  { id: 'hidratacao-escova', name: 'Hidratação + escova', duration: '2h', price: 70, category: 'treatments' },
  { id: 'hidratacao-sem-escova', name: 'Hidratação sem escova', duration: '30min', price: 35, category: 'treatments' },

  // Luzes e Coloração
  { id: 'luzes-mechas', name: 'Luzes/mechas', duration: '5h', price: 280, category: 'hair' },

  // Tratamentos Especiais
  { id: 'botox-capilar', name: 'Botox capilar', duration: '4h', price: 130, category: 'treatments', description: 'a partir de' },
  { id: 'cauterizacao-escova', name: 'Cauterização + escova', duration: '1h30', price: 70, category: 'treatments' },
  { id: 'corte-limpeza', name: 'Corte (limpeza de pontas)', duration: '5min', price: 20, category: 'hair' },

  // Cronograma Capilar existente
  { 
    id: 'cronograma-capilar', 
    name: 'Cronograma capilar', 
    duration: '6 sessões (2h cada)', 
    price: 420, 
    category: 'treatments',
    description: 'São seis sessões de tratamento personalizado com escova, durante 1 mês e meio.' // adicionado
  },

  // Novo Cronograma Capilar (4 sessões)
  { 
    id: 'cronograma-capilar-4sessoes', 
    name: 'Cronograma capilar', 
    duration: '4 sessões (2h cada)', 
    price: 280, 
    category: 'treatments',
    description: 'São 4 sessões de tratamento personalizado com escova, durante 1 mês.' // novo serviço
  },

  //TINTA COMBO 
  {
    id: 'aplicacao-tinta',
    name: 'Aplicação tinta (COMBO)', 
    duration: '2h', 
    price: 100, 
    category: 'hair',
    description: 'Inlcuso esta: A aplicação de tinta hidratação e escova. '
  },
];

// Categorias de serviços
export const serviceCategories = {
  hair: { name: 'Cabelo', color: 'bruna-rose' },
  eyebrows: { name: 'Sobrancelhas', color: 'bruna-blue' },
  treatments: { name: 'Tratamentos', color: 'primary' },
};
