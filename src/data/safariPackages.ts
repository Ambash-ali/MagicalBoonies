// src/data/safariPackages.ts
import { SafariPackage } from '../types/sfp';

// Helper function to generate simple slugs
const generateSlug = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

export const safariPackagesData: SafariPackage[] = [
  // --- MASAI MARA ---
  {
    id: 'mara-01',
    title: 'Wildebeest Majesty: The Quintessential Migration Safari',
    duration: '5 Days / 4 Nights',
    overview: "Immerse yourself in the heart-stopping drama of the Great Migration. This signature safari positions you perfectly to witness the thunderous Mara River crossings and the vast plains teeming with life.",
    itinerary_highlights: [
      'Arrive Nairobi, transfer to luxury Mara camp, afternoon game drive.',
      'Full-day exploration focusing on migration hotspots & river crossings.',
      'Morning game drive along Mara River; afternoon options & sundowners.',
      'Dawn game drive; optional Hot Air Balloon Safari ($$); Bush breakfast.',
      'Final morning game drive & transfer back to Nairobi.',
    ],
    inclusions: ['All park & conservation fees', 'Luxury tented camp/lodge', 'All meals', 'Professional guide', 'Private 4x4 vehicle', 'Ground transfers (specify road/flight)', 'Purified water'],
    exclusions: ['International flights', 'Visa fees', 'Hot Air Balloon', 'Beverages', 'Gratuities', 'Personal insurance'],
    best_travel_season: 'July – October (Peak Migration Season)',
    price_range: 1850,
    tags: ['medium', 'midrange-luxury', 'wildlife', 'migration', 'photography'],
    rating: 4.9,
    image_url: 'https://magicalboonies.wordpress.com/wp-content/uploads/2023/11/mara.jpg', // Wildebeest crossing
    image_suggestions: ["Wildebeest plunging into Mara River", "Lion pride surveying the plains at dawn", "Luxury tent interior with savannah view", "Safari vehicle amidst vast herds", "Maasai warrior against sunset backdrop"],
    destination_category: 'Masai Mara',
    slug: generateSlug('Wildebeest Majesty: The Quintessential Migration Safari'),
    group_size: '',
    package_category: 'Premium'
  },
  {
    id: 'mara-02',
    title: 'Mara Explorer Express: A Taste of the Wild',
    duration: '3 Days / 2 Nights',
    overview: 'Short on time but seeking maximum adventure? This express safari dives straight into the action of the Masai Mara, ideal for weekend escapes or add-ons.',
    itinerary_highlights: [
      'Early departure Nairobi, arrive Mara for lunch, afternoon game drive.',
      'Full-day game drive exploring core reserve areas, seeking Big Five.',
      'Sunrise game drive, breakfast, depart back to Nairobi.',
    ],
    inclusions: ['Park fees', 'Budget-friendly tented camp (ensuite)', 'All meals', 'Driver/guide', 'Shared 4x4 transport from Nairobi', 'Bottled water'],
    exclusions: ['Flights', 'Visas', 'Beverages', 'Laundry', 'Gratuities', 'Personal insurance', 'Optional village visit'],
    best_travel_season: 'Year-round (excellent resident wildlife)',
    price_range: 690,
    tags: ['short', 'economy-midrange', 'wildlife', 'big five'],
    rating: 4.6,
    image_url: 'https://magicalboonies.wordpress.com/wp-content/uploads/2023/11/i-2nmnlxr-x2.jpg', // Safari vehicle with zebras
    image_suggestions: ["Elephants crossing a track", "Safari van with open roof observing zebras", "Interior of a clean budget tented camp", "Cheetah scanning the grasslands", "Campfire gathering at night"],
    destination_category: 'Masai Mara',
    slug: generateSlug('Mara Explorer Express: A Taste of the Wild'),
    group_size: '',
    package_category: 'Premium'
  },
  {
    id: 'mara-03',
    title: 'Mara Romance & Wilderness: Luxury Couple\'s Escape',
    duration: '5 Days / 4 Nights',
    overview: 'Indulge in an unforgettable romantic safari combining thrilling wildlife with intimate moments in secluded luxury lodges. Perfect for couples and honeymooners.',
    itinerary_highlights: [
      'Fly Nairobi to Mara, champagne welcome, afternoon leisure/drive.',
      'Private morning game drive, optional spa ($$), romantic sundowners.',
      'Optional Hot Air Balloon ($$) & champagne bush breakfast.',
      'Guided bush walk (lodge permitting), private candlelit dinner.',
      'Leisurely breakfast, final drive (time permitting), fly back to Nairobi.',
    ],
    inclusions: ['Park fees', 'Luxury lodge/boutique tented camp', 'All meals & select local beverages', 'Private 4x4 & guide', 'Return domestic flights (Nairobi-Mara)', 'Airstrip transfers', 'Romantic touches'],
    exclusions: ['International flights', 'Visas', 'Premium beverages/champagne', 'Spa treatments', 'Hot Air Balloon', 'Gratuities', 'Personal insurance'],
    best_travel_season: 'June – October; December – March',
    price_range: 3200,
    tags: ['medium', 'luxury', 'romance', 'couples', 'wildlife', 'relaxation'],
    rating: 5.0,
    image_url: 'https://magicalboonies.wordpress.com/wp-content/uploads/2025/04/chatgpt-image-apr-30-2025-07_17_15-pm.png', // Luxury hotel room feel
    image_suggestions: ["Couple toasting champagne on a private game drive vehicle", "Luxury lodge room with four-poster bed and view", "Hot air balloon floating over the Mara at sunrise", "Intimate bush dinner setting under lantern light", "Infinity pool overlooking the plains"],
    destination_category: 'Masai Mara',
    slug: generateSlug('Mara Romance & Wilderness: Luxury Couple\'s Escape'),
    group_size: '',
    package_category: 'Premium'
  },
  {
    id: 'mara-04',
    title: "Predator's Path: 6-Day Big Cat Photography Safari",
    duration: '6 Days / 5 Nights',
    overview: 'For the passionate photographer focused on Mara\'s apex predators. Maximize time in the field with expert guides, optimal lighting, and patient observation.',
    itinerary_highlights: [
      'Fly-in or drive to predator-focused camp, afternoon drive.',
      'Day 2-5: Intensive daily game drives targeting big cats.',
      'Flexible schedules for extended sightings.',
      'Potential interaction with researchers (subject to availability).',
      'Optional night drive ($$ where permitted).',
      'Final morning game drive, depart.',
    ],
    inclusions: ['Park fees', 'Photographer-friendly lodge/camp', 'All meals', 'Expert photographer/guide', 'Specialized 4x4 (private or small group)', 'Beanbags/camera rests', 'Water'],
    exclusions: ['Intl flights', 'Visas', 'Camera gear', 'Night drives', 'Beverages', 'Gratuities', 'Insurance'],
    best_travel_season: 'June – November; January – March',
    price_range: 2100,
    tags: ['medium-long', 'midrange-luxury', 'photography', 'wildlife', 'big cats', 'adventure'],
    rating: 4.8,
    image_url: 'https://magicalboonies.wordpress.com/wp-content/uploads/2023/11/samburu.jpg', // Leopard in tree
    image_suggestions: ["Leopard resting on a sausage tree branch", "Cheetah cubs playing near mother on a mound", "Lion pride interacting at sunset", "Photographer aiming long lens from safari vehicle", "Close-up of a hyena"],
    destination_category: 'Masai Mara',
    slug: generateSlug('Predators Path: 6-Day Big Cat Photography Safari'),
    group_size: '',
    package_category: 'Premium'
  },
  {
    id: 'mara-05',
    title: "Mara's Magic for Families: 4-Day Educational Adventure",
    duration: '4 Days / 3 Nights',
    overview: 'Create lifelong memories on a safari designed for families, blending exciting game drives with engaging, kid-friendly activities and cultural learning.',
    itinerary_highlights: [
      'Transfer Nairobi to family lodge, settle in, short game drive.',
      'Morning game drive, afternoon cultural interaction or nature walk.',
      '\'Junior Ranger\' activities (tracking, spoor ID), family picnic.',
      'Evening campfire with stories.',
      'Early morning game drive, depart after breakfast.',
    ],
    inclusions: ['Park fees', 'Family lodge/suite', 'All meals (kid options)', 'Family guide', 'Private 4x4', 'Kids activities', 'Ground transfers'],
    exclusions: ['Intl flights', 'Visas', 'Beverages', 'Gratuities', 'Optional activities', 'Insurance'],
    best_travel_season: 'December – March; June – August',
    price_range: 1350, // Per adult, child rate separate
    tags: ['short-medium', 'midrange', 'family', 'wildlife', 'educational', 'cultural'],
    rating: 4.7,
    image_url: 'https://magicalboonies.wordpress.com/wp-content/uploads/2025/04/chatgpt-image-apr-30-2025-07_29_24-pm.png', // Giraffe family
    image_suggestions: ["Children excitedly pointing from safari vehicle", "Family gathered around a campfire", "Maasai guide showing kids animal tracks", "Giraffe family near the lodge", "Lodge swimming pool with a view"],
    destination_category: 'Masai Mara',
    slug: generateSlug('Maras Magic for Families: 4-Day Educational Adventure'),
    group_size: '',
    package_category: 'Premium'
  },

  // --- COMBO PACKAGES ---
  {
    id: 'combo-01',
    title: "Kenya's Grand Circuit: 8-Day Tsavo, Amboseli & Mara Explorer",
    duration: '8 Days / 7 Nights',
    overview: 'A comprehensive journey through Southern Kenya\'s icons: Tsavo\'s red elephants, Amboseli\'s giants under Kilimanjaro, and the Masai Mara\'s predators.',
    itinerary_highlights: [
      'Day 1-2: Explore Tsavo East/West (Mzima Springs, elephants).',
      'Day 3-4: Drive to Amboseli, game drives with Kili views.',
      'Day 5: Scenic flight Amboseli to Masai Mara.',
      'Day 6-7: Full-day game drives in Masai Mara.',
      'Day 8: Morning activity in Mara, fly back to Nairobi.',
    ],
    inclusions: ['All park fees', 'Varied accommodation (lodges/camps)', 'All meals', 'Driver/guide', '4x4 vehicle (ground)', 'Internal flight (Amboseli-Mara)', 'Airstrip transfers', 'Water'],
    exclusions: ['Intl flights', 'Visas', 'Optional activities', 'Beverages', 'Gratuities', 'Insurance'],
    best_travel_season: 'June – October',
    price_range: 3100,
    tags: ['long', 'midrange-luxury', 'wildlife diversity', 'multi-park', 'iconic parks', 'elephants', 'big cats'],
    rating: 4.9,
    image_url: 'https://magicalboonies.wordpress.com/wp-content/uploads/2023/07/8284232.jpg', // Elephant herd with mountain bg
    image_suggestions: ["Red elephants dusting themselves in Tsavo", "Elephant herd with Kilimanjaro backdrop in Amboseli", "Safari plane on a bush airstrip", "Leopard in Masai Mara", "Diverse landscapes montage"],
    destination_category: 'Combo',
    slug: generateSlug('Kenyas Grand Circuit: 8-Day Tsavo Amboseli Mara Explorer'),
    group_size: '',
    package_category: 'Premium'
  },
    {
      id: 'combo-02',
      title: 'Rift Valley & Mara Majesty: 7-Day Nakuru & Masai Mara Adventure',
      duration: '7 Days / 6 Nights',
      overview: 'Discover the stunning Rift Valley at Lake Nakuru (flamingos, rhinos) before journeying to the Masai Mara for world-class Big Five game viewing.',
      itinerary_highlights: [
        'Day 1: Drive Nairobi to Lake Nakuru, afternoon game drive.',
        'Day 2: Morning exploration Nakuru, drive to Masai Mara region.',
        'Day 3-5: Extensive game drives within Masai Mara Reserve.',
        'Day 6: Focus on specific Mara areas or optional Hot Air Balloon ($$).',
        'Day 7: Final morning game drive, return to Nairobi by road.',
      ],
      inclusions: ['Park fees (Nakuru & Mara)', 'Accommodation (lodge/camp)', 'All meals', 'Driver/guide', '4x4 transport throughout', 'Water'],
      exclusions: ['Intl flights', 'Visas', 'Hot Air Balloon', 'Beverages', 'Gratuities', 'Insurance'],
      best_travel_season: 'Year-round (July-Oct for Mara migration)',
      price_range: 2250,
      tags: ['medium-long', 'midrange', 'wildlife', 'birds', 'rhinos', 'big five', 'rift valley', 'mara'],
      rating: 4.8,
      image_url: 'https://magicalboonies.wordpress.com/wp-content/uploads/2023/07/lion-samburu-national-park.jpg', // Flamingos
      image_suggestions: ["Pink flamingos wading in Lake Nakuru", "White Rhino grazing near Lake Nakuru", "Viewpoint over the Rift Valley", "Cheetah scanning from a termite mound in Mara", "Safari vehicle crossing a Mara stream"],
      destination_category: 'Combo',
      slug: generateSlug('Rift Valley & Mara Majesty: 7-Day Nakuru & Masai Mara Adventure'),
      group_size: '',
      package_category: 'Premium'
    },
  {
    id: 'combo-03',
    title: 'Sky Safari Spectacular: 6-Day Fly-in Amboseli & Masai Mara',
    duration: '6 Days / 5 Nights',
    overview: 'Maximize comfort and time with seamless flights connecting Amboseli\'s elephants and Kilimanjaro views to the predator-rich Masai Mara plains.',
    itinerary_highlights: [
      'Day 1: Fly Nairobi to Amboseli, afternoon game drive.',
      'Day 2: Full day exploring Amboseli, Kili views, Observation Hill.',
      'Day 3: Morning drive, Fly Amboseli via Nairobi to Masai Mara.',
      'Day 4-5: Immerse in Masai Mara, morning & afternoon game drives.',
      'Day 6: Final game drive in Mara, fly back to Nairobi.',
    ],
    inclusions: ['Park fees', 'Luxury accommodation', 'All meals', 'Scheduled domestic flights', 'Airstrip transfers', 'Shared 4x4 game drives', 'Water'],
    exclusions: ['Intl flights', 'Visas', 'Premium drinks', 'Optional activities', 'Gratuities', 'Insurance'],
    best_travel_season: 'June – October; January – March',
    price_range: 3800,
    tags: ['medium', 'luxury', 'fly-in', 'wildlife', 'elephants', 'big cats', 'scenic', 'comfort'],
    rating: 4.9,
    image_url: 'https://magicalboonies.wordpress.com/wp-content/uploads/2023/07/wallpaperflare.com_wallpaper.jpg', // Small plane on bush airstrip
    image_suggestions: ["Small plane on Amboseli airstrip with Kilimanjaro", "Elephants drinking at Amboseli swamp", "Aerial view of Masai Mara plains", "Luxury tented camp exterior in Mara", "Lion pride resting under acacia tree"],
    destination_category: 'Combo',
    slug: generateSlug('Sky Safari Spectacular: 6-Day Fly-in Amboseli & Masai Mara'),
    group_size: '',
    package_category: 'Premium'
  },

  // --- SAMBURU PACKAGES ---
   {
     id: 'samburu-01',
     title: "Samburu's Special Five & Culture: 4-Day Northern Frontier Adventure",
     duration: '4 Days / 3 Nights',
     overview: 'Journey north to Samburu\'s unique landscapes. Seek the "Samburu Special Five" and immerse in Samburu culture, with an optional Reteti visit.',
     itinerary_highlights: [
       'Fly Nairobi to Samburu, transfer to lodge, afternoon game drive.',
       'Full-day game drives focusing on unique species & river habitats.',
       'Morning drive. Afternoon: Samburu village visit OR Reteti visit ($$).',
       'Final morning game drive, fly back to Nairobi.',
     ],
     inclusions: ['Park fees', 'Samburu lodge/camp', 'All meals', 'Return flights (Nairobi-Samburu)', 'Airstrip transfers', 'Shared 4x4 game drives', 'Water'],
     exclusions: ['Intl flights', 'Visas', 'Cultural/Reteti fees', 'Beverages', 'Gratuities', 'Insurance'],
     best_travel_season: 'December – March; June – October',
     price_range: 1650,
     tags: ['short-medium', 'midrange-luxury', 'wildlife', 'unique species', 'culture', 'conservation', 'scenic', 'fly-in'],
     rating: 4.8,
     image_url: 'https://magicalboonies.wordpress.com/wp-content/uploads/2023/11/ol-pejeta-1.jpg', // Reticulated Giraffe
     image_suggestions: ["Reticulated giraffe Browse acacia", "Gerenuk standing on hind legs to feed", "Samburu warriors in traditional attire", "Elephants bathing in Ewaso Ng'iro river", "Reteti Elephant Sanctuary keepers with calves"],
     destination_category: 'Samburu',
     slug: generateSlug('Samburus Special Five & Culture: 4-Day Northern Frontier Adventure'),
     group_size: '',
     package_category: 'Premium'
   },
  {
    id: 'samburu-02',
    title: 'Samburu Wilderness Express: 3-Day Fly-in Escape',
    duration: '3 Days / 2 Nights',
    overview: 'A quick yet impactful fly-in safari to the rugged beauty and unique wildlife of Samburu, focusing on game drives along the Ewaso Ng\'iro River.',
    itinerary_highlights: [
      'Morning flight Nairobi to Samburu, check-in, afternoon game drive.',
      'Full day game drives exploring both sides of the river.',
      'Early morning game drive, breakfast, fly back to Nairobi.',
    ],
    inclusions: ['Park fees', 'Lodge/tented camp', 'All meals', 'Return flights (Nairobi-Samburu)', 'Airstrip transfers', 'Shared 4x4 game drives', 'Water'],
    exclusions: ['Intl flights', 'Visas', 'Beverages', 'Optional visits', 'Gratuities', 'Insurance'],
    best_travel_season: 'June – October; December – March',
    price_range: 1350,
    tags: ['short', 'midrange', 'fly-in', 'wildlife', 'unique species', 'scenic', 'quick escape'],
    rating: 4.7,
    image_url: 'https://magicalboonies.wordpress.com/wp-content/uploads/2023/07/female_cheetah_on_the_lookout_masai_mara_kenya-wallpaper-1920x1080-3.jpg', // Grevy's Zebra
    image_suggestions: ["Grevy's zebra herd", "Leopard lounging in a tree near the river", "Doum palms lining the Ewaso Ng'iro", "View of Samburu landscape from lodge", "Somali ostrich"],
    destination_category: 'Samburu',
    slug: generateSlug('Samburu Wilderness Express: 3-Day Fly-in Escape'),
    group_size: '',
    package_category: 'Premium'
  },

  // --- LAKE NAKURU PACKAGE ---
   {
     id: 'nakuru-01',
     title: 'Flamingo Lakes & Rhino Hills: 2-Day Rift Valley Gem',
     duration: '2 Days / 1 Night',
     overview: 'An ideal short getaway focusing on Lake Nakuru\'s avian wonders and rhino sanctuary. Witness flamingos and spot black/white rhinos.',
     itinerary_highlights: [
       'Drive Nairobi to Nakuru, check-in, extensive afternoon game drive.',
       'Visit Baboon Cliff viewpoint.',
       'Early morning game drive focusing on rhinos & birds.',
       'Breakfast, depart back to Nairobi.',
     ],
     inclusions: ['Park fees', '1 night Nakuru lodge/camp', 'Meals (L,D,B)', 'Driver/guide', 'Private 4x4 transport (Nairobi return)', 'Water'],
     exclusions: ['Intl flights', 'Visas', 'Beverages', 'Gratuities', 'Insurance'],
     best_travel_season: 'Year-round (birdlife variable)',
     price_range: 580,
     tags: ['short', 'economy-midrange', 'birds', 'rhinos', 'wildlife', 'rift valley', 'quick escape'],
     rating: 4.7,
     image_url: 'https://magicalboonies.wordpress.com/wp-content/uploads/2023/11/flock-pink-flamingos-walvis-bay-namibia.jpg', // Rhino
     image_suggestions: ["Flamingo flock at Lake Nakuru", "White rhino mother and calf grazing", "View from Baboon Cliff over Lake Nakuru", "Waterbuck near the shoreline", "Rothschild's giraffe"],
     destination_category: 'Lake Nakuru',
     slug: generateSlug('Flamingo Lakes & Rhino Hills: 2-Day Rift Valley Gem'),
     group_size: 'Small groups',
     package_category: 'Premium'
   },

  // --- AMBOSELI PACKAGES ---
  {
    id: 'amboseli-01',
    title: "Kilimanjaro's Realm: 4-Day Classic Amboseli Elephant Safari",
    duration: '4 Days / 3 Nights',
    overview: 'Experience the magic of Amboseli\'s magnificent elephant herds against the breathtaking backdrop of Mount Kilimanjaro. Unparalleled photo opportunities.',
    itinerary_highlights: [
      'Drive Nairobi to Amboseli, arrive for lunch, afternoon game drive.',
      'Morning & afternoon game drives exploring swamps, plains, woodlands.',
      'Focus on elephants & Kili views.',
      'Visit Observation Hill, optional Maasai village ($$). Sundowners.',
      'Final early morning game drive, depart after breakfast.',
    ],
    inclusions: ['Park fees', 'Amboseli lodge/camp', 'All meals', 'Driver/guide', 'Private 4x4 transport (Nairobi return)', 'Water'],
    exclusions: ['Intl flights', 'Visas', 'Optional village visit', 'Beverages', 'Gratuities', 'Insurance'],
    best_travel_season: 'June – October; January – February',
    price_range: 1450,
    tags: ['short-medium', 'midrange', 'elephants', 'Kilimanjaro views', 'photography', 'wildlife'],
    rating: 4.8,
    image_url: 'https://magicalboonies.wordpress.com/wp-content/uploads/2023/07/327-1.jpg', // Elephants with Kili
    image_suggestions: ["Iconic shot of elephants walking with Kilimanjaro in background", "Close-up of a large bull elephant (tusker)", "View from Observation Hill across Amboseli swamps", "Zebras grazing on plains below Kilimanjaro", "Lodge setting with mountain view"],
    destination_category: 'Amboseli',
    slug: generateSlug('Kilimanjaros Realm: 4-Day Classic Amboseli Elephant Safari'),
    group_size: '',
    package_category: 'Premium'
  },
  {
    id: 'amboseli-02',
    title: 'Amboseli Sky High: 3-Day Luxury Fly-in Adventure',
    duration: '3 Days / 2 Nights',
    overview: 'Maximize time and comfort with this swift fly-in safari to Amboseli. Enjoy spectacular aerial views, premium lodging, and expert guiding.',
    itinerary_highlights: [
      'Scenic flight Nairobi to Amboseli, transfer to luxury camp.',
      'Lunch, afternoon game drive.',
      'Full day activities: morning & afternoon game drives, Kili views.',
      'Relax at camp midday.',
      'Early morning game drive/walk, breakfast, fly back to Nairobi.',
    ],
    inclusions: ['Park fees', 'Luxury tented camp/lodge', 'All meals', 'Return flights (Nairobi-Amboseli)', 'Airstrip transfers', 'Shared 4x4 game drives', 'Water', 'Select camp activities'],
    exclusions: ['Intl flights', 'Visas', 'Premium drinks', 'Optional activities', 'Gratuities', 'Insurance'],
    best_travel_season: 'June – October; January – February',
    price_range: 1550,
    tags: ['short', 'luxury', 'fly-in', 'elephants', 'Kilimanjaro views', 'photography', 'comfort', 'scenic'],
    rating: 4.9,
    image_url: 'https://magicalboonies.wordpress.com/wp-content/uploads/2023/11/i-5bd8r7r-x2-1.jpg', // Elephant close up
    image_suggestions: ["Small aircraft on Amboseli runway", "Luxury tent interior with view towards Kilimanjaro", "Elephants wading through Amboseli swamp", "Sundowner setup with Kilimanjaro backdrop", "Aerial view of Amboseli plains"],
    destination_category: 'Amboseli',
    slug: generateSlug('Amboseli Sky High: 3-Day Luxury Fly-in Adventure'),
    group_size: '',
    package_category: 'Premium'
  },
];