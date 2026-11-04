import { Link } from 'react-router-dom'
import ArchMark from '../components/ArchMark'

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen overflow-hidden flex-col items-center justify-center bg-white px-6 pt-24 text-center">
      <ArchMark animate className="relative h-32 w-auto" />
      <p className="mt-10 eyebrow">Error 404</p>
      <h1 className="mt-4 text-5xl text-ink sm:text-7xl">
        Lost in <span className="italic text-terra-500">the mist</span>
      </h1>
      <p className="mt-6 max-w-md text-ink-soft">The page you’re looking for has wandered off into the hills.</p>
      <Link to="/" className="btn-primary mt-10">Return home</Link>
    </section>
  )
}
