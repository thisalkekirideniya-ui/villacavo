# Villa Cavo — Haputale, Sri Lanka

Luxury villa website built with React, Tailwind CSS and Framer Motion.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Edit content
All text, rooms, experiences, contact details and images live in `src/data/site.js`.

- **Photos:** the current images are Unsplash placeholders. Put real villa photos in `public/images/`
  and change the paths in the `images` object (e.g. `hero: '/images/hero.jpg'`).
- **Contact:** update `phone`, `whatsapp`, `email` and the social links (marked `TODO`).
- **Colours / fonts:** `tailwind.config.js` (`terra-500` = logo terracotta).

## Pages
Home · About · Rooms & Suites · Experiences (services & spa) · Dining · Gallery · Contact (map + FAQ) · Book (reservation request) · 404
