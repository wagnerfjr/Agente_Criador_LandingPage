import { Button } from '@/components';
import LeadForm from '@/components/LeadForm';

export default function Contact() {
  const handleWhatsApp = () => {
    // This will be replaced with actual WhatsApp number from lrfit.content.json
    const message = 'Olá! Gostaria de começar minha transformação com o LR Fit Method.';
    const whatsappUrl = `https://wa.me/55PENDENTE_WHATSAPP?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contato" className="py-20 md:py-32 bg-gradient-to-b from-dark to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-gold rounded-full mix-blend-screen blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gold rounded-full mix-blend-screen blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Header */}
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
            Comece sua Transformação Hoje
          </h2>

          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Entre em contato agora para agendar sua avaliação gratuita e começar sua jornada de transformação.
          </p>

          {/* Lead Form */}
          <div className="mb-12 max-w-md mx-auto">
            <LeadForm />
          </div>

          {/* Divider */}
          <div className="my-12 border-t border-gray-700"></div>

          {/* Alternative CTA */}
          <p className="text-gray-400 mb-6">Ou entre em contato direto:</p>
          <div className="mb-12">
            <Button
              variant="outline"
              size="lg"
              onClick={handleWhatsApp}
              className="w-full sm:w-auto"
            >
              📱 Enviar Mensagem via WhatsApp
            </Button>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 border-t border-gray-700">
            <div>
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-lg font-bold text-white mb-2">WhatsApp</h3>
              <p className="text-gray-400">
                Resposta rápida via mensagem
              </p>
              <p className="text-gold font-semibold mt-2">+55 PENDENTE_WHATSAPP</p>
            </div>

            <div>
              <div className="text-3xl mb-3">📧</div>
              <h3 className="text-lg font-bold text-white mb-2">Email</h3>
              <p className="text-gray-400">
                Suporte por email
              </p>
              <p className="text-gold font-semibold mt-2">PENDENTE_EMAIL</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-12 pt-12 border-t border-gray-700">
            <p className="text-gray-400 mb-6">
              Siga nossas redes sociais
            </p>
            <div className="flex justify-center gap-6">
              <a href="https://instagram.com/PENDENTE_INSTAGRAM" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.203 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.015-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.88 1.44 1.44 0 010 2.88z" />
                </svg>
              </a>
              <a href="https://facebook.com/PENDENTE_FACEBOOK" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
