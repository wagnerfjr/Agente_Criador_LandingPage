import { LazyImage } from '@/components';
import content from '@/content/lrfit.content.json';

export default function DoseDupla({ trainer, trackLead }) {
  const activeTrainer =
    trainer === 'leandro' ? content.trainers.leandro : content.trainers.renata;

  const { headline, subheadline, body, photos, bullets, ctaTemplate } = content.doseDupla;

  const waLink = `https://wa.me/${activeTrainer.phone}?text=${encodeURIComponent(ctaTemplate)}`;

  return (
    <section id="dose-dupla" className="py-20 md:py-32 bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline + Subheadline + Body */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gold mb-4 text-wrap-balance">
            {headline}
          </h2>
          <p className="text-lg md:text-xl text-gold/80 font-heading mb-6">
            {subheadline}
          </p>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            {body}
          </p>
        </div>

        {/* Grid de fotos: 1 coluna mobile, 2 colunas desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-12">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <LazyImage
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay gradient + label */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                  <p className="text-white font-bold text-lg p-6 w-full">
                    {photo.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bullets */}
        <div className="max-w-2xl mx-auto mb-10">
          <ul className="space-y-3">
            {bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-gold font-bold flex-shrink-0 mt-0.5">✓</span>
                <span className="text-gray-300 text-sm md:text-base">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackLead('dose-dupla')}
            className="bg-gold text-dark font-bold py-4 px-8 rounded-lg hover:bg-gold/90 hover:shadow-xl transition-all duration-300 text-center inline-block"
          >
            {`${ctaTemplate} com ${activeTrainer.name.split(' ')[0]}`}
          </a>
        </div>
      </div>
    </section>
  );
}
