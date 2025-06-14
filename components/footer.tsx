import { Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 py-8 px-6 border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <span>Made by</span>
          <a
            href="https://github.com/abhinxvz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-indigo-400 transition-colors font-medium"
          >
            <Github className="w-4 h-4" />
            Abhinav
          </a>
        </div>
      </div>
    </footer>
  )
}
