import { Card, Grid } from '@/components';

export default function Results() {
  const cases = [
    {
      id: 1,
      name: 'PENDENTE_CLIENT_NAME_1',
      transformation: 'PENDENTE_TRANSFORMATION_1',
      timeframe: '90 dias',
      image: 'https://placeholder.com/500x600/D4AF37/1a1a1a?text=Transformação+1',
      testimonial: 'PENDENTE_TESTIMONIAL_1',
    },
    {
      id: 2,
      name: 'PENDENTE_CLIENT_NAME_2',
      transformation: 'PENDENTE_TRANSFORMATION_2',
      timeframe: '90 dias',
      image: 'https://placeholder.com/500x600/D4AF37/1a1a1a?text=Transformação+2',
      testimonial: 'PENDENTE_TESTIMONIAL_2',
    },
    {
      id: 3,
      name: 'PENDENTE_CLIENT_NAME_3',
      transformation: 'PENDENTE_TRANSFORMATION_3',
      timeframe: '90 dias',
      image: 'https://placeholder.com/500x600/D4AF37/1a1a1a?text=Transformação+3',
      testimonial: 'PENDENTE_TESTIMONIAL_3',
    },
  ];

  return (
    <section id="results" className="py-20 md:py-32 bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
            Resultados Reais de Nossos Clientes
          </h2>
          <p className="text-xl text-gray-300">
            Veja as transformações incríveis que nossos alunos alcançaram
          </p>
        </div>

        {/* Results Grid */}
        <Grid cols={3} gap="lg" className="mb-16">
          {cases.map((caseItem) => (
            <Card
              key={caseItem.id}
              variant="elevated"
              padding="none"
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="w-full h-96 bg-gray-700 overflow-hidden relative group">
                <img
                  src={caseItem.image}
                  alt={caseItem.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold font-heading text-white mb-2">
                  {caseItem.name}
                </h3>
                <p className="text-gold font-semibold mb-3">
                  {caseItem.transformation}
                </p>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {caseItem.testimonial}
                </p>
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-500">
                    ⏱️ Transformação em {caseItem.timeframe}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </Grid>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-gold/10 to-gold/5 rounded-lg p-12 border border-gold/20">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            Nossos Números Falam
          </h3>

          <Grid cols={4} gap="md" responsive={true}>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                500+
              </div>
              <p className="text-gray-300 text-sm">
                Clientes Transformados
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                90
              </div>
              <p className="text-gray-300 text-sm">
                Dias em Média
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                98%
              </div>
              <p className="text-gray-300 text-sm">
                Taxa de Sucesso
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                10+
              </div>
              <p className="text-gray-300 text-sm">
                Anos de Experiência
              </p>
            </div>
          </Grid>
        </div>
      </div>
    </section>
  );
}
