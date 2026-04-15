export type RentalPeriod = '1–3 months' | '3–6 months' | '6–12 months' | '1–2 years' | '2+ years';

export type PropertyListing = {
  id: string;
  slug: string;
  featured: boolean;
  title: string;
  addressLine1: string;
  city: string;
  monthlyRent: number;
  monthlyRentDisplay: string;
  status: string;
  summary: string;
  description: string;
  keyFeatures: string[];
  locationFacts: string[];
  suitability: string;
};

export const propertyListings: PropertyListing[] = [
  {
    id: 'caledonian-crescent-61-1',
    slug: '61-1-caledonian-crescent',
    featured: true,
    title: '61/1 Caledonian Crescent',
    addressLine1: '61/1 Caledonian Crescent',
    city: 'Edinburgh',
    monthlyRent: 1655,
    monthlyRentDisplay: '£1,655 per month',
    status: 'Available as a long-term rental',
    summary:
      'A well-presented long-term rental in west Edinburgh, ideally located for professionals or students seeking a reliable and straightforward tenancy.',
    description:
      'This property offers practical, comfortable living in a strong city location. It is suitable for professionals or students who need convenient access to transport, local amenities and key office or university routes. Belter Investments manages the tenancy with a clear, professional approach focused on long-term residents.',
    keyFeatures: [
      'Long-term let',
      '£1,655 per month',
      'West of Edinburgh city centre',
      'Near Fountain Park',
      'Close to Haymarket train station',
      'Suitable for professionals or students'
    ],
    locationFacts: [
      'Located west of Edinburgh city centre with quick links into central districts.',
      'Near Fountain Park for shops, dining, fitness and day-to-day convenience.',
      'Close to Haymarket train station for local and regional travel.',
      'Well placed for nearby offices, commuting and university access.'
    ],
    suitability: 'Professionals or students'
  }
];

export const featuredProperty = propertyListings.find((property) => property.featured) ?? propertyListings[0];
