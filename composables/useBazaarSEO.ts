import siteConfig from '~/app/data/site-config.json';

interface SEOOptions {
  title: string;
  description: string;
  image?: string;
  type?: string;
  noindex?: boolean;
}

export function useBazaarSEO(options: SEOOptions) {
  const fullTitle = `${options.title} | ${siteConfig.name}`;
  const image = options.image ?? '/og-image.svg';

  useSeoMeta({
    title: fullTitle,
    ogTitle: fullTitle,
    description: options.description,
    ogDescription: options.description,
    ogImage: image,
    ogType: options.type ?? 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: options.description,
    twitterImage: image,
  });

  if (options.noindex) {
    useHead({ meta: [{ name: 'robots', content: 'noindex, nofollow' }] });
  }
}
