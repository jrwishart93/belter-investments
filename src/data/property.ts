export type RentalPeriod = '1–3 months' | '3–6 months' | '6–12 months' | '1–2 years' | '2+ years';

export type PropertyImage = {
  src: string;
  alt: string;
  category: 'hero' | 'interior' | 'outdoor' | 'location' | 'amenity';
};

export type AdvertSection = {
  title: string;
  body?: string[];
  items?: string[];
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
  availabilityDisplay?: string;
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
  advertSections: AdvertSection[];
  closingValueStatement: string;
  images: PropertyImage[];
};

const caledonianImages: PropertyImage[] = [
  // ── Hero ─────────────────────────────────────────────────────────────────
  {
    src: '/images/properties/caledonian-crescent/Main%20Entrance.jpeg',
    alt: 'Main entrance to James Square in Edinburgh',
    category: 'hero'
  },
  // ── Gallery-first six (indices 1–6 feed the 6-image gallery) ─────────────
  {
    src: '/images/properties/caledonian-crescent/living-room-1.jpg',
    alt: 'Bright living room with seating area and natural light',
    category: 'interior'
  },
  {
    src: '/images/properties/caledonian-crescent/private-garden-1.jpg',
    alt: 'Private garden area accessed by French doors from the living room',
    category: 'outdoor'
  },
  {
    src: '/images/properties/caledonian-crescent/Pool.jpg',
    alt: 'Residents only swimming pool within the James Square development',
    category: 'amenity'
  },
  {
    src: '/images/properties/caledonian-crescent/gym_2.jpg',
    alt: 'Residents only gym within the James Square development',
    category: 'amenity'
  },
  {
    src: '/images/properties/caledonian-crescent/Sauna.png',
    alt: 'Residents only sauna within the James Square development',
    category: 'amenity'
  },
  // ── Supporting images ────────────────────────────────────────────────────
  {
    src: '/images/properties/caledonian-crescent/kitchen.jpg',
    alt: 'Separate galley kitchen with fitted units and garden outlook',
    category: 'interior'
  },
  {
    src: '/images/properties/caledonian-crescent/bedroom-two.jpg',
    alt: 'Well-proportioned bedroom suitable for double bed furniture',
    category: 'interior'
  },
  {
    src: '/images/properties/caledonian-crescent/hallway.jpg',
    alt: 'Entrance hallway giving access to the main rooms',
    category: 'interior'
  },
  {
    src: '/images/properties/caledonian-crescent/shower-room-1.jpg',
    alt: 'Modern shower room with WC and vanity storage',
    category: 'interior'
  },
  {
    src: '/images/properties/caledonian-crescent/shower-room-2.jpg',
    alt: 'Second bathroom view showing tiling and fixtures',
    category: 'interior'
  },
  {
    src: '/images/properties/caledonian-crescent/private-garden-2.jpg',
    alt: 'Private garden with outdoor seating space',
    category: 'outdoor'
  },
  {
    src: '/images/properties/caledonian-crescent/Shared%20Garden.jpeg',
    alt: 'Shared landscaped garden within the James Square development',
    category: 'outdoor'
  },
  {
    src: '/images/properties/caledonian-crescent/gym_1.png',
    alt: 'Additional residents only gym equipment within James Square',
    category: 'amenity'
  },
  {
    src: '/images/properties/caledonian-crescent/front-exterior.jpg',
    alt: 'Exterior of the James Square residential development',
    category: 'outdoor'
  },
  {
    src: '/images/properties/caledonian-crescent/building-exterior.jpg',
    alt: 'Exterior view of the residential block within James Square',
    category: 'outdoor'
  },
  {
    src: '/images/properties/caledonian-crescent/swimming-pool.jpg',
    alt: 'Additional view of the residents only swimming pool',
    category: 'amenity'
  },
  {
    src: '/images/properties/caledonian-crescent/local-area.jpg',
    alt: 'Local Dalry area view near Caledonian Crescent',
    category: 'location'
  }
];

