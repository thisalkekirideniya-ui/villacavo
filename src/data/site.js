// ---------------------------------------------------------------------------
// Villa Cavo — site content
// Everything editable lives here: contact details, images, rooms, experiences.
// Images are Unsplash placeholders — replace them with real Villa Cavo photos
// (drop files into /public/images and use paths like '/images/hero.jpg').
// ---------------------------------------------------------------------------

const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const contact = {
  phone: '+94 77 000 0000', // TODO: real number
  whatsapp: '94770000000', // TODO: digits only, with country code
  email: 'stay@villacavo.lk', // TODO: real email
  address: 'Villa Cavo, Haputale, Badulla District, Uva Province, Sri Lanka',
  mapEmbed: 'https://www.google.com/maps?q=Haputale,Sri+Lanka&z=13&output=embed',
  mapLink: 'https://maps.google.com/?q=Haputale,Sri+Lanka',
  checkIn: '2:00 PM',
  checkOut: '11:00 AM',
  social: {
    // TODO: replace with Villa Cavo's real profile links
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    tiktok: 'https://tiktok.com/',
  },
}

export const images = {
  hero: u('photo-1506905925346-21bda4d32df4', 1800),
  mist: u('photo-1464822759023-fed622ff2c3b'),
  valley: u('photo-1501785888041-af3ef285b470'),
  forest: u('photo-1441974231531-c6227db76b6e'),
  landscape: u('photo-1469474968028-56623f02e42e'),
  villa: u('photo-1613490493576-7fde63acd811'),
  villa2: u('photo-1600596542815-ffad4c1539a9'),
  villa3: u('photo-1600585154340-be6161a56a0c'),
  pool: u('photo-1613977257363-707ba9348227'),
  living: u('photo-1522708323590-d24dbb6b0267'),
  bedroom: u('photo-1505693416388-ac5ce068fe85'),
  suite: u('photo-1590490360182-c33d57733427'),
  room: u('photo-1611892440504-42a792e24d32'),
  room2: u('photo-1631049307264-da0ec9d70304'),
  room3: u('photo-1582719478250-c89cae4dc85b'),
  spa: u('photo-1544161515-4ab6ce6db874'),
  dining: u('photo-1414235077428-338989a2e8c0'),
  dining2: u('photo-1517248135467-4c7edcad34c4'),
  food: u('photo-1504674900247-0877df9cc836'),
  tea: u('photo-1544787219-7f47ccb76574'),
  coffee: u('photo-1495474472287-4d71bcdd2085'),
  hike: u('photo-1551632811-561732d1e306'),
  waterfall: u('photo-1433086966358-54859d0ed716'),
  path: u('photo-1447752875215-b2761acb3c5d'),
  cabin: u('photo-1470770841072-f978cf4d019e'),
}

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/rooms', label: 'Rooms & Suites' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/dining', label: 'Dining' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export const rooms = [
  {
    slug: 'misty-peak-suite',
    name: 'Misty Peak Suite',
    tagline: 'Our signature suite, framed by the Haputale gap',
    image: images.suite,
    gallery: [images.suite, images.living, images.mist],
    size: '62 m²',
    guests: '2 Adults',
    bed: 'King Bed',
    view: 'Panoramic Mountain View',
    price: 'From USD 280',
    description:
      'Wake above the clouds. Floor-to-ceiling glass opens onto a private terrace where the morning mist drifts through the valley below. A deep soaking tub, a reading nook by the fireplace and hand-loomed linens complete the most coveted room at Villa Cavo.',
    features: ['Private terrace', 'Fireplace', 'Soaking tub', 'Rain shower', 'Butler service', 'Minibar'],
  },
  {
    slug: 'tea-garden-deluxe',
    name: 'Tea Garden Deluxe',
    tagline: 'Opening onto rolling emerald tea terraces',
    image: images.room,
    gallery: [images.room, images.tea, images.valley],
    size: '45 m²',
    guests: '2 Adults',
    bed: 'King or Twin',
    view: 'Tea Estate View',
    price: 'From USD 210',
    description:
      'Step from your room straight into the garden. Warm timber, colonial-era detailing and a private veranda overlooking the tea estates make the Deluxe rooms a serene retreat — perfect for slow mornings with a pot of freshly brewed Uva tea.',
    features: ['Garden veranda', 'Writing desk', 'Walk-in shower', 'Tea & coffee bar', 'Smart TV', 'Wi-Fi'],
  },
  {
    slug: 'highland-family-villa',
    name: 'Highland Family Villa',
    tagline: 'Two bedrooms, one unforgettable view',
    image: images.room2,
    gallery: [images.room2, images.villa2, images.living],
    size: '95 m²',
    guests: '4 Adults + 2 Children',
    bed: '1 King + 2 Twin',
    view: 'Valley & Garden View',
    price: 'From USD 390',
    description:
      'A home among the hills for families and friends. Two bedrooms share a living lounge with a fireplace and dining table, opening onto a wide deck where evenings are spent watching the lights of the valley flicker on.',
    features: ['Two bedrooms', 'Living lounge', 'Fireplace', 'Large deck', 'Kids amenities', 'In-villa dining'],
  },
  {
    slug: 'cloud-loft',
    name: 'The Cloud Loft',
    tagline: 'A hideaway under the eaves, for two',
    image: images.room3,
    gallery: [images.room3, images.cabin, images.forest],
    size: '50 m²',
    guests: '2 Adults',
    bed: 'King Bed',
    view: 'Forest & Sky View',
    price: 'From USD 240',
    description:
      'Tucked beneath vaulted timber beams, the Cloud Loft is an intimate escape with a skylight above the bed — for stargazing on clear nights and watching the clouds roll in by day. Ideal for honeymooners.',
    features: ['Skylight', 'Vaulted ceiling', 'Freestanding tub', 'Honeymoon setup', 'Bluetooth speaker', 'Wi-Fi'],
  },
]

