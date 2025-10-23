// src/components/Cart.tsx
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale/pt-BR';

// SweetAlert2
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

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
  const [isLoading, setIsLoading] = useState(false);
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);

  // Lista de horários disponíveis
  const horariosDisponiveis = [
    '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00'
  ];

  // -------------------
  // Helpers
  // -------------------

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
🕐 *Horário preferido:* ${hora || '[Não informada]'}
💇‍♀️ *Descrição do cabelo:* ${descricao || '[Não informada]'}

Gostaria de agendar esses serviços! 💖`;
  };

  // Converte "HH:mm" + data (Date) para Date completo
  const parseHora = (horaStr: string, dataBase: Date) => {
    const [hStr, mStr] = (horaStr || '').split(':');
    const h = Number(hStr ?? 0);
    const m = Number(mStr ?? 0);
    const d = new Date(dataBase);
    d.setHours(h, m, 0, 0);
    return d;
  };

  const getDurationMinutes = (item: any): number => {
    const d = item?.duration;

    if (d == null) return 0;

    if (typeof d === 'number' && Number.isFinite(d)) return d;

    if (typeof d === 'string') {
      const s = d.trim();
      const hMatch = s.match(/^(\d+)\s*h(?:\s*(\d+)\s*min?)?$/i);
      if (hMatch) {
        const hours = parseInt(hMatch[1], 10);
        const mins = hMatch[2] ? parseInt(hMatch[2], 10) : 0;
        return hours * 60 + mins;
      }
      const minMatch = s.match(/^(\d+)\s*(min|m|minutos?)$/i);
      if (minMatch) {
        return parseInt(minMatch[1], 10);
      }
      const hhmmMatch = s.match(/^(\d{1,2}):(\d{2})$/);
      if (hhmmMatch) {
        const hh = parseInt(hhmmMatch[1], 10);
        const mm = parseInt(hhmmMatch[2], 10);
        return hh * 60 + mm;
      }
      if (/^\d+$/.test(s)) {
        return parseInt(s, 10);
      }
    }
    return 0;
  };

  const calcularHoraFinal = (start: Date) => {
    let totalMin = 0;
    state.items.forEach((item: any) => {
      totalMin += getDurationMinutes(item) * (item.quantity ?? 1);
    });
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + totalMin);
    return end;
  };

  const formatTimeHHMMSS = (d: Date) => {
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  };

  // -------------------
  // Salva e checa duplicidade no BD
  // -------------------
  const saveBooking = async () => {
    if (!data) return { success: false, error: new Error('Data inválida'), conflict: false };
    if (!hora) return { success: false, error: new Error('Hora inválida'), conflict: false };

    const startDateObj = parseHora(hora, data);
    const endDateObj = calcularHoraFinal(startDateObj);

    const horaDB = formatTimeHHMMSS(startDateObj);
    const endTimeISO = endDateObj.toISOString();
    const startTimeISO = startDateObj.toISOString();

    try {
      const dayStart = new Date(data);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(data);
      dayEnd.setHours(23, 59, 59, 999);

      const { data: existing, error: fetchError } = await supabase
        .from('STUDIO_BRUNA')
        .select('id, data, hora, end_time')
        .gte('data', dayStart.toISOString())
        .lte('data', dayEnd.toISOString());

      if (fetchError) {
        console.error('Erro ao buscar agendamentos existentes:', fetchError);
        return { success: false, error: fetchError, conflict: false };
      }

      const parseExistingInterval = (b: any) => {
        const bData = b?.data;
        const bHora = b?.hora;
        const bEnd = b?.end_time;

        let datePart = null;
        if (typeof bData === 'string' && bData.includes('T')) datePart = bData.split('T')[0];
        else if (typeof bData === 'string') datePart = bData;
        else if (bData instanceof Date) datePart = bData.toISOString().split('T')[0];

        let startDate: Date | null = null;
        if (bHora && datePart) startDate = new Date(`${datePart}T${String(bHora).slice(0, 8)}`);
        else if (typeof bData === 'string' && bData.includes('T')) startDate = new Date(bData);
        else if (bData instanceof Date) startDate = new Date(bData);

        let endDate: Date | null = null;
        if (typeof bEnd === 'string' && bEnd.includes('T')) endDate = new Date(bEnd);
        else if (typeof bEnd === 'string' && datePart) endDate = new Date(`${datePart}T${String(bEnd).slice(0, 8)}`);
        else if (bEnd instanceof Date) endDate = new Date(bEnd);

        return { startDate, endDate };
      };

      const newStartMin = startDateObj.getHours() * 60 + startDateObj.getMinutes();
      const newEndMin = endDateObj.getHours() * 60 + endDateObj.getMinutes();

      const conflito = (existing ?? []).some((b: any) => {
        const { startDate: bStartDate, endDate: bEndDate } = parseExistingInterval(b);
        if (!bStartDate || !bEndDate) return true;

        const bStartMin = bStartDate.getHours() * 60 + bStartDate.getMinutes();
        const bEndMin = bEndDate.getHours() * 60 + bEndDate.getMinutes();

        return newStartMin < bEndMin && bStartMin < newEndMin;
      });

      if (conflito) return { success: false, error: null, conflict: true };

      const { error: insertError } = await supabase
        .from('STUDIO_BRUNA')
        .insert({
          nome,
          descricao: descricao && descricao.trim() !== '' ? descricao : null,
          data: startTimeISO,
          hora: horaDB,
          end_time: endTimeISO,
        });

      if (insertError) {
        console.error('Erro ao inserir agendamento:', insertError);
        return { success: false, error: insertError, conflict: false };
      }

      return { success: true };
    } catch (err) {
      console.error('Erro inesperado em saveBooking:', err);
      return { success: false, error: err as Error, conflict: false };
    }
  };

  // -------------------
  // Filtra horários disponíveis baseado nos agendamentos
  // -------------------
  useEffect(() => {
    const fetchHorariosOcupados = async () => {
      if (!data) return setHorariosOcupados([]);
      const dayStart = new Date(data); dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(data); dayEnd.setHours(23, 59, 59, 999);

      const { data: existing, error } = await supabase
        .from('STUDIO_BRUNA')
        .select('hora, end_time')
        .gte('data', dayStart.toISOString())
        .lte('data', dayEnd.toISOString());

      if (error) {
        console.error('Erro ao buscar horários ocupados:', error);
        return;
      }

      const ocupados: string[] = [];
      (existing ?? []).forEach((b: any) => {
        const start = b?.hora ? b.hora : null;
        const end = b?.end_time ? new Date(b.end_time) : null;
        if (!start || !end) return;

        const [hStr, mStr] = start.split(':');
        const startMin = Number(hStr) * 60 + Number(mStr);

        const endMin = end.getHours() * 60 + end.getMinutes();

        horariosDisponiveis.forEach(h => {
          const [hh, mm] = h.split(':').map(Number);
          const timeMin = hh * 60 + mm;
          if (timeMin >= startMin && timeMin < endMin) ocupados.push(h);
        });
      });

      setHorariosOcupados(ocupados);
    };

    fetchHorariosOcupados();
  }, [data, state.items]);

  // -------------------
  // Handler WhatsApp
  // -------------------
  const handleWhatsAppRedirect = async () => {
    // descrição agora é opcional — não faz parte da validação obrigatória
    if (!nome || !data || !hora) {
      await Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, preencha nome, data e horário antes de continuar.',
        icon: 'info',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#E75480',
        background: '#fff7f9',
        color: '#5a2a45',
        iconColor: '#E75480'
      });
      return;
    }

    const newWindow = window.open('', '_blank');
    setIsLoading(true);

    try {
      const result = await saveBooking();
      if (!result.success) {
        if (result.conflict) {
          await Swal.fire({
            title: 'Horário ocupado',
            text: 'Desculpe, este horário (ou o intervalo requisitado) já está ocupado. Escolha outro.',
            icon: 'warning',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#E75480',
            background: '#fff7f9',
            color: '#5a2a45',
            iconColor: '#E75480'
          });
        } else {
          console.error('Erro ao salvar agendamento:', result.error);
          await Swal.fire({
            title: 'Erro',
            text: 'Erro ao salvar o agendamento. Tente novamente.',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#E75480',
            background: '#fff7f9',
            color: '#5a2a45',
            iconColor: '#E75480'
          });
        }
        if (newWindow) try { newWindow.close(); } catch (e) { }
        return;
      }

      const message = generateWhatsAppMessage();
      const phoneNumber = '5511986304563';
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

      if (newWindow) newWindow.location.href = whatsappUrl;
      else window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.error('Erro inesperado:', err);
      await Swal.fire({
        title: 'Falha inesperada',
        text: 'Falha inesperada. Atualize a página e tente novamente.',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#E75480',
        background: '#fff7f9',
        color: '#5a2a45',
        iconColor: '#E75480'
      });
      if (newWindow) try { newWindow.close(); } catch (e) { }
    } finally {
      setIsLoading(false);
    }
  };

  // Handler específico para DatePicker com tipagem correta
  const handleDateChange = (date: Date | null) => {
    setData(date);
  };

  // -------------------
  // Render
  // -------------------
  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-96 max-w-[90vw] bg-card/95 backdrop-blur-md border-l border-border/50 shadow-elegant z-50 flex flex-col"
          >
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  <span>Carrinho ({getTotalItems()})</span>
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={closeCart} className="h-8 w-8">
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
                          <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{item.duration} • R$ {item.price}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="h-6 w-6 text-destructive hover:text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-7 w-7">
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-7 w-7">
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
                    placeholder="Descreva seu cabelo (opcional)" 
                    value={descricao} 
                    onChange={(e) => setDescricao(e.target.value)} 
                    className="w-full rounded-md border border-border/50 bg-background/70 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" 
                    rows={3} 
                    disabled={isLoading} 
                  />
                  
                  <DatePicker 
                    selected={data} 
                    onChange={handleDateChange}
                    placeholderText="Escolha a data" 
                    className="w-full rounded-md border border-border/50 bg-background/70 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" 
                    minDate={new Date()} 
                    dateFormat="dd/MM/yyyy" 
                    locale="pt-BR" 
                    disabled={isLoading}
                    wrapperClassName="w-full"
                  />
                  
                  <select 
                    value={hora} 
                    onChange={(e) => setHora(e.target.value)} 
                    className="w-full rounded-md border border-border/50 bg-background/70 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" 
                    disabled={isLoading}
                  >
                    <option value="">Escolha o horário</option>
                    {horariosDisponiveis.map((h) => (
                      <option key={h} value={h} disabled={horariosOcupados.includes(h)}>
                        {h}{horariosOcupados.includes(h) ? ' (ocupado)' : ''}
                      </option>
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