import { Button } from '@/components';
import content from '@/content/lrfit.content.json';

export default function Problema() {
  const { headline, body, ctaText } = content.problema;

  const scrollToMetodologia = () => {
    document.getElementById('metodologia')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-6 text-wrap-balance">
          {headline}
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">{body}</p>
        <Button variant="outline" size="md" onClick={scrollToMetodologia}>
          {ctaText}
        </Button>
      </div>
    </section>
  );
}
