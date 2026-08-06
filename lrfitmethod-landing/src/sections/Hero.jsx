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

  return (
    <section className="bg-dark text-light min-h-screen flex items-center">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-8 py-20 items-center">
        <div className="flex flex-col justify-center order-2 md:order-1 text-center md:text-left">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-gold mb-4 text-wrap-balance">
            {headline}
          </h1>
          <p className="text-lg md:text-xl text-white mb-6">{subheadline}</p>
          <p className="text-gray-300 text-base md:text-lg mb-8 max-w-lg mx-auto md:mx-0">
            {body}
          </p>
          <div>
            <Button variant="primary" size="lg" onClick={scrollToQuemSomos}>
              {ctaText}
            </Button>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <LazyImage
            src={photo}
            alt={
              trainer === 'renata'
                ? content.trainers.renata.name
                : trainer === 'leandro'
                  ? content.trainers.leandro.name
                  : 'LR Fit Method'
            }
            className="w-full h-auto rounded-2xl object-cover aspect-[4/5] md:aspect-square"
          />
        </div>
      </div>
    </section>
  );
}
