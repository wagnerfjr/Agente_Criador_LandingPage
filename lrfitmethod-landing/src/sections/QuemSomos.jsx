import { LazyImage } from '@/components';
import content from '@/content/lrfit.content.json';

function TrainerProfile({ id, trainer, highlighted, dimmed, onCtaClick }) {
  const waLink = `https://wa.me/${trainer.phone}?text=${encodeURIComponent(
    `Olá! Vi a página de vocês e estou interessado em saber mais sobre os planos com ${trainer.name.split(' ')[0]}.`
  )}`;

  const bioParagraphs = trainer.bio.split('\n\n');

  return (
    <div
      className={`flex flex-col rounded-xl overflow-hidden bg-gray-900 transition-all duration-300 ${
        highlighted ? 'ring-2 ring-gold' : ''
      } ${dimmed ? 'opacity-60' : ''}`}
    >
      {/* Foto de perfil */}
      <LazyImage
        src={trainer.fotoGrande}
        alt={`${trainer.name}`}
        className="w-full aspect-[4/5] object-cover"
      />

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        {/* Nome + logo + credencial */}
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-heading font-bold text-2xl text-white">{trainer.name}</h3>
          <img src={trainer.logo} alt={`Logo ${trainer.name}`} className="h-6 object-contain" />
        </div>
        <p className="text-sm text-gray-400 mb-2">{trainer.credential}</p>

        {/* Badge de conquista */}
        {trainer.conquista && (
          <span className="inline-block w-fit text-xs font-bold text-gold border border-gold/40 bg-gold/10 px-3 py-1 rounded-full mb-4">
            🏆 {trainer.conquista}
          </span>
        )}

        {/* Bio */}
        <div className="space-y-3 mb-5">
          {bioParagraphs.map((paragraph, idx) => (
            <p key={idx} className="text-gray-300 text-sm leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Credenciais */}
        <div className="flex flex-wrap gap-2 mb-6">
          {trainer.credenciais.map((c, idx) => (
            <span
              key={idx}
              className="text-xs text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
            >
              {c}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => onCtaClick(id)}
            className="inline-block w-full text-center bg-gold text-dark font-bold py-3 px-6 rounded-lg hover:bg-gold/90 hover:shadow-lg transition-all"
          >
            Falar com {trainer.name.split(' ')[0]}
          </a>
          {trainer.instagram && (
            <p className="mt-3 text-center text-sm">
              <a
                href={`https://instagram.com/${trainer.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-gold"
              >
                @{trainer.instagram}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function QuemSomos({ trainer, trackLead }) {
  return (
    <section id="quem-somos" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark text-center mb-8 text-wrap-balance">
          Conheça Quem Vai Te Guiar
        </h2>

        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-lg md:text-xl text-dark font-heading italic leading-relaxed mb-6">
            &ldquo;{content.quemSomos.missao}&rdquo;
          </p>
          <p className="text-gray-600 leading-relaxed">{content.quemSomos.parceria}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <TrainerProfile
            id="renata"
            trainer={content.trainers.renata}
            highlighted={trainer === 'renata'}
            dimmed={trainer === 'leandro'}
            onCtaClick={trackLead}
          />
          <TrainerProfile
            id="leandro"
            trainer={content.trainers.leandro}
            highlighted={trainer === 'leandro'}
            dimmed={trainer === 'renata'}
            onCtaClick={trackLead}
          />
        </div>
      </div>
    </section>
  );
}
