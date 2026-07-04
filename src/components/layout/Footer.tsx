import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                TS
              </div>
              <span className="text-zinc-100 font-semibold text-lg">
                Curso TypeScript
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Aprende TypeScript desde cero de forma interactiva.
              Ejercicios praticos, proyectos reales.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-zinc-100 font-semibold mb-4">Curso</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/curso" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                  Todas las lecciones
                </Link>
              </li>
              <li>
                <Link href="/curso" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                  Ejercicios
                </Link>
              </li>
              <li>
                <Link href="/playground" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                  Playground
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-zinc-100 font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://typescriptlang.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
                >
                  TypeScript Official
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/microsoft/TypeScript"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-zinc-100 font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:marcoscalabresibaniez@gmail.com"
                  className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
                >
                  marcoscalabresibaniez@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/kraso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8 text-center">
          <p className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} Curso TypeScript. Aprende programando.
          </p>
        </div>
      </div>
    </footer>
  );
}
