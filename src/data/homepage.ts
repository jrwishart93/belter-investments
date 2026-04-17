import type { PropertyListing } from './property';

export type HomePathway = {
  title: string;
  description: string;
  to: string;
  ctaLabel: string;
};

export type PortfolioPlaceholder = {
  title: string;
  summary: string;
  status: string;
};

export const featuredHighlights = [
  'Long-term let in a well-connected west Edinburgh setting',
  'Near Fountain Park leisure and retail destination',
  'Close to Haymarket train station and tram links',
  'Suitable for professionals or students seeking strong connectivity'
];

export function getHomePathways(featuredProperty: PropertyListing): HomePathway[] {
  return [
    {
      title: 'Property Details',
      description: 'Review specifications, gallery imagery, and location information for the featured listing.',
      to: `/property/${featuredProperty.slug}`,
      ctaLabel: 'View advert'
    },
    {
      title: 'Enquiry',
      description: 'Contact us to discuss availability, suitability, and next steps for this long-term let.',
      to: '/enquiry',
      ctaLabel: 'Send enquiry'
    },
    {
      title: 'About Us',
      description: 'Learn more about our family-run background and professional property management approach.',
      to: '/about',
      ctaLabel: 'Meet Belter Investments'
    }
  ];
}

export const portfolioPlaceholders: PortfolioPlaceholder[] = [
  {
    title: 'Edinburgh city rental',
    summary: 'A future long-term listing in a well-connected city location.',
    status: 'Available soon'
  },
  {
    title: 'West Edinburgh home',
    summary: 'Additional professionally managed rental stock coming to the portfolio.',
    status: 'Planned'
  }
];