export const experiences = [
  {
    title: 'Sunrise at Lipton’s Seat',
    category: 'Excursion',
    image: images.mist,
    text: 'Rise before dawn and drive through the Dambatenne tea estate to the viewpoint where Sir Thomas Lipton once surveyed his empire — seven provinces at your feet as the sun breaks the mist.',
    duration: 'Half day',
  },
  {
    title: 'Tea Estate Walk & Tasting',
    category: 'Culture',
    image: images.tea,
    text: 'Walk the emerald terraces with a local planter, meet the tea pluckers and finish at a century-old factory with a guided tasting of high-grown Uva teas.',
    duration: '3 hours',
  },
  {
    title: 'Adisham Bungalow & Monastery',
    category: 'Heritage',
    image: images.villa3,
    text: 'Visit the Tudor-style Adisham Bungalow — now St. Benedict’s Monastery — set in a forest reserve, with its English gardens, orchards and homemade jams.',
    duration: '2 hours',
  },
  {
    title: 'Diyaluma Falls',
    category: 'Adventure',
    image: images.waterfall,
    text: 'Swim in the natural infinity pools at the top of Sri Lanka’s second-highest waterfall, with views stretching all the way to the southern plains.',
    duration: 'Full day',
  },
  {
    title: 'Highland Spa Rituals',
    category: 'Wellness',
    image: images.spa,
    text: 'Ayurvedic treatments using herbs from our garden — warm oil massages, herbal steam and tea-infused body scrubs to restore you after a day in the hills.',
    duration: '60 – 120 min',
  },
  {
    title: 'The Hill Country Train',
    category: 'Journey',
    image: images.landscape,
    text: 'Ride one of the world’s most scenic railways from Haputale station, winding through tunnels, tea estates and cloud forest toward Ella and Demodara’s Nine Arch Bridge.',
    duration: 'Flexible',
  },
]

