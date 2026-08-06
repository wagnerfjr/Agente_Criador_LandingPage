import { Card, Grid, LazyImage } from '@/components';
import content from '@/content/lrfit.content.json';

function TrainerCard({ id, trainer, highlighted, dimmed, onCtaClick }) {
  const waLink = `https://wa.me/${trainer.phone}?text=${encodeURIComponent(
    `Olá! Vi a página de vocês e estou interessado em saber mais sobre os planos com ${trainer.name.split(' ')[0]}.`
  )}`;

  return (
    <Card
      variant={highlighted ? 'elevated' : 'outlined'}
      padding="lg"
      className={`text-center transition-all duration-300 ${highlighted ? 'ring-2 ring-gold' : ''} ${dimmed ? 'opacity-60' : ''}`}
    >
      <LazyImage
        src={trainer.photo}
        alt={trainer.name}
        className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
      />
      <img src={trainer.logo} alt={`Logo ${trainer.name}`} className="h-12 mx-auto mb-3 object-contain" />
      <h3 className="font-heading font-bold text-xl text-dark">{trainer.name}</h3>
      <p className="text-sm text-gray-500 mb-4">{trainer.credential}</p>
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        onClick={() => onCtaClick(id)}
        className="inline-block bg-gold text-dark font-bold py-2 px-6 rounded-lg hover:shadow-lg transition-all"
      >
        Fale com {trainer.name.split(' ')[0]}
      </a>
      {trainer.instagram && (
        <p className="mt-3 text-sm">
          <a
            href={`https://instagram.com/${trainer.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-gold"
          >
            @{trainer.instagram}
          </a>
        </p>
      )}
    </Card>
  );
}

export default function QuemSomos({ trainer, trackLead }) {
  return (
    <section id="quem-somos" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark text-center mb-12 text-wrap-balance">
          Quem Somos
        </h2>
        <Grid cols={2} gap="lg" className="max-w-3xl mx-auto">
          <TrainerCard
            id="renata"
            trainer={content.trainers.renata}
            highlighted={trainer === 'renata'}
            dimmed={trainer === 'leandro'}
            onCtaClick={trackLead}
          />
          <TrainerCard
            id="leandro"
            trainer={content.trainers.leandro}
            highlighted={trainer === 'leandro'}
            dimmed={trainer === 'renata'}
            onCtaClick={trackLead}
          />
        </Grid>
      </div>
    </section>
  );
}
