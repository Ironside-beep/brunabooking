import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Header } from '@/components/Header';
import { MobileMenu } from '@/components/MobileMenu';
import { HeroSection } from '@/components/HeroSection';
import { ServiceGrid } from '@/components/ServiceGrid';
import { BusinessHours } from '@/components/BusinessHours';
import { ContactSection } from '@/components/ContactSection';
import { Cart } from '@/components/Cart';
import { FloatingScheduleButton } from '@/components/FloatingScheduleButton';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // ----------------------------
  // Alert de sinal ao carregar
  // ----------------------------
  useEffect(() => {
    Swal.fire({
      title: 'Aviso Importante',
      text: 'Para os procedimentos é necessário um sinal de R$20, que deve ser combinado com a profissional ao finalizar o agendamento.',
      icon: 'info',
      confirmButtonText: 'Entendi',
      confirmButtonColor: '#E75480', // rosa combinando com a estética do site
      background: '#fff0f6', // leve rosa de fundo
      color: '#5a2a45', // cor do texto
      iconColor: '#E75480', // cor do ícone
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  }, []);

  return (
    <div className="min-h-screen w-full bg-background font-inter">
      {/* Header */}
      <Header
        onMenuToggle={handleMenuToggle}
        isMenuOpen={isMobileMenuOpen}
      />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Services */}
        <ServiceGrid />

        {/* Business Hours & Location */}
        <BusinessHours />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Fixed Components */}
      <Cart />
      <FloatingScheduleButton />

      {/* Footer */}
      <footer className="bg-gradient-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="text-2xl">✨</div>
            <h3 className="text-2xl font-playfair font-bold">STUDIO BRUNA</h3>
            <div className="text-2xl">✨</div>
          </div>

          <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
            Transformando sua beleza com carinho, técnica e muito amor
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm">
            <div>📱 WhatsApp: (11) 98630-4563</div>
            <div>📍 Recanto Verde do Sol</div>
            <div>⏰ Seg-Sex: 9h-18h | Sáb: 8h-16h</div>
          </div>

          <div className="mt-8 pt-8 border-t border-primary-foreground/20">
            <p className="text-xs text-primary-foreground/60">
              © 2024 Studio Bruna. Todos os direitos reservados. Feito com 💖 | Desenvolvido por Ironside
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