const montgomeryStreetImages: PropertyImage[] = [
  {
    src: '/images/properties/montgomery-st/09-building_from_outside.jpg',
    alt: 'Exterior of a traditional Edinburgh residential building on Montgomery Street',
    category: 'hero'
  },
  {
    src: '/images/properties/montgomery-st/01-lounge_seat_bay_window.jpg',
    alt: 'Lounge with bay window and seating',
    category: 'interior'
  },
  {
    src: '/images/properties/montgomery-st/07-kitchen_dining_table_window.jpg',
    alt: 'Kitchen and dining area with natural light',
    category: 'interior'
  },
  {
    src: '/images/properties/montgomery-st/04-bedroom_with_wardrobe_01.jpg',
    alt: 'Bedroom with wardrobe storage',
    category: 'interior'
  },
  {
    src: '/images/properties/montgomery-st/06-kitchen_dining_table.jpg',
    alt: 'Spacious dining kitchen at Montgomery Street',
    category: 'interior'
  },
  {
    src: '/images/properties/montgomery-st/05-bathroom.jpg',
    alt: 'Bathroom at Montgomery Street',
    category: 'interior'
  }
];

const royalCrescentImages: PropertyImage[] = [
  {
    src: '/images/properties/royal-crescent/01-royal_crescent_building_from_outside.jpg',
    alt: 'Royal Crescent building exterior in Edinburgh',
    category: 'hero'
  },
  {
    src: '/images/properties/royal-crescent/03-living_lounge.jpg',
    alt: 'Living room in Royal Crescent property',
    category: 'interior'
  },
  {
    src: '/images/properties/royal-crescent/11-kitchen.jpg',
    alt: 'Kitchen in Royal Crescent property',
    category: 'interior'
  },
  {
    src: '/images/properties/royal-crescent/05-bedroom_01.jpg',
    alt: 'Bedroom in Royal Crescent property',
    category: 'interior'
  },
  {
    src: '/images/properties/royal-crescent/04-dining_table.jpg',
    alt: 'Dining area in Royal Crescent property',
    category: 'interior'
  },
  {
    src: '/images/properties/royal-crescent/13-window_view.jpg',
    alt: 'Open view from Royal Crescent towards the Firth of Forth',
    category: 'location'
  }
];

const albanyStreetImages: PropertyImage[] = [
  {
    src: '/images/properties/albany-st/hero_1_albany_front.jpg',
    alt: 'Albany Street New Town building exterior',
    category: 'hero'
  },
  {
    src: '/images/properties/albany-st/hero_3_albany_living.jpg',
    alt: 'Stylish lounge at the Albany Street short-term let',
    category: 'interior'
  },
  {
    src: '/images/properties/albany-st/hero_5_albany_fireplace.jpg',
    alt: 'Real gas fireplace in the Albany Street lounge',
    category: 'interior'
  },
  {
    src: '/images/properties/albany-st/albany_bedroom_1.jpg',
    alt: 'Bedroom at the Albany Street short-term let',
    category: 'interior'
  },
  {
    src: '/images/properties/albany-st/albany_bath.jpg',
    alt: 'Recently updated bathroom at Albany Street',
    category: 'interior'
  },
  {
    src: '/images/properties/albany-st/hero_2_albany_front.jpg',
    alt: 'Traditional New Town frontage on Albany Street',
    category: 'outdoor'
  },
  {
    src: '/images/properties/albany-st/4_albany_fire_castle.png',
    alt: 'Character fireplace detail at Albany Street',
    category: 'interior'
  }
];

