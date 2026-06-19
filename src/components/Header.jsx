import { NavLink, Link } from "react-router";

const Header = () => {
  return (
    <header className="bg-zinc-900 text-zinc-100 border-b border-zinc-800 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold tracking-wide">
          <Link to="/" className="hover:text-blue-400 transition-colors">TanStack App</Link>
        </div>
        <ul className="flex items-center gap-8">
          <li><NavLink to="/" className={({ isActive }) => isActive ? "text-blue-400 font-semibold" : "text-zinc-300 hover:text-white transition-colors"}>Home</NavLink></li>
          <li><NavLink to="/trad" className={({ isActive }) => isActive ? "text-blue-400 font-semibold" : "text-zinc-300 hover:text-white transition-colors"}>FetchOld</NavLink></li>
          <li><NavLink to="/rq" className={({ isActive }) => isActive ? "text-blue-400 font-semibold" : "text-zinc-300 hover:text-white transition-colors"}>FetchRq</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header