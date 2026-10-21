import { Link } from 'react-router-dom'

export default function MenuHeader() {
  return (
    <header className="sticky top-0 z-30 bg-[#e7ece4] border-b border-black/10">
      <div className="flex items-center justify-center px-5 h-14">

        <Link to="/admin">
          <img src="/oud-logoo.png" alt="Oud" className="h-10 w-auto" />
        </Link>

      </div>
    </header>
  )
}
