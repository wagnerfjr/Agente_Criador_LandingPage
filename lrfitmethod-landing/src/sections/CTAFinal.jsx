import { Card, Grid } from '@/components';
import content from '@/content/lrfit.content.json';

export default function CTAFinal({ trainer, trackLead }) {
  const activeTrainer =
    trainer === 'leandro' ? content.trainers.leandro : content.trainers.renata;

  return (
    <section id="planos" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark text-center mb-4 text-wrap-balance">
          Planos
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Valores e condições são combinados diretamente com {activeTrainer.name.split(' ')[0]} pelo WhatsApp.
        </p>

        <Grid cols={2} gap="lg" className="max-w-2xl mx-auto">
          {content.planos.map((plano) => {
            const waLink = `https://wa.me/${activeTrainer.phone}?text=${encodeURIComponent(plano.whatsappMensagem)}`;
            return (
              <Card
                key={plano.id}
                variant={plano.destacado ? 'elevated' : 'outlined'}
                padding="lg"
                className={`text-center flex flex-col ${plano.destacado ? 'ring-2 ring-gold scale-105' : ''}`}
              >
                {plano.destacado && (
                  <span className="mx-auto mb-3 bg-gold text-dark text-xs font-bold px-3 py-1 rounded-full">
                    Mais Escolhido
                  </span>
                )}
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">{plano.periodo}</p>
                <h3 className="font-heading font-bold text-2xl text-dark mb-3">{plano.nome}</h3>
                <p className="text-gray-600 mb-8 flex-grow">{plano.frase}</p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackLead(plano.id)}
                  className="bg-gold text-dark font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all"
                >
                  {plano.cta}
                </a>
              </Card>
            );
          })}
        </Grid>
      </div>
    </section>
  );
}