export const propertyListings: PropertyListing[] = [
  {
    id: 'caledonian-crescent-61-1',
    slug: '61-1-caledonian-crescent',
    featured: true,
    title: 'Two Bedroom Apartment in James Square, West End Edinburgh',
    addressLine1: '61/1 Caledonian Crescent',
    city: 'Edinburgh',
    monthlyRent: 1695,
    monthlyRentDisplay: '£1,695 per month',
    propertyType: '2 bedroom fully furnished apartment',
    status: 'Available from September 2026',
    summary:
      'A bright and spacious two bedroom apartment set within the sought-after James Square development in Edinburgh’s West End.',
    description:
      'The property is fully furnished and benefits from direct access to a private garden through double French doors, creating a rare outdoor space within a secure city setting.',
    overview:
      'Set within James Square, a secure gated development in Edinburgh’s West End, this fully furnished two bedroom apartment combines generous internal space with private allocated parking and residents only leisure facilities.',
    fullDescription:
      'The apartment opens into a welcoming hallway with neutral decor and wooden flooring. The spacious living room has double French doors leading directly to the private garden, while the galley kitchen, two double bedrooms, and shower room create a practical, well-balanced home.',
    outdoorAndFacilities:
      'The apartment includes a private enclosed garden and an allocated private parking space within the secure gated residents’ car park. Residents also have access to private leisure facilities including a swimming pool, gym, and sauna, with factoring costs and garden maintenance included in the rent.',
    keyFeatures: [
      'Secure entry apartment within a gated development',
      'Private garden with direct access from the living space',
      'Fully furnished throughout',
      'Allocated private parking',
      'Residents’ pool, gym and sauna',
      'Excellent transport links and easy walking distance to the city centre'
    ],
    locationFacts: [
      'James Square is well placed for Haymarket, the city centre, and a wide range of nearby amenities including restaurants, leisure facilities, cinema, gym, Dalry Leisure Centre, and excellent transport links.',
      'Well placed for Haymarket Station, tram connections and regular bus routes across the city.',
      'Straightforward access to Edinburgh Airport via tram, road links or rail connections from Haymarket.',
      'Fountain Park leisure complex is directly nearby, with cinema, bowling, gym, restaurants and everyday amenities.',
      'Local cafés include Pour Boy and Throat Punch Coffee, with restaurants, bars and shops along Dalry Road.'
    ],
    suitability: 'Professionals, couples, or small families seeking central Edinburgh living with private outdoor space and leisure facilities.',
    whoItSuits:
      'This home is particularly well suited to professionals, couples, or small families who want generous space, private outdoor access, secure parking, and strong transport links close to Haymarket and the city centre.',
    additionalInformation: [
      'Monthly rent: £1,695 pcm',
      'Deposit: £1,695',
      'Available from September 2026 onwards',
      'Flexible tenancy length, long-term preferred',
      'Council Tax Band: E',
      'Fully furnished throughout',
      'Pets may be considered on request',
      'Preferably no smokers'
    ],
    advertSections: [
      {
        title: 'Accommodation',
        body: ['The property forms part of James Square, a secure gated development in Edinburgh’s West End, and opens into a welcoming hallway with neutral decor and wooden flooring.'],
        items: [
          'Spacious, light-filled living room with French doors opening directly onto a private rear garden.',
          'Galley kitchen with garden outlook, fitted units, washing machine, fridge-freezer, microwave, electric oven and hob.',
          'Principal double bedroom with built-in open wardrobe storage.',
          'Second double bedroom of similar proportions, suitable as a guest room or home office.',
          'Shower room with WC and washbasin.',
          'Electric heating with storage heaters and double glazing throughout.'
        ]
      },
      {
        title: 'Outdoor Space & Parking',
        items: [
          'Private enclosed rear garden.',
          'Shared landscaped grounds within the James Square development.',
          'Allocated private parking space within a secure gated residents’ car park with fob access, directly in front of the property.',
          'Additional on-street visitor parking available nearby.'
        ]
      },
      {
        title: 'Development Features',
        body: ['Residents of James Square enjoy access to private leisure facilities, with factoring costs, shared grounds, and garden maintenance included within the rent.'],
        items: ['Private swimming pool.', 'Gym.', 'Sauna.']
      },
      {
        title: 'Location',
        body: [
          'James Square is well placed for Haymarket, the city centre, and everyday access across Edinburgh.',
          'Nearby amenities include restaurants, leisure facilities, cinema, gym, transport links and Dalry Leisure Centre.'
        ],
        items: [
          'Popular local cafés include Pour Boy and Throat Punch Coffee.',
          'Restaurants, bars, and shops are available along Dalry Road.',
          'Frequent bus routes run from Dalry Road, Western Approach Road, and Dundee Street.'
        ]
      },
      {
        title: 'Rental Details',
        items: [
          'Monthly Rent: £1,695 per calendar month.',
          'Deposit: £1,695.',
          'Available from: September 2026 onwards.',
          'Tenancy length: Flexible, long-term preferred.',
          'Council Tax Band: E.',
          'EPC Rating: To be confirmed.',
          'Landlord Registration Number: To be confirmed.'
        ]
      },
      {
        title: 'Additional Information',
        items: [
          'Fully furnished throughout.',
          'Fast unlimited WiFi included in the rent.',
          'Factoring fees included, covering leisure facilities and communal maintenance.',
          'Pets may be considered upon request.',
          'Preferably no smokers.',
          'References and identification required.'
        ]
      }
    ],
    closingValueStatement:
      'This is a strong opportunity to secure a well-located apartment within James Square, with private outdoor space, allocated parking, and residents only leisure facilities.',
    images: caledonianImages
  },
  {
    id: 'albany-street-short-term-let',
    slug: 'albany-street',
    featured: false,
    title: 'Two-Bedroom Short-Term Let in Edinburgh’s New Town',
    addressLine1: 'Albany Street',
    city: 'Edinburgh',
    monthlyRent: 0,
    monthlyRentDisplay: 'Short-term rates by enquiry',
    propertyType: '2 bedroom short-term let',
    status: 'Short-Term Let',
    summary:
      'A beautifully presented two-bedroom short-term let in the heart of Edinburgh’s New Town, offering a stylish and comfortable base for city stays.',
    description:
      'Located on Albany Street, this recently renovated ground-floor apartment blends traditional Edinburgh character with thoughtful modern updates, including a striking real gas fireplace and a traditionally styled updated bathroom.',
    overview:
      'This two-bedroom short-term let offers a tasteful mix of old and new, combining period charm with modern comfort in one of Edinburgh’s most desirable central locations.',
    fullDescription:
      'The property is arranged as a spacious ground-floor apartment with a welcoming lounge, a large real gas fireplace, two well-presented bedrooms sleeping up to four guests, a recently updated bathroom, and a fully equipped kitchen suitable for short stays and extended visits.',
    outdoorAndFacilities:
      'Set within the Classical New Town, the apartment is a short walk from Princes Street, St James Quarter, restaurants, cafés, bars, shops, and key visitor attractions.',
    keyFeatures: [
      'Short-term let in Edinburgh New Town',
      'Ground-floor apartment',
      'Sleeps up to 4 guests',
      'Two bedrooms and one bathroom',
      'One king bed and one double bed',
      'Fully furnished and equipped',
      'Wi-Fi and TV included',
      'Washing machine and tumble dryer',
      'Self check-in with smart lock'
    ],
    locationFacts: [
      'Located on Albany Street in Edinburgh’s historic New Town.',
      'A short walk from Princes Street and St James Quarter.',
      'Well placed for restaurants, pubs, shops, cafés, visitor attractions, and city centre transport links.',
      'A strong base for city breaks, festival stays, business trips, or longer short-term visits.'
    ],
    suitability: 'Visitors seeking a high-quality short-term stay in central Edinburgh.',
    whoItSuits:
      'The apartment is well suited to city breaks, festival stays, business trips, and longer short-term visits for guests who want a comfortable New Town base within easy walking distance of central Edinburgh.',
    additionalInformation: [
      'Short-term let rather than a long-term tenancy',
      'Maximum occupancy: 4 guests',
      'One king bed and one double bed',
      'Check-in is typically from 4:00pm to 8:00pm',
      'Check-out is before 11:00am',
      'Airbnb rating: 4.96/5 from 171 reviews',
      'Marked as a Guest Favourite on Airbnb',
      'The Edinburgh Visitor Levy of 5% applies to bookings for stays on or after 24 July 2026'
    ],
    advertSections: [
      {
        title: 'Accommodation',
        body: ['The property is arranged as a spacious ground-floor apartment with a warm, characterful feel.'],
        items: [
          'Welcoming lounge with a large real gas fireplace.',
          'Two well-presented bedrooms, sleeping up to four guests.',
          'Recently updated bathroom with traditional styling and modern practicality.',
          'Fully equipped kitchen suitable for short stays and extended visits.'
        ]
      },
      {
        title: 'Features',
        items: [
          'Short-term let in Edinburgh New Town.',
          'Ground-floor apartment.',
          'Sleeps up to 4 guests.',
          'One king bed and one double bed.',
          'Fully furnished and equipped to a high standard.',
          'Wi-Fi and TV included.',
          'Washing machine and tumble dryer.',
          'Self check-in with smart lock.'
        ]
      },
      {
        title: 'Location',
        body: [
          'Albany Street is superbly positioned within Edinburgh’s historic New Town, placing guests within easy walking distance of the city centre.',
          'Princes Street, St James Quarter, restaurants, pubs, shops, and key attractions are all close by, making this an excellent base for enjoying Edinburgh on foot.'
        ]
      },
      {
        title: 'Guest Experience',
        body: [
          'The property has proven especially popular with guests thanks to its location, presentation, and reliability.',
          'The Airbnb listing is rated 4.96/5 from 171 reviews, is marked as a Guest Favourite, and is described as being in the top 5% of homes based on ratings, reviews, and reliability.'
        ]
      },
      {
        title: 'Important Information',
        items: [
          'This property is offered as a short-term let rather than a long-term tenancy.',
          'Check-in is typically from 4:00pm to 8:00pm.',
          'Check-out is before 11:00am.',
          'Maximum occupancy: 4 guests.',
          'The Edinburgh Visitor Levy of 5% applies to bookings for stays on or after 24 July 2026.'
        ]
      }
    ],
    closingValueStatement:
      'Albany Street Short-Term Let offers a beautifully updated New Town apartment that balances classic Edinburgh character with modern comfort, central access, and excellent guest feedback.',
    images: albanyStreetImages
  },
  {
    id: 'montgomery-street',
    slug: 'montgomery-street',
    featured: false,
    title: 'Sunny & Spacious One-Bedroom Flat – Montgomery Street, Edinburgh',
    addressLine1: 'Montgomery Street',
    city: 'Edinburgh',
    monthlyRent: 0,
    monthlyRentDisplay: 'Currently let and unavailable',
    availabilityDisplay: 'Currently let and unavailable',
    propertyType: '1 bedroom second floor flat',
    status: 'Currently Let',
    summary:
      'A bright and generously proportioned one-bedroom apartment in Edinburgh city centre, extending to approximately 80 square metres.',
    description:
      'Situated a short walk from Princes Street and George Street, this spacious city centre flat offers excellent natural light, generous room sizes, and convenient access to shops, transport links, restaurants, bars, and cafés.',
    overview:
      'This one-bedroom flat offers significantly more space than a typical city centre one-bedroom property, making it an excellent choice for a professional individual or couple seeking comfortable Edinburgh living.',
    fullDescription:
      'Located on the second floor, the property includes a large welcoming entrance hall, a bright south-facing living room with open views towards Calton Hill, a useful box room off the living room, a double bedroom, a spacious dining kitchen, and a bathroom with both bath and shower.',
    outdoorAndFacilities:
      'The property is positioned in the heart of Edinburgh’s city centre, around five minutes from Princes Street and George Street, with the Edinburgh Playhouse Theatre just around the corner.',
    keyFeatures: [
      '1 Bedroom',
      'Approx. 80 sq m',
      'Second Floor',
      'South-Facing Living Room',
      'Box Room / Study',
      'Spacious Dining Kitchen',
      'City Centre Location',
      'On-Street Parking'
    ],
    locationFacts: [
      'Located on Montgomery Street in Edinburgh city centre.',
      'Around five minutes’ walk from Princes Street and George Street.',
      'Close to Edinburgh Playhouse Theatre.',
      'Well positioned for restaurants, bars, cafés, shops, and transport links.'
    ],
    suitability: 'Professional individual or couple seeking a spacious central Edinburgh flat.',
    whoItSuits:
      'This flat is ideally suited to a professional individual or couple who want more space than a typical one-bedroom city centre property, with excellent access to Edinburgh amenities and transport links.',
    additionalInformation: [
      'Currently let and unavailable',
      'Council Tax Band: C',
      'EPC Rating: Band F',
      'Landlord Registration Number: 18199/230/05010',
      'No smokers',
      'No pets',
      'References and identification required'
    ],
    advertSections: [
      {
        title: 'Accommodation',
        body: ['Located on the second floor, the property comprises generously proportioned rooms throughout.'],
        items: [
          'Large welcoming entrance hall measuring approximately 4.00m x 2.60m.',
          'Bright, south-facing living room with open views towards Calton Hill, approximately 5.75m x 3.55m.',
          'Useful box room off the living room, ideal as a study or occasional guest room, approximately 1.95m x 1.37m.',
          'Well-proportioned double bedroom measuring approximately 3.84m x 3.26m.',
          'Spacious dining kitchen suitable for cooking and entertaining, approximately 5.65m x 3.55m.',
          'Bathroom with both bath and shower, approximately 3.20m x 1.50m.'
        ]
      },
      {
        title: 'Key Features',
        items: [
          'Exceptionally spacious one-bedroom layout of approximately 80 sq m.',
          'South-facing living room with excellent natural light.',
          'Central location within walking distance of key amenities.',
          'On-street parking available.',
          'Free parking between 5:30pm and 8:30am, and all weekend.'
        ]
      },
      {
        title: 'Rental Details',
        items: [
          'Currently let and unavailable.',
          'Rent payable by standing order.',
          'Council Tax Band: C.',
          'EPC Rating: Band F.',
          'Landlord Registration Number: 18199/230/05010.'
        ]
      },
      {
        title: 'Tenant Information',
        items: [
          'Ideal for a professional individual or couple.',
          'No smokers.',
          'No pets.',
          'References and identification required.',
          'Applicants are asked to include details of their employment when enquiring.'
        ]
      }
    ],
    closingValueStatement:
      'This is a rare opportunity to secure a spacious and well-located flat in Edinburgh’s city centre, with generous proportions, excellent natural light, and prime access to city amenities.',
    images: montgomeryStreetImages
  },
  {
    id: 'royal-crescent',
    slug: 'royal-crescent',
    featured: false,
    title: 'Two-Bedroom Georgian Apartment – Royal Crescent, Edinburgh',
    addressLine1: 'Royal Crescent',
    city: 'Edinburgh',
    monthlyRent: 0,
    monthlyRentDisplay: 'Currently let and unavailable',
    availabilityDisplay: 'Currently let and unavailable',
    propertyType: '2 bedroom Georgian apartment',
    status: 'Currently Let',
    summary:
      'A beautifully presented two-bedroom apartment in a classic Georgian building on Royal Crescent in Edinburgh’s New Town.',
    description:
      'This bright and spacious third-floor flat combines period charm with modern living, offering open views across the Firth of Forth towards Fife and excellent access to Princes Street and Stockbridge.',
    overview:
      'Set within one of Edinburgh’s most desirable residential addresses, this fully furnished two-bedroom Georgian apartment offers a rare balance of quiet New Town living and easy access to central amenities.',
    fullDescription:
      'The third-floor accommodation includes a generous living room with dining area and impressive views, a modern well-equipped kitchen, two double bedrooms, a bathroom with bath and separate shower, and two walk-in storage cupboards.',
    outdoorAndFacilities:
      'Royal Crescent offers a quiet residential setting within walking distance of Princes Street and Stockbridge, with independent shops, cafés, restaurants, and the weekend market nearby.',
    keyFeatures: [
      '2 Double Bedrooms',
      'Third Floor Georgian Apartment',
      'Fully Furnished',
      'Open Firth of Forth Views',
      'Gas Central Heating',
      'HIVE Controls',
      'Approx. 83 sq m / 893 sq ft',
      'Resident Parking Permits Available'
    ],
    locationFacts: [
      'Located on Royal Crescent in Edinburgh’s New Town.',
      'Within walking distance of Princes Street.',
      'Close to Stockbridge and its independent shops, cafes, and weekend market.',
      'Quiet residential setting with strong city centre access.'
    ],
    suitability: 'Professionals, couples, or small families looking for a high-quality central Edinburgh home.',
    whoItSuits:
      'The property is ideally suited to professionals, couples, or small families seeking a spacious, characterful apartment in a prime New Town location.',
    additionalInformation: [
      'Fully furnished throughout',
      'Gas central heating with combi boiler',
      'Heating controlled via HIVE',
      'Gross internal floor area: approx. 83 sq m / 893 sq ft',
      'Currently let and unavailable',
      'Council Tax Band: E',
      'EPC Rating: Band E',
      'Landlord Registration Number: 18199/230/05010'
    ],
    advertSections: [
      {
        title: 'Accommodation',
        body: ['The property is fully furnished and comprises generous, well-balanced accommodation.'],
        items: [
          'Generous living room with dining area, excellent natural light, and impressive views across the Forth, approximately 5.36m x 3.86m.',
          'Modern, well-equipped kitchen with fridge, freezer, and dishwasher, approximately 4.00m x 2.18m.',
          'Large double bedroom to the front of the property, approximately 5.61m x 2.82m.',
          'Second comfortable double bedroom to the rear, approximately 4.60m x 3.73m.',
          'Bathroom with both bath and separate shower.',
          'Two walk-in storage cupboards, one housing a Bosch automatic washing machine.'
        ]
      },
      {
        title: 'Key Features',
        items: [
          'Fully furnished throughout.',
          'Gas central heating with combi boiler, controlled via HIVE.',
          'Gross internal floor area of approximately 83 sq m / 893 sq ft.',
          'On-street parking available.',
          'Free parking between 5:30pm and 8:30am, and all weekend.',
          'Resident parking permits available.'
        ]
      },
      {
        title: 'Additional Information',
        items: [
          'Currently let and unavailable.',
          'Council Tax Band: E.',
          'EPC Rating: Band E.',
          'Landlord Registration Number: 18199/230/05010.'
        ]
      },
      {
        title: 'Location',
        body: [
          'Royal Crescent is one of Edinburgh’s most desirable residential addresses, offering a quiet setting while remaining within easy reach of the city centre.',
          'Stockbridge is nearby, known for independent shops, cafes, and its weekend market, making the location ideal for city living with neighbourhood character.'
        ]
      }
    ],
    closingValueStatement:
      'This is a rare opportunity to rent a spacious and characterful apartment in a prime New Town location. Viewings are highly recommended.',
    images: royalCrescentImages
  }
];

export const featuredProperty = propertyListings.find((property) => property.featured) ?? propertyListings[0];
