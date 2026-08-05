import { Button } from '@/components';

export default function Hero() {
  const heroContent = {
    headline: 'Transforme seu Corpo com o Método LR Fit',
    subheadline: 'Metodologia revolucionária de treinamento personalizado',
    cta: 'Comece sua transformação',
    ctaUrl: '#contato',
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-dark to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full mix-blend-screen blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold rounded-full mix-blend-screen blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight mb-6 animate-slide-up">
            {heroContent.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-gold text-lg md:text-xl lg:text-2xl font-semibold mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            {heroContent.subheadline}
          </p>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '200ms' }}>
            Combine treinamento inteligente com análise de dados. Alcance resultados comprovados em 90 dias com metodologia científica desenvolvida por especialistas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Button variant="primary" size="lg" onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}>
              {heroContent.cta}
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
              Saiba mais
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-gray-700 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">90</div>
              <p className="text-gray-400 text-sm">Dias para transformação</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">500+</div>
              <p className="text-gray-400 text-sm">Clientes transformados</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">100%</div>
              <p className="text-gray-400 text-sm">Garantia de satisfação</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
