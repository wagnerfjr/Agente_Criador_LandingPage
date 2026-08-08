import { Button, LazyImage } from '@/components';
import content from '@/content/lrfit.content.json';

export default function Hero({ trainer }) {
  const { headline, subheadline, body, ctaText } = content.hero;

  const photo =
    trainer === 'renata'
      ? content.trainers.renata.photo
      : trainer === 'leandro'
        ? content.trainers.leandro.photo
        : content.hero.photoDefault;

  const scrollToQuemSomos = () => {
    document.getElementById('quem-somos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToResultados = () => {
    document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-dark text-light min-h-screen flex items-center overflow-hidden">
      {/* Glow radial atrás da foto (apenas visível em desktop) */}
      <div className="absolute inset-0 hidden md:flex md:justify-end md:items-center pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-radial from-gold/20 to-transparent rounded-full blur-3xl -right-48 top-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-8 py-20 items-center">
        <div className="flex flex-col justify-center order-2 md:order-1 text-center md:text-left z-10">
          {/* Eyebrow */}
          <span className="inline-block text-gold text-sm font-bold uppercase tracking-widest mb-3 md:mb-4">
            Consultoria Online
          </span>

          {/* Headline com destaque */}
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-light mb-4 text-wrap-balance">
            O Corpo que Você{' '}
            <span className="text-gold">Deseja</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gold/90 font-heading mb-6">{subheadline}</p>

          {/* Body */}
          <p className="text-gray-300 text-base md:text-lg mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
            {body}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-10 justify-center md:justify-start">
            <Button variant="primary" size="lg" onClick={scrollToQuemSomos}>
              {ctaText}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToResultados}
            >
              Ver Resultados
            </Button>
          </div>

          {/* Credibilidade badges */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <span className="inline-block text-xs bg-gold/20 text-gold px-4 py-2 rounded-full font-semibold">
              ✓ Treino + Nutrição
            </span>
            <span className="inline-block text-xs bg-gold/20 text-gold px-4 py-2 rounded-full font-semibold">
              ✓ Acompanhamento Personalizado
            </span>
            <span className="inline-block text-xs bg-gold/20 text-gold px-4 py-2 rounded-full font-semibold">
              ✓ 100% Online
            </span>
          </div>
        </div>

        {/* Foto */}
        <div className="order-1 md:order-2 relative z-10">
          <div className="relative">
            <LazyImage
              src={photo}
              alt={
                trainer === 'renata'
                  ? content.trainers.renata.name
                  : trainer === 'leandro'
                    ? content.trainers.leandro.name
                    : 'LR Fit Method'
              }
              className="w-full h-auto rounded-2xl shadow-2xl aspect-[4/5] object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
