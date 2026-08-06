import { Card, Grid } from '@/components';
import content from '@/content/lrfit.content.json';

export default function Pilares() {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Grid cols={3} gap="lg">
          {content.pilares.map((pilar) => (
            <Card key={pilar.title} variant="elevated" padding="lg" className="text-center">
              <div className="text-5xl mb-4">{pilar.icon}</div>
              <h3 className="font-heading font-bold text-xl text-dark mb-2">{pilar.title}</h3>
              <p className="text-gray-600">{pilar.description}</p>
            </Card>
          ))}
        </Grid>

        <p className="text-center font-heading font-bold text-xl md:text-2xl text-dark mt-16">
          {content.brand.tagline}
        </p>
      </div>
    </section>
  );
}
