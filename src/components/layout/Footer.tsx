import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t" style={{ background: "var(--bg-surface)", borderColor: "var(--border-color)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                TS
              </div>
              <span className="font-semibold text-lg" style={{ color: "var(--text-primary)" }}>
                Curso TypeScript
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Aprende TypeScript desde cero de forma interactiva.
              Ejercicios praticos, proyectos reales.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Curso</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/curso" className="text-sm transition-colors hover:opacity-80" style={{ color: "var(--text-muted)" }}>
                  Todas las lecciones
                </Link>
              </li>
              <li>
                <Link href="/curso" className="text-sm transition-colors hover:opacity-80" style={{ color: "var(--text-muted)" }}>
                  Ejercicios
                </Link>
              </li>
              <li>
                <Link href="/playground" className="text-sm transition-colors hover:opacity-80" style={{ color: "var(--text-muted)" }}>
                  Playground
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Recursos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://typescriptlang.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--text-muted)" }}
                >
                  TypeScript Official
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/microsoft/TypeScript"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--text-muted)" }}
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Proyectos */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Proyectos</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://javascript-learning-app.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--text-muted)" }}
                >
                  <img
                    src="https://javascript-learning-app.dev/favicon.svg"
                    alt="JavaScript"
                    className="w-5 h-5 rounded"
                  />
                  Curso JavaScript
                </a>
              </li>
              <li>
                <a
                  href="https://react-learning-app.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--text-muted)" }}
                >
                  <img
                    src="https://react-learning-app.dev/favicon.svg"
                    alt="React"
                    className="w-5 h-5 rounded"
                  />
                  React Learning App
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Contacto</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:marcoscalabresibaniez@gmail.com"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--text-muted)" }}
                >
                  marcoscalabresibaniez@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/kraso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--text-muted)" }}
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--border-color)" }}>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} Curso TypeScript. Aprende programando.
          </p>
          <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/legal/privacidad" className="hover:opacity-80 transition-opacity">
              Política de Privacidad
            </Link>
            <span>·</span>
            <Link href="/legal/terminos" className="hover:opacity-80 transition-opacity">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
