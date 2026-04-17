export type HomePathway = {
  title: string;
  brand?: string;
  sectionLabel?: string;
  description: string;
  to: string;
  ctaLabel: string;
};

export const featuredHighlights = [
  'Main door apartment with private garden',
  'Allocated secure parking',
  'Residents’ pool, gym and sauna',
  'Five minutes from Haymarket'
];

export function getHomePathways(): HomePathway[] {
  return [
    {
      title: 'Properties',
      description: 'Browse the full portfolio and open individual property pages for complete advert details.',
      to: '/properties',
      ctaLabel: 'Browse properties'
    },
    {
      title: 'Enquiry',
      description: 'Ask about availability, viewings, or a general property question.',
      to: '/enquiries',
      ctaLabel: 'Make an enquiry'
    },
    {
      title: 'About Us',
      description: 'Learn more about the family-run investment focus and standards behind the portfolio.',
      to: '/investments',
      ctaLabel: 'About us'
    }
  ];
}
