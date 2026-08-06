import content from '@/content/lrfit.content.json';

export default function Metodologia() {
  return (
    <section id="metodologia" className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark text-center mb-12 text-wrap-balance">
          Como Funciona
        </h2>

        <div className="max-w-3xl mx-auto space-y-8">
          {content.metodologia.map((step) => (
            <div key={step.number} className="flex gap-6 items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gold text-dark font-bold text-lg">
                {step.number}
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-dark mb-1">
                  {step.icon} {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
