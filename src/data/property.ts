export type RentalPeriod = '1–3 months' | '3–6 months' | '6–12 months' | '1–2 years' | '2+ years';

export type PropertyImage = {
  src: string;
  alt: string;
  category: 'hero' | 'interior' | 'outdoor' | 'location' | 'amenity';
};

export type PropertyListing = {
  id: string;
  slug: string;
  featured: boolean;
  title: string;
  addressLine1: string;
  city: string;
  monthlyRent: number;
  monthlyRentDisplay: string;
  propertyType: string;
  status: string;
  summary: string;
  description: string;
  keyFeatures: string[];
  locationFacts: string[];
  suitability: string;
  overview: string;
  fullDescription: string;
  outdoorAndFacilities: string;
  whoItSuits: string;
  additionalInformation: string[];
  closingValueStatement: string;
  images: PropertyImage[];
};

const caledonianImages: PropertyImage[] = [
  {
    src: '/images/properties/caledonian-crescent/front-exterior.jpg',
    alt: 'Front exterior of 61/1 Caledonian Crescent in Edinburgh',
    category: 'hero'
  },
  {
    src: '/images/properties/caledonian-crescent/living-room-1.jpg',
    alt: 'Bright living room with seating area and natural light',
    category: 'interior'
  },
  {
    src: '/images/properties/caledonian-crescent/kitchen.jpg',
    alt: 'Separate fitted kitchen with worktops and storage',
    category: 'interior'
  },
  {
    src: '/images/properties/caledonian-crescent/hallway.jpg',
    alt: 'Entrance hallway giving access to the main rooms',
    category: 'interior'
  },
  {
    src: '/images/properties/caledonian-crescent/bedroom-two.jpg',
    alt: 'Well-proportioned bedroom suitable for double bed furniture',
    category: 'interior'
  },
  {
    src: '/images/properties/caledonian-crescent/shower-room-1.jpg',
    alt: 'Modern shower room with WC and vanity storage',
    category: 'interior'
  },
  {
    src: '/images/properties/caledonian-crescent/private-garden-1.jpg',
    alt: 'Private garden area accessed by French doors from the living room',
    category: 'outdoor'
  },
  {
    src: '/images/properties/caledonian-crescent/building-exterior.jpg',
    alt: 'Exterior view of the modern four-storey residential block',
    category: 'outdoor'
  },
  {
    src: '/images/properties/caledonian-crescent/local-area.jpg',
    alt: 'Local Dalry area view near Caledonian Crescent',
    category: 'location'
  },
  {
    src: '/images/properties/caledonian-crescent/swimming-pool.jpg',
    alt: 'Residents leisure facility including swimming pool access',
    category: 'amenity'
  },
  {
    src: '/images/properties/caledonian-crescent/gym.jpg',
    alt: 'On-site resident gym and wellness facilities',
    category: 'amenity'
  }
];

export const propertyListings: PropertyListing[] = [
  {
    id: 'caledonian-crescent-61-1',
    slug: '61-1-caledonian-crescent',
    featured: true,
    title: '2 Bedroom Ground Floor Flat – Caledonian Crescent, Edinburgh',
    addressLine1: '61/1 Caledonian Crescent',
    city: 'Edinburgh',
    monthlyRent: 1655,
    monthlyRentDisplay: '£1,655 per month',
    propertyType: '2 bedroom ground floor flat',
    status: 'Available as a long-term rental',
    summary:
      'A polished, well-proportioned ground floor rental in Dalry with private outdoor space and resident leisure access, ideal for tenants wanting both convenience and comfort.',
    description:
      'This modern two-bedroom ground floor flat offers practical single-level living in Dalry, just west of Edinburgh city centre. With French doors to private garden space, well-balanced room sizes, and resident access to pool, gym and sauna facilities, it combines day-to-day comfort with strong local connectivity at £1,655 per month.',
    overview:
      'This is a well-proportioned two-bedroom ground floor flat within a modern four-storey residential development in the Dalry area of Edinburgh. Extending to approximately 56m², the property combines a practical single-level layout with private outdoor space and access to communal leisure facilities, making it an attractive rental opportunity for professionals seeking both convenience and comfort.',
    fullDescription:
      'Entered from a secure shared stair, the flat opens into a central entrance hallway that links each room in a practical single-level arrangement. The bright living room is a standout feature, with French doors leading directly to a private garden area and allowing excellent natural light through the day. The separate kitchen offers generous storage and useful workspace for regular cooking and day-to-day use. There are two well-proportioned bedrooms that can comfortably support sleeping, home working or guest needs, and the shower room with WC is neatly finished for simple, modern living. Altogether, the layout feels efficient, comfortable and well suited to life in the city.',
    outdoorAndFacilities:
      'French doors from the living room open onto a private garden area, ideal for morning coffee, summer dining or simply enjoying outdoor space at home. In addition, the development includes communal garden grounds and resident leisure facilities with pool, gym and sauna access, adding a premium lifestyle element that is increasingly hard to find in central Edinburgh rentals.',
    keyFeatures: [
      '2 Bedrooms',
      'Ground Floor Position',
      'Private Garden Access',
      'Bright Living Room',
      'Separate Kitchen',
      'Shower Room',
      'Secure Entry System',
      'Pool, Gym & Sauna Access',
      'Dalry / West Edinburgh Location',
      'Close to Haymarket and Tram Links'
    ],
    locationFacts: [
      'Situated in Dalry, west of Edinburgh city centre, with a quick commute into central business districts.',
      'Well placed for Haymarket Station, tram connections and regular bus routes across the city.',
      'Straightforward access to Edinburgh Airport via tram, road links or rail connections from Haymarket.',
      'Close to everyday amenities including local shops, supermarkets, cafés and restaurants.',
      'Near the Union Canal for waterside walks, running routes and cycle connections.'
    ],
    suitability: 'Professional couples, two professionals sharing, and city-based tenants seeking more space with strong amenities.',
    whoItSuits:
      'This home is particularly well suited to professional couples, two professionals sharing, and city-based tenants who want more space without sacrificing convenience. It also appeals to renters who value access to amenities such as a pool, gym and sauna while staying within easy reach of major transport links and central Edinburgh.',
    additionalInformation: [
      'Rent: £1,655 pcm',
      '2 bedrooms',
      'Ground floor flat',
      'Electric heating',
      'Double glazing',
      'Secure entry',
      'Mains services',
      'On-street parking nearby'
    ],
    closingValueStatement:
      'At £1,655 per month, this is a compelling long-term rental opportunity in Edinburgh, offering a rare blend of ground floor practicality, private garden access, on-site leisure facilities and excellent local connectivity, all within a well-established residential setting in Dalry.',
    images: caledonianImages
  }
];

export const featuredProperty = propertyListings.find((property) => property.featured) ?? propertyListings[0];
