import { useState, useEffect } from 'react';
import { LazyImage } from '@/components';
import content from '@/content/lrfit.content.json';

export default function Resultados() {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (openIndex === null) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpenIndex(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [openIndex]);

  const transformacoes = content.transformacoes;

  return (
    <section id="resultados" className="py-20 md:py-32 bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-white text-center mb-12 text-wrap-balance">
          Resultados
        </h2>

        {/* Grid denso de thumbnails — 2 colunas mobile, 3 tablet, 4-5 desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
          {transformacoes.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="block w-full aspect-square overflow-hidden rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-zoom-in group"
            >
              <LazyImage
                src={t.photo}
                alt="Resultado de cliente LR Fit Method"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setOpenIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Fechar"
            className="absolute top-4 right-4 text-white text-3xl leading-none w-10 h-10 flex items-center justify-center hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            ×
          </button>
          <img
            src={transformacoes[openIndex].photo}
            alt="Resultado de cliente LR Fit Method"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
