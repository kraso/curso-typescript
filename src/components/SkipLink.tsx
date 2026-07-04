export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:p-3 focus:rounded-lg focus:shadow-lg focus:outline-none"
    >
      Saltar al contenido principal
    </a>
  );
}
