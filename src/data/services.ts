import { Service } from '@/types/services';

export const services: Service[] = [
  // Mega Hair
  { id: 'mega-loiro-mel', name: 'Mega cabelo loiro mel', duration: '1h', price: 200, category: 'hair' },
  { id: 'mega-preto', name: 'Mega hair preto', duration: '1h', price: 200, category: 'hair' },
  
  // Sobrancelhas
  { id: 'sobrancelha-simples', name: 'Sobrancelha (simples)', duration: '30min', price: 20, category: 'eyebrows' },
  { id: 'design-henna', name: 'Design sobrancelhas com henna', duration: '1h', price: 30, category: 'eyebrows' },
  
  // Progressivas
  { id: 'progressiva-curto', name: 'Progressiva cabelo curto', duration: '4h', price: 170, category: 'treatments' },
  { id: 'progressiva-medio', name: 'Progressiva cabelo médio', duration: '4h30', price: 200, category: 'treatments' },
  { id: 'progressiva-longo', name: 'Progressiva cabelo longo', duration: '4h', price: 200, category: 'treatments' },
  { id: 'progressiva-extra-longo', name: 'Progressiva cabelo extra longo', duration: '4h30', price: 280, category: 'treatments' },
  
  // Reconstrução e Nutrição
  { id: 'reconstrucao-escova', name: 'Reconstrução + escova', duration: '2h', price: 80, category: 'treatments' },
  { id: 'nutricao-escova', name: 'Nutrição + escova', duration: '2h', price: 75, category: 'treatments' },
  { id: 'nutricao-sem-escova', name: 'Nutrição sem escova', duration: '30min', price: 40, category: 'treatments' },
  
  // Escova e Hidratação
  { id: 'pacote-escova', name: 'Pacote de escova (1 mês)', duration: '1h30', price: 200, category: 'treatments', description: 'parcelado + taxa 5%' },
  { id: 'escova-lavagem', name: 'Escova (lavagem + escova)', duration: '1h30', price: 50, category: 'treatments' },
  { id: 'hidratacao-escova', name: 'Hidratação + escova', duration: '2h', price: 80, category: 'treatments' },
  { id: 'hidratacao-sem-escova', name: 'Hidratação sem escova', duration: '30min', price: 40, category: 'treatments' },
  
  // Luzes e Coloração
  { id: 'luzes-mechas', name: 'Luzes/mechas', duration: '5h', price: 280, category: 'hair' },
  { id: 'aplicacao-tinta', name: 'Aplicação tinta (sem escova)', duration: '40min', price: 40, category: 'hair' },
  
  // Tratamentos Especiais
  { id: 'botox-capilar', name: 'Botox capilar', duration: '4h', price: 150, category: 'treatments', description: 'a partir de' },
  { id: 'cauterizacao-escova', name: 'Cauterização + escova', duration: '1h30', price: 80, category: 'treatments' },
  { id: 'corte-limpeza', name: 'Corte (limpeza de pontas)', duration: '5min', price: 20, category: 'hair' },
  
  // Cronograma Capilar
  { id: 'cronograma-capilar', name: 'Cronograma capilar', duration: '6 sessões (2h cada)', price: 480, category: 'treatments' },
];

export const serviceCategories = {
  hair: { name: 'Cabelo', color: 'bruna-rose' },
  eyebrows: { name: 'Sobrancelhas', color: 'bruna-blue' },
  treatments: { name: 'Tratamentos', color: 'primary' },
};