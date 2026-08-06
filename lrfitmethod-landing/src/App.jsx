import { Hero, Problema, Pilares, QuemSomos, Resultados, Metodologia, CTAFinal, Footer } from '@/sections';
import { useTrainerParam, useMetaPixel } from '@/hooks';
import content from '@/content/lrfit.content.json';

function App() {
  const trainer = useTrainerParam();
  const { trackLead } = useMetaPixel();

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-dark/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="font-heading font-bold text-gold text-lg tracking-wide">
              {content.brand.name}
            </span>
            <button
              onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-semibold text-gold hover:text-white transition-colors"
            >
              Planos
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <Hero trainer={trainer} />
        <Problema />
        <Pilares />
        <QuemSomos trainer={trainer} trackLead={trackLead} />
        <Resultados />
        <Metodologia />
        <CTAFinal trainer={trainer} trackLead={trackLead} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
