import { Hero, Problema, Pilares, QuemSomos, Resultados, Metodologia, CTAFinal, DoseDupla, Footer } from '@/sections';
import { useMetaPixel } from '@/hooks';
import content from '@/content/lrfit.content.json';

function App() {
  const { trackLead } = useMetaPixel();

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-dark/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="font-heading font-bold text-gold text-lg tracking-wide">
              {content.brand.name}
            </span>
            <div className="flex gap-6">
              <button
                onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-semibold text-gold hover:text-white transition-colors"
              >
                Planos
              </button>
              <button
                onClick={() => document.getElementById('dose-dupla')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-semibold text-gold hover:text-white transition-colors hidden sm:block"
              >
                Dose Dupla
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <Hero />
        <Problema />
        <Pilares />
        <QuemSomos trackLead={trackLead} />
        <Resultados />
        <Metodologia />
        <CTAFinal trackLead={trackLead} />
        <DoseDupla trackLead={trackLead} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
