import jezirko from "./assets/jezirko.jpg";
import logo from "./assets/logos/VB_design.png";

export default function App() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white min-h-screen font-mono scroll-smooth pt-24 relative">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <nav className="flex justify-center space-x-6 text-2xl font-light font-space-mono py-6">
          <a
            href="#"
            className="flex items-center px-6 py-2 transition duration-300 text-[#666666] relative
              after:content-[''] after:absolute after:left-1/2 after:-bottom-5 after:w-0 after:h-[2px]
              after:bg-[#9C834D] after:transition-all after:duration-300
              hover:text-[#9C834D] hover:after:w-full hover:after:left-0"
            aria-label="Domů"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 10.75L12 3l9 7.75v9a1.25 1.25 0 0 1-1.25 1.25h-5.5A1.25 1.25 0 0 1 13 19.5v-4a1 1 0 0 0-2 0v4a1.25 1.25 0 0 1-1.25 1.25h-5.5A1.25 1.25 0 0 1 3 19.75v-9z" />
            </svg>
          </a>

          {[
            "SLUŽBY",
            "VIZUALIZACE",
            "GALERIE",
            "O NÁS",
            "KONTAKT",
          ].map((text) => {
            const isContact = text === "KONTAKT";
            return (
              <a
                key={text}
                href={`#${text.toLowerCase().replace(" ", "_")}`}
                className={
                  "flex items-center px-6 py-2 transition duration-300 " +
                  (isContact
                    ? "bg-[#9C834D] text-white rounded-3xl hover:bg-[#666666]"
                    : "text-[#666666] relative inline-block after:content-[''] after:absolute after:left-1/2 after:-bottom-5 after:w-0 after:h-[2px] after:bg-[#9C834D] after:transition-all after:duration-300 hover:text-[#9C834D] hover:after:w-full hover:after:left-0")
                }
              >
                {text}
              </a>
            );
          })}
        </nav>
      </header>

      <section className="relative w-full h-[88vh] bg-black overflow-hidden">
        <img
          src={jezirko}
          alt="Jezírko"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-end justify-start px-10 pb-12">
          <div className="text-white space-y-4 max-w-xs sm:max-w-md">
            <img src={logo} alt="Logo" className="w-64 h-auto" />
          </div>
        </div>
      </section>

      <section
        id="služby"
        className="min-h-screen flex items-center justify-center bg-gray-100"
      >
        <h2 className="text-3xl font-bold">SLUŽBY</h2>
      </section>

      <section
        id="vizualizace"
        className="min-h-screen flex items-center justify-center bg-white"
      >
        <h2 className="text-3xl font-bold">VIZUALIZACE</h2>
      </section>

      <section
        id="galerie"
        className="min-h-screen flex items-center justify-center bg-gray-100"
      >
        <h2 className="text-3xl font-bold">GALERIE</h2>
      </section>

      <section
        id="o_nás"
        className="min-h-screen flex items-center justify-center bg-white"
      >
        <h2 className="text-3xl font-bold">O NÁS</h2>
      </section>

      <footer
        id="kontakt"
        className="bg-white border-t border-gray-200 py-16"
      >
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-[#666666] font-space-mono text-base">
          <div>
            <h3 className="text-lg font-semibold mb-2">Kontakt</h3>
            <p className="mb-1">+420 123 456 789</p>
            <p>info@firma.cz</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Sledujte nás</h3>
            <div className="flex justify-center space-x-6 text-xl">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#9C834D] transition"
                aria-label="Instagram"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zM4 7.75A3.75 3.75 0 0 1 7.75 4h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.25-2a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#9C834D] transition"
                aria-label="Facebook"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.5 10.5V8.75a1.25 1.25 0 0 1 1.25-1.25h1.25V5h-2.5A3.75 3.75 0 0 0 10.25 8.75v1.75H8v2.5h2.25V19h3.25v-6h2.25l.5-2.5h-2.75z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Adresa</h3>
            <p className="mb-1">Ulice 123</p>
            <p>100 00 Praha</p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 mt-12 font-space-mono">
          © {new Date().getFullYear()} MojeFirma. Všechna práva vyhrazena.
        </div>
      </footer>

      {/* Šipka nahoru */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition duration-300 shadow-lg z-50"
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
