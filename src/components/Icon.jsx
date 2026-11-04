const paths = {
  concierge: 'M3 18h18M5 18a7 7 0 0114 0M12 8V6M10 6h4',
  car: 'M5 16h14M6 16l1.5-5h9L18 16M4 16v2h3v-2M17 16v2h3v-2M8 13h.01M16 13h.01',
  dining: 'M7 3v8a2 2 0 002 2v8M11 3v8M17 3c-1.5 0-3 2-3 6s1.5 4 3 4v8',
  spa: 'M12 21c-4-2-7-5-7-9 3 0 5 1 7 4 2-3 4-4 7-4 0 4-3 7-7 9zM12 16c-2-3-2-7 0-11 2 4 2 8 0 11z',
  fire: 'M12 21c-3.5 0-6-2.5-6-5.5 0-3 2-5 3-7 .5 2 1.5 3 2.5 3.5C12 9 12 6 14 3c1 3 4 6 4 11 0 4-2.5 7-6 7z',
  map: 'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14',
  wifi: 'M2 9a15 15 0 0120 0M5 12.5a10 10 0 0114 0M8.5 16a5 5 0 017 0M12 19.5h.01',
  heart: 'M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z',
  users: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20a6 6 0 0112 0M16 11a3 3 0 000-6M18 20a6 6 0 00-3-5.2',
  bed: 'M3 18V8M3 14h18v4M21 14v-2a3 3 0 00-3-3h-7v5M7 11.5a1.5 1.5 0 100-.01',
  size: 'M4 4h6M4 4v6M20 20h-6M20 20v-6M4 4l6 6M20 20l-6-6',
  view: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  mail: 'M3 6h18v12H3zM3 6l9 7 9-7',
  pin: 'M12 21s-7-6-7-12a7 7 0 0114 0c0 6-7 12-7 12zM12 11a2 2 0 100-4 2 2 0 000 4z',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',
  mountain: 'M2 20l7-12 4 6 3-4 6 10H2z',
  leaf: 'M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM5 19l7-7',
}

export default function Icon({ name, className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name] || paths.leaf} />
    </svg>
  )
}
