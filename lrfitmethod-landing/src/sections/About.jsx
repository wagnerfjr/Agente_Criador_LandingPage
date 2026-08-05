import { Card, Grid } from '@/components';

export default function About() {
  const features = [
    {
      icon: '🎯',
      title: 'Treinamento Personalizado',
      description: 'Cada sessão é adaptada ao seu corpo, objetivos e nível de condicionamento físico.',
    },
    {
      icon: '📊',
      title: 'Análise de Dados',
      description: 'Acompanhamento em tempo real do seu progresso com métricas científicas.',
    },
    {
      icon: '⚡',
      title: 'Resultados Comprovados',
      description: 'Transformação garantida em 90 dias com metodologia baseada em evidências.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-dark mb-4">
            Por que LR Fit Method?
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Uma metodologia revolucionária baseada em ciência, desenvolvida por especialistas em fitness e nutrição. Resultados reais para quem quer transformação durável.
          </p>
        </div>

        {/* Features Grid */}
        <Grid cols={3} gap="lg" className="mb-16">
          {features.map((feature, index) => (
            <Card key={index} variant="elevated" padding="lg" className="text-center hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold font-heading text-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </Grid>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold font-heading text-dark text-center mb-12">
            Como Funciona
          </h3>

          <div className="space-y-8">
            {[
              {
                step: 1,
                title: 'Avaliação Inicial',
                description: 'Análise completa do seu corpo, histórico, objetivos e limitações.',
              },
              {
                step: 2,
                title: 'Planejamento Personalizado',
                description: 'Criação de plano de treinamento único adaptado especificamente para você.',
              },
              {
                step: 3,
                title: 'Execução com Acompanhamento',
                description: 'Treinamento supervisionado com ajustes contínuos baseados em métricas.',
              },
              {
                step: 4,
                title: 'Transformação Comprovada',
                description: 'Resultados visíveis em 90 dias com garantia de satisfação.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gold text-dark font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold font-heading text-dark mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
