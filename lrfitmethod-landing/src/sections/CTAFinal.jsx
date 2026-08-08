import content from '@/content/lrfit.content.json';

export default function CTAFinal({ trainer, trackLead }) {
  const activeTrainer =
    trainer === 'leandro' ? content.trainers.leandro : content.trainers.renata;

  return (
    <section id="planos" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Glow atrás do card Semestral */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute w-96 h-96 bg-gradient-radial from-gold/10 to-transparent rounded-full blur-3xl right-0 top-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-dark text-center mb-4 text-wrap-balance">
          Planos
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Valores e condições são combinados diretamente com {activeTrainer.name.split(' ')[0]} pelo WhatsApp.
        </p>

        {/* Grid assimétrico: Trimestral 2 | Semestral 3 (destaque) | Anual 2 */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6 md:gap-8 max-w-6xl mx-auto">
          {content.planos.map((plano) => {
            const waLink = `https://wa.me/${activeTrainer.phone}?text=${encodeURIComponent(plano.whatsappMensagem)}`;
            const isDestacado = plano.destacado;

            return (
              <div
                key={plano.id}
                className={`flex flex-col ${
                  isDestacado ? 'md:col-span-3' : 'md:col-span-2'
                }`}
              >
                <div
                  className={`flex flex-col h-full rounded-xl p-8 transition-all duration-300 ${
                    isDestacado
                      ? 'bg-gray-900 border-2 border-gold shadow-2xl'
                      : 'bg-gray-900 border border-gold/30'
                  }`}
                >
                  {/* Badge */}
                  {isDestacado && (
                    <div className="flex justify-center mb-4">
                      <span className="bg-gold text-dark text-xs font-bold px-4 py-1.5 rounded-full">
                        ⭐ MAIS ESCOLHIDO
                      </span>
                    </div>
                  )}

                  {/* Período */}
                  <p className={`text-xs uppercase tracking-widest font-bold mb-2 ${
                    isDestacado ? 'text-gold' : 'text-gray-400'
                  }`}>
                    {plano.periodo}
                  </p>

                  {/* Nome do plano */}
                  <h3 className={`font-heading font-bold mb-2 ${
                    isDestacado ? 'text-gold text-3xl' : 'text-white text-2xl'
                  }`}>
                    {plano.nome}
                  </h3>

                  {/* Frase motivacional */}
                  <p className={`mb-6 ${
                    isDestacado ? 'text-gray-300 italic' : 'text-gray-400'
                  }`}>
                    {plano.frase}
                  </p>

                  {/* Diferenciais */}
                  <div className="mb-8 flex-grow">
                    <ul className="space-y-3">
                      {plano.diferenciais.map((diferencial, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-gold font-bold flex-shrink-0 mt-0.5">✓</span>
                          <span className={`text-sm ${
                            isDestacado ? 'text-gray-200' : 'text-gray-300'
                          }`}>
                            {diferencial}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Destaque especial para Semestral */}
                    {isDestacado && plano.diferenciais[plano.diferenciais.length - 1].includes('aula') && (
                      <div className="mt-4 p-3 bg-gold/10 border border-gold/30 rounded-lg">
                        <p className="text-gold text-xs font-bold">
                          🎯 O diferencial: Aulas presenciais incluídas
                        </p>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackLead(plano.id)}
                    className={`w-full font-bold py-4 px-6 rounded-lg transition-all duration-300 text-center ${
                      isDestacado
                        ? 'bg-gold text-dark hover:bg-gold/90 hover:shadow-xl'
                        : 'bg-gold/80 text-dark hover:bg-gold hover:shadow-lg'
                    }`}
                  >
                    {plano.cta}
                  </a>
                </div>
              </div>
            );
          })}

          {/* Banner-ponte para Dose Dupla */}
          <div className="col-span-1 md:col-span-7">
            <div className="bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 border border-gold/20 rounded-lg p-6 md:p-8 text-center">
              <p className="text-gray-300 text-lg mb-4">
                <span className="text-gold font-bold">👫 Treinando com alguém especial?</span> Conheça nosso plano exclusivo para casais e amigos.
              </p>
              <a
                href="#dose-dupla"
                onClick={() => {
                  document.getElementById('dose-dupla')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block text-gold font-bold hover:text-white transition-colors"
              >
                Saiba mais sobre a Dose Dupla →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
