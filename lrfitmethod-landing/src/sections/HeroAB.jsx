import { useState, useEffect } from 'react';
import { Button } from '@/components';
import { ABTest } from '@/utils/abtest';
import { logger } from '@/utils/logger';

/**
 * Hero Section with A/B Testing
 * Tests two headline variations and CTA text
 */
export default function HeroAB() {
  const [test, setTest] = useState(null);
  const [variantData, setVariantData] = useState(null);

  useEffect(() => {
    // Initialize A/B test with two variants
    const abtest = new ABTest('hero_headline', {
      control: {
        headline: 'Transformação Fitness Revolucionária',
        subheading: 'Método científico que combina treino inteligente com análise de dados.',
        cta: '✨ Começar Agora',
        description: 'Veja resultados em 90 dias ou seu dinheiro de volta.',
      },
      variation: {
        headline: 'Seu Corpo Ideal em 90 Dias',
        subheading: 'Treino personalizado + análise de dados + suporte 24/7.',
        cta: '🎯 Quero Meu Resultado',
        description: 'Garantia: 90 dias de transformação garantida.',
      },
    });

    setTest(abtest);
    setVariantData(abtest.getVariantData());

    // Track page view for this A/B test
    abtest.trackEvent('HeroView');

    logger.info('A/B Test: Hero Section', {
      experiment: 'hero_headline',
      variant: abtest.variant,
    });
  }, []);

  if (!test || !variantData) {
    return null;
  }

  const handleCTA = () => {
    test.trackEvent('HeroCTAClick');
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-dark via-gray-900 to-dark relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gold rounded-full mix-blend-screen blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gold rounded-full mix-blend-screen blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* A/B Test Variant Badge */}
          <div className="mb-6 inline-block px-4 py-1 bg-gold/20 border border-gold rounded-full">
            <span className="text-sm font-semibold text-gold">
              {test.variant === 'control' ? 'Headline A' : 'Headline B'}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold font-heading text-white mb-6 leading-tight">
            {variantData.headline}
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            {variantData.subheading}
          </p>

          {/* Trust Signals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">⏰</div>
              <p className="text-sm text-gray-400">90 Dias para Resultados</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">👥</div>
              <p className="text-sm text-gray-400">500+ Clientes Satisfeitos</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-sm text-gray-400">100% Garantia ou Reembolso</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-12">
            <Button
              size="xl"
              variant="primary"
              onClick={handleCTA}
              className="w-full sm:w-auto px-12"
            >
              {variantData.cta}
            </Button>
          </div>

          {/* Secondary CTA */}
          <p className="text-gray-400 text-sm mb-6">{variantData.description}</p>

          {/* Scroll Indicator */}
          <div className="flex justify-center gap-2 mt-16">
            <div className="w-1 h-8 bg-gold rounded-full opacity-50 animate-bounce"></div>
            <div className="w-1 h-8 bg-gold rounded-full opacity-50 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-8 bg-gold rounded-full opacity-50 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
