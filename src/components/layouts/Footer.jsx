

const Footer = () => {
  return (
    <footer className="bg-zinc-950 py-8 mt-auto text-center text-zinc-400 border-t border-zinc-800">
      <p className="text-sm font-medium">&copy; {new Date().getFullYear()} TanStack Query Demo.</p>
      <p className="text-xs text-zinc-500 mt-2">Built to demonstrate caching, mutations, and infinite scrolling.</p>
    </footer>
  )
}

export default Footer