export const services = [
  { icon: 'concierge', title: 'Personal Butler', text: 'A dedicated host attends to every detail of your stay.' },
  { icon: 'dining', title: 'In-Villa Dining', text: 'Private chef menus served wherever you wish to dine.' },
  { icon: 'fire', title: 'Bonfire Evenings', text: 'Starlit nights by the fire with hot toddies and stories.' },
  { icon: 'map', title: 'Curated Tours', text: 'Guided excursions to the hill country’s hidden gems.' },
  { icon: 'wifi', title: 'High-Speed Wi-Fi', text: 'Stay connected — even among the clouds.' },
  { icon: 'heart', title: 'Celebrations', text: 'Honeymoons, proposals & private events, beautifully staged.' },
]

export const attractions = [
  { name: 'Haputale Railway Station', distance: '5 min' },
  { name: 'Adisham Bungalow', distance: '15 min' },
  { name: 'Dambatenne Tea Factory', distance: '20 min' },
  { name: 'Lipton’s Seat', distance: '35 min' },
  { name: 'Diyaluma Falls', distance: '1 hr' },
  { name: 'Ella & Nine Arch Bridge', distance: '1 hr 15 min' },
  { name: 'Horton Plains National Park', distance: '1 hr 30 min' },
]

export const testimonials = [
  {
    quote:
      'We woke every morning to clouds drifting below our terrace. The staff anticipated every need before we knew we had it. Truly the finest stay of our Sri Lanka journey.',
    name: 'Charlotte & James',
    from: 'London, United Kingdom',
  },
  {
    quote:
      'The food, the silence, the views — Villa Cavo is pure magic. Dinner by the fireplace after the Lipton’s Seat sunrise is a memory we will treasure forever.',
    name: 'Anika Weber',
    from: 'Munich, Germany',
  },
  {
    quote:
      'Elegant, warm and deeply personal. It feels like staying at a private estate rather than a hotel. We are already planning our return.',
    name: 'Rohan Perera',
    from: 'Colombo, Sri Lanka',
  },
]

export const dayAtVilla = [
  { time: '6:00 AM', title: 'Dawn Mist', text: 'Bed tea delivered to your terrace as the valley disappears beneath a sea of clouds.' },
  { time: '8:30 AM', title: 'Highland Breakfast', text: 'Hoppers, fresh tropical fruit and estate coffee on the garden lawn.' },
  { time: '4:00 PM', title: 'High Tea', text: 'A colonial-style afternoon tea service with Uva’s finest single-estate brews.' },
  { time: '7:30 PM', title: 'Fireside Dinner', text: 'A candlelit Sri Lankan feast, followed by a bonfire under the stars.' },
]

export const gallery = [
  { src: images.villa, cat: 'Villa', alt: 'Villa Cavo exterior' },
  { src: images.mist, cat: 'Views', alt: 'Misty mountains at dawn' },
  { src: images.suite, cat: 'Rooms', alt: 'Misty Peak Suite' },
  { src: images.dining, cat: 'Dining', alt: 'Dining room' },
  { src: images.valley, cat: 'Views', alt: 'Valley view' },
  { src: images.living, cat: 'Villa', alt: 'Living lounge' },
  { src: images.room, cat: 'Rooms', alt: 'Tea Garden Deluxe' },
  { src: images.food, cat: 'Dining', alt: 'Chef’s plate' },
  { src: images.forest, cat: 'Views', alt: 'Cloud forest' },
  { src: images.spa, cat: 'Villa', alt: 'Spa' },
  { src: images.room2, cat: 'Rooms', alt: 'Highland Family Villa' },
  { src: images.tea, cat: 'Dining', alt: 'Ceylon tea' },
  { src: images.pool, cat: 'Villa', alt: 'Terrace' },
  { src: images.landscape, cat: 'Views', alt: 'Hill country landscape' },
  { src: images.room3, cat: 'Rooms', alt: 'The Cloud Loft' },
  { src: images.dining2, cat: 'Dining', alt: 'Evening dining' },
]
