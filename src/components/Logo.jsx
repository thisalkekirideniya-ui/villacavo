import { Link } from 'react-router-dom'
import ArchMark from './ArchMark'

export default function Logo({ light = false, className = '' }) {
  return (
    <Link to="/" className={`group flex items-center gap-3 ${className}`} aria-label="Villa Cavo home">
      <ArchMark className="h-11 w-auto transition-transform duration-700 group-hover:-translate-y-0.5" color={light ? '#fff' : '#B4491F'} />
      <span className="flex flex-col leading-none">
        <span className={`font-caps text-[10px] tracking-[0.55em] ${light ? 'text-white/80' : 'text-ink-soft'}`}>VILLA</span>
        <span className={`font-display text-[26px] tracking-[0.12em] ${light ? 'text-white' : 'text-ink'}`}>CΛVO</span>
      </span>
    </Link>
  )
}
