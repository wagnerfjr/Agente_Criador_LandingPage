import { useState, useEffect } from 'react';
import { Grid, LazyImage } from '@/components';
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

        <Grid cols={3} gap="md">
          {transformacoes.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="block w-full aspect-[3/4] overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-zoom-in group"
            >
              <LazyImage
                src={t.photo}
                alt="Resultado de cliente LR Fit Method"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </button>
          ))}
        </Grid>
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
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
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
