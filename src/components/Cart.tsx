// src/components/Cart.tsx
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale/pt-BR';

registerLocale('pt-BR', ptBR);

export const Cart = () => {
  const { 
    state, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    closeCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCart();

  // Estados para Nome, Descrição, Data e Hora
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState<Date | null>(null);
  const [hora, setHora] = useState('');
  const [isLoading, setIsLoading] = useState(false); // novo estado

  // Lista de horários disponíveis
  const horariosDisponiveis = [
    '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00'
  ];

  const generateWhatsAppMessage = () => {
    const services = state.items.map(item => 
      `• ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const total = getTotalPrice().toFixed(2);
    const dataFormatada = data ? data.toLocaleDateString('pt-BR') : '[Não informada]';
    
    return `🌸 *AGENDAMENTO STUDIO BRUNA* 🌸

📋 *Serviços Selecionados:*
${services}

💰 *Total: R$ ${total}*

👤 *Nome:* ${nome || '[Não informado]'}
📅 *Data preferida:* ${dataFormatada}
🕐 *Horário preferido:* ${hora || '[Não informado]'}
💇‍♀️ *Descrição do cabelo:* ${descricao || '[Não informado]'}

Gostaria de agendar esses serviços! 💖`;
  };

  // Salva e checa duplicidade no BD — retorna objeto com resultado detalhado
  const saveBooking = async () => {
    const dateStr = data ? data.toISOString().split('T')[0] : null;
    if (!dateStr) {
      return { success: false, error: new Error('Data inválida'), conflict: false };
    }

    try {
      // Verifica se já existe agendamento na mesma data e hora
      const { data: existing, error: checkError } = await supabase
        .from('STUDIO_BRUNA')
        .select('id')
        .eq('data', dateStr)
        .eq('hora', hora)
        .limit(1);

      if (checkError) {
        return { success: false, error: checkError, conflict: false };
      }

      if (existing && existing.length > 0) {
        return { success: false, error: null, conflict: true };
      }

      // Insere o agendamento
      const { error: insertError } = await supabase
        .from('STUDIO_BRUNA')
        .insert({
          nome,
          descricao,
          data: dateStr,
          hora,
        });

      if (insertError) {
        return { success: false, error: insertError, conflict: false };
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: err as Error, conflict: false };
    }
  };

  // Handler que abre popup SINCRONAMENTE para evitar bloqueio no Safari
  const handleWhatsAppRedirect = async () => {
    // validações front-end
    if (!nome || !descricao || !data || !hora) {
      alert('Por favor, preencha nome, descrição, data e horário antes de continuar.');
      return;
    }

    // Abre uma janela/guia em branco imediatamente — isso garante que navegadores móveis
    // não bloqueiem o popup, pois foi aberto dentro do evento de clique do usuário.
    const newWindow = window.open('', '_blank');

    setIsLoading(true);

    try {
      const result = await saveBooking();

      if (!result.success) {
        if (result.conflict) {
          alert('Desculpe, este horário já está ocupado. Escolha outro.');
        } else {
          console.error('Erro ao salvar agendamento:', result.error);
          alert('Erro ao salvar o agendamento. Tente novamente.');
        }
        // Fecha a janela em branco caso não tenha sido possível salvar
        if (newWindow) {
          try { newWindow.close(); } catch (e) { /* ignorar */ }
        }
        return;
      }

      // Se chegou aqui, salvou com sucesso — gera a mensagem e redireciona a janela aberta
      const message = generateWhatsAppMessage();
      const phoneNumber = '5511986304563';
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

      if (newWindow) {
        // redireciona a janela já aberta para o WhatsApp
        newWindow.location.href = whatsappUrl;
      } else {
        // fallback — abrir normalmente (pode ser bloqueado em alguns navegadores)
        window.open(whatsappUrl, '_blank');
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      alert('Falha inesperada. Atualize a página e tente novamente.');
      if (newWindow) {
        try { newWindow.close(); } catch (e) { /* ignorar */ }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={closeCart}
          />
          
          {/* Cart */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 30 
            }}
            className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-96 max-w-[90vw] bg-card/95 backdrop-blur-md border-l border-border/50 shadow-elegant z-50 flex flex-col"
          >
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  <span>Carrinho ({getTotalItems()})</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeCart}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto">
              {state.items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Carrinho vazio</h3>
                  <p className="text-muted-foreground text-sm">
                    Adicione alguns serviços para começar
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-muted/30 rounded-lg p-4 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm leading-tight">
                            {item.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.duration} • R$ {item.price}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="h-6 w-6 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-7 w-7"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-7 w-7"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="font-semibold text-primary">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>

            {state.items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-shrink-0 p-6 border-t border-border/50 space-y-4"
              >
                {/* Inputs: Nome, Descrição, Data e Hora com seletores */}
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full rounded-md border border-border/50 bg-background/70 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={isLoading}
                  />
                  <textarea
                    placeholder="Descreva seu cabelo"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="w-full rounded-md border border-border/50 bg-background/70 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows={3}
                    disabled={isLoading}
                  />
                  <DatePicker
                    selected={data}
                    onChange={(date) => setData(date)}
                    placeholderText="Escolha a data"
                    className="w-full rounded-md border border-border/50 bg-background/70 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    locale="pt-BR"
                    disabled={isLoading}
                  />
                  <select
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    className="w-full rounded-md border border-border/50 bg-background/70 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={isLoading}
                  >
                    <option value="">Escolha o horário</option>
                    {horariosDisponiveis.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    R$ {getTotalPrice().toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={handleWhatsAppRedirect}
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {isLoading ? 'Agendando...' : 'Agendar via WhatsApp'}
                  </Button>
                  
                  <Button
                    onClick={clearCart}
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={isLoading}
                  >
                    Limpar Tudo
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
