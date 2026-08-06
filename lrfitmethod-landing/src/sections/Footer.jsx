import content from '@/content/lrfit.content.json';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-gray-400 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-heading font-bold text-gold text-lg mb-2">{content.brand.name}</p>
        <p className="text-sm mb-4">{content.brand.tagline}</p>

        <div className="flex justify-center gap-6 mb-6 text-sm">
          <a
            href={`https://instagram.com/${content.trainers.renata.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-gold"
          >
            @{content.trainers.renata.instagram}
          </a>
          <a
            href={`https://instagram.com/${content.trainers.leandro.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-gold"
          >
            @{content.trainers.leandro.instagram}
          </a>
        </div>

        <p className="text-xs text-gray-500 max-w-md mx-auto mb-4">{content.footer.disclaimer}</p>
        <p className="text-xs text-gray-600">© {year} {content.brand.name}. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
