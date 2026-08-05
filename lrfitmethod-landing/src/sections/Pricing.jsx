import { Button, Card, Grid } from '@/components';

export default function Pricing() {
  const plans = [
    {
      id: 'starter',
      name: 'PENDENTE_PLAN_NAME_1',
      price: 'PENDENTE_PRICE_1',
      description: 'PENDENTE_PLAN_DESCRIPTION_1',
      features: ['PENDENTE_FEATURE_1', 'PENDENTE_FEATURE_2', 'PENDENTE_FEATURE_3'],
      cta: 'Começar',
      featured: false,
    },
    {
      id: 'professional',
      name: 'PENDENTE_PLAN_NAME_2',
      price: 'PENDENTE_PRICE_2',
      description: 'PENDENTE_PLAN_DESCRIPTION_2',
      features: ['PENDENTE_FEATURE_1', 'PENDENTE_FEATURE_2', 'PENDENTE_FEATURE_3', 'PENDENTE_FEATURE_4'],
      cta: 'Começar',
      featured: true,
    },
    {
      id: 'premium',
      name: 'PENDENTE_PLAN_NAME_3',
      price: 'PENDENTE_PRICE_3',
      description: 'PENDENTE_PLAN_DESCRIPTION_3',
      features: ['PENDENTE_FEATURE_1', 'PENDENTE_FEATURE_2', 'PENDENTE_FEATURE_3', 'PENDENTE_FEATURE_4', 'PENDENTE_FEATURE_5'],
      cta: 'Começar',
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-dark mb-4">
            Planos LR Fit Method
          </h2>
          <p className="text-xl text-gray-600">
            Escolha o plano perfeito para sua jornada de transformação
          </p>
        </div>

        {/* Pricing Cards */}
        <Grid cols={3} gap="lg" className="mb-16">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              variant={plan.featured ? 'elevated' : 'outlined'}
              padding="lg"
              className={`flex flex-col ${plan.featured ? 'transform scale-105 ring-2 ring-gold' : ''} hover:shadow-lg transition-all duration-300`}
            >
              {/* Featured Badge */}
              {plan.featured && (
                <div className="mb-4 inline-block">
                  <span className="bg-gold text-dark px-3 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold font-heading text-dark mb-2">
                {plan.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 flex-grow">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <p className="text-4xl font-bold text-gold mb-1">
                  {plan.price}
                </p>
                <p className="text-gray-600 text-sm">
                  por mês
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                variant={plan.featured ? 'primary' : 'outline'}
                size="lg"
                className="w-full"
                onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </Grid>

        {/* Note */}
        <div className="max-w-2xl mx-auto text-center p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <p className="text-yellow-800">
            <strong>⚠️ Nota:</strong> Aguardando informações de preços do cliente. Planos e valores serão preenchidos em breve.
          </p>
        </div>
      </div>
    </section>
  );
}
