export type PropertyData = {
  addressLine1: string;
  city: string;
  country: string;
  fullAddress: string;
  monthlyRent: number;
  monthlyRentDisplay: string;
  propertyType: string;
  bedrooms: string;
  suitability: string;
  summary: string;
  description: string;
  keyHighlights: string[];
  keyFeatures: string[];
  locationBenefits: string[];
  transportLinks: string[];
  amenities: string[];
  contactEmail: string;
  contactPhone: string;
};

// Central editable configuration for property listing content.
export const propertyData: PropertyData = {
  addressLine1: '61/1 Caledonian Crescent',
  city: 'Edinburgh',
  country: 'Scotland',
  fullAddress: '61/1 Caledonian Crescent, Edinburgh, Scotland',
  monthlyRent: 1655,
  monthlyRentDisplay: '£1,655 per month',
  propertyType: 'Flat / Apartment',
  bedrooms: 'TBC',
  suitability: 'Suitable for professionals or students',
  summary:
    'A well-positioned long-term rental apartment in Edinburgh, offering practical, comfortable living with straightforward access to key transport links and city amenities.',
  description:
    'This well-located Edinburgh apartment offers comfortable living within easy reach of the city centre, making it ideal for professionals or students. The property is presented as a long-term residential let with a professional and straightforward tenancy approach.',
  keyHighlights: [
    'Long-term residential letting',
    'Located west of Edinburgh city centre',
    'Near Fountain Park and Haymarket station',
    'Clear and professional enquiry process'
  ],
  keyFeatures: [
    'Property type: Flat / Apartment',
    'Bedrooms: TBC (editable)',
    'Long-term tenancy focus',
    'Professional management and direct communication',
    'Floorplan available on request (placeholder)'
  ],
  locationBenefits: [
    'Situated west of Edinburgh city centre',
    'Close to Fountain Park for shopping, dining and leisure',
    'Convenient access to Haymarket train station',
    'Well-suited for commuting to nearby offices and campuses'
  ],
  transportLinks: [
    'Haymarket train station within easy reach',
    'Frequent local bus routes across Edinburgh',
    'Straightforward access to the west end and city centre'
  ],
  amenities: [
    'Shops, supermarkets and cafes nearby',
    'Fitness and leisure facilities around Fountain Park',
    'Local services suitable for day-to-day long-term living'
  ],
  contactEmail: 'hello@belterinvestments.co.uk',
  contactPhone: '+44 (0)131 000 0000'
};
