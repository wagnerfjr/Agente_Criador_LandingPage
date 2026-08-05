import { useEffect } from 'react';
import { Hero, About, Results, Pricing, FAQ, Contact } from './sections';
import { useScrollPerformance } from './hooks';
import { usePageLogger, useClickTracking } from './hooks/useLogger';
import { logger } from './utils/logger';

function App() {
  useScrollPerformance();
  usePageLogger(); // Track page views
  useClickTracking(); // Track all clicks

  useEffect(() => {
    // Track page views with Meta Pixel
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }

    logger.info('App initialized', {
      url: window.location.href,
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gold font-heading">
                LR Fit Method
              </h1>
            </div>

            {/* Links */}
            <div className="hidden md:flex gap-8">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                Sobre
              </a>
              <a href="#results" className="text-gray-300 hover:text-white transition-colors">
                Resultados
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Preços
              </a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
                FAQ
              </a>
              <a href="#contato" className="text-gold hover:text-gold-dark font-semibold transition-colors">
                Contato
              </a>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden sm:inline-block px-4 py-2 bg-gold text-dark rounded-lg font-semibold hover:bg-gold-dark transition-colors"
            >
              Começar
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <Hero />
        <About />
        <Results />
        <Pricing />
        <FAQ />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-white font-bold mb-4">LR Fit Method</h3>
                <p className="text-gray-400 text-sm">
                  Transformação revolucionária com metodologia científica.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#about" className="text-gray-400 hover:text-gold transition-colors">Sobre</a></li>
                  <li><a href="#results" className="text-gray-400 hover:text-gold transition-colors">Resultados</a></li>
                  <li><a href="#pricing" className="text-gray-400 hover:text-gold transition-colors">Preços</a></li>
                  <li><a href="#faq" className="text-gray-400 hover:text-gold transition-colors">FAQ</a></li>
                  <li><a href="#contato" className="text-gray-400 hover:text-gold transition-colors">Contato</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">Privacidade</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">Termos</a></li>
                </ul>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400 text-sm text-center">
                © 2026 LR Fit Method. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
