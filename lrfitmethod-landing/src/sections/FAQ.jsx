import { useState } from 'react';
import { Card } from '@/components';

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const faqItems = [
    {
      id: 1,
      question: 'Quanto tempo leva para ver resultados?',
      answer: 'Os primeiros resultados aparecem em 2-3 semanas com mudanças visíveis no corpo. Transformação completa e comprovada em 90 dias.',
    },
    {
      id: 2,
      question: 'Preciso ter experiência com treino?',
      answer: 'Não! O método LR Fit é adaptado para todos os níveis, do iniciante absoluto ao atleta avançado. Cada plano é personalizado.',
    },
    {
      id: 3,
      question: 'Posso combinar com minha academia atual?',
      answer: 'Sim! O LR Fit Method é complementar e funciona perfeitamente com qualquer tipo de treino. O ideal é seguir exclusivamente para melhores resultados.',
    },
    {
      id: 4,
      question: 'Há garantia de satisfação?',
      answer: 'Oferecemos garantia de 30 dias de reembolso total se não ficar satisfeito. Acreditamos em nossos resultados.',
    },
    {
      id: 5,
      question: 'Preciso fazer dieta rigorosa?',
      answer: 'Nutrição é importante, mas não pregamos restrições severas. Trabalhamos hábitos sustentáveis que funcionam para sua vida real.',
    },
    {
      id: 6,
      question: 'Como é o acompanhamento?',
      answer: 'Acompanhamento semanal com métricas, ajustes de plano conforme necessário, e suporte direto via WhatsApp.',
    },
  ];

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-dark mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-600">
            Tudo que você precisa saber sobre o LR Fit Method
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item) => (
            <Card
              key={item.id}
              variant="outlined"
              padding="none"
              className="overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleOpen(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold font-heading text-dark">
                  {item.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-gold transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openId === item.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {/* Answer */}
              {openId === item.id && (
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Additional Help */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Não encontrou a resposta que procurava?
          </p>
          <a
            href="https://wa.me/1PENDENTE_WHATSAPP"
            className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-dark transition-colors"
          >
            <span>Envie uma mensagem via WhatsApp</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.781 1.149c-1.488.742-2.646 1.754-3.297 2.922-.parse 1.227-.872 2.306-.872 3.622 0 5.629 4.582 10.208 10.211 10.208h.007c5.628 0 10.208-4.579 10.208-10.208 0-5.629-4.579-10.208-10.208-10.208" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
