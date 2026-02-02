import { useState } from "react";
import jezirko from "./assets/jezirko.jpg";
import logo from "./assets/logos/kamendomu.svg";
import EmblaGallery from './components/EmblaGallery'

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = [
    { text: "SLUŽBY", id: "služby" },
    { text: "MATERIÁLY", id: "materiály" },
    { text: "GALERIE", id: "galerie" },
    { text: "O NÁS", id: "o_nás" },
    { text: "KONTAKT", id: "kontakt" },
  ];

  return (
    <div className="bg-white min-h-screen font-mono scroll-smooth pt-20 relative">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Ikona Domů */}
          <a
            href="#"
            className="flex items-center text-[#666666] hover:text-[#9C834D] transition duration-300"
            aria-label="Domů"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 10.75L12 3l9 7.75v9a1.25 1.25 0 0 1-1.25 1.25h-5.5A1.25 1.25 0 0 1 13 19.5v-4a1 1 0 0 0-2 0v4a1.25 1.25 0 0 1-1.25 1.25h-5.5A1.25 1.25 0 0 1 3 19.75v-9z" />
            </svg>
          </a>

          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-6 text-2xl font-light font-space-mono">
            {menuItems.map(({ text, id }) => {
              const isContact = text === "KONTAKT";
              return (
                <a
                  key={text}
                  href={`#${id}`}
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

          {/* Burger button pro mobil */}
          <button
            className="md:hidden text-[#666666]"
            onClick={() => setIsOpen(true)}
            aria-label="Otevřít menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobilní boční menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 z-50`}
        >
          <div className="p-4 flex justify-between items-center border-b">
            <div className="text-lg font-bold">Menu</div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Zavřít menu"
              className="text-[#666666]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col p-4 gap-4 text-[#666666] font-space-mono font-light text-lg">
            {menuItems.map(({ text, id }) => (
              <a
                key={text}
                href={`#${id}`}
                onClick={() => setIsOpen(false)}
                className="hover:text-[#9C834D] transition"
              >
                {text}
              </a>
            ))}
          </nav>
        </div>

        {/* Překryvné pozadí, když je menu otevřené */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </header>

      {/* Obsah stránky */}
      <section className="relative w-full h-[94vh] bg-black overflow-hidden">
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

        <div className="absolute top-1/2 right-20 transform -translate-y-[-60px] translate-x-[-4
      0px] 
                p-6 max-w-2xl rounded-2xl bg-gray-900/20">
          <p className="text-white text-lg leading-relaxed text-center">
            Naše firma poskytuje služby zaměřené na úpravu a zvelebování zahrad,
          okolí domů a případně i drobné úpravy domů samotných
          (parapety, vnitřní kamenné obklady, zárubně, obklady podezdívek).
          </p>
        </div>

      </section>

     <section
        id="služby"
        className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 py-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-12 uppercase tracking-wide text-gray-800">
          Služby
        </h2>

        {/* Grid kontejner pro 3 sloupce */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          
          {/* 1. Sloupec - ZAHRADA */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-green-700 border-b pb-2">
              ZAHRADA
            </h3>
            <ul className="text-gray-700 space-y-2 text-left list-disc list-inside">
              <li>Grafické návrhy zahrad</li>
              <li>Realizace zahrad</li>
              <li>Úpravy stávajících zahrad</li>
              <li>Vodní prvky (jezírka, vodopády, potoky)</li>
              <li>Zahradní zídky a skalky</li>
            </ul>
          </div>

          {/* 2. Sloupec - KAMENICKÉ PRÁCE */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">
              KAMENICKÉ PRÁCE
            </h3>
            <ul className="text-gray-700 space-y-2 text-left list-disc list-inside">
              <li>Kamenné dlažby</li>
              <li>Opěrné zdi a zahradní zídky</li>
              <li>Vyvýšené záhony a skalky</li>
              <li>Různé typy schodišť</li>
              <li>Obklady soklů a podezdívek</li>
              <li>Parapety a dveřní zárubně</li>
              <li>Ohniště a grily</li>
              <li>Zahradní posezení</li>
              <li>Terasy a pergoly</li>
            </ul>
          </div>

          {/* 3. Sloupec - DŘEVO V ZAHRADĚ */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-amber-700 border-b pb-2">
              DŘEVO V ZAHRADĚ
            </h3>
            <ul className="text-gray-700 space-y-2 text-left list-disc list-inside">
              <li>Terasy a mola</li>
              <li>Posezení v kombinaci dřevo a kámen</li>
            </ul>
          </div>

        </div>
      </section>

      <section
        id="materiály"
        className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-6 uppercase tracking-wide text-gray-800">
          Materiály
        </h2>

        {/* Úvodní text */}
        <p className="max-w-3xl text-gray-700 text-lg leading-relaxed mb-12">
          Pro realizace zahrad a zahradních doplňků používáme různé materiály. 
          Materiál je volen pečlivě podle regionu a podle účelu použití, 
          aby dokonale zapadl do rázu vaší zahrady.
        </p>

        {/* Grid kontejner pro 3 sloupce */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          
          {/* 1. Sloupec - PÍSKOVCE */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col border border-gray-100 items-center">
            <h3 className="text-xl font-bold mb-4 text-amber-600 border-b pb-2 w-full">
              PÍSKOVCE
            </h3>
            <p className="text-sm text-gray-500 mb-3 italic">Různé barevné varianty:</p>
            {/* Odstraněno list-disc, přidáno text-center */}
            <ul className="text-gray-700 space-y-2 text-center">
              <li>Zelený pískovec Záměl</li>
              <li>Bílý pískovec Božanov</li>
              <li>Světle žlutý Kocbeře</li>
              <li>Bíložlutý Vyhnánov</li>
              <li>Červený Javorka</li>
              <li>Šedozelený Dubenec</li>
              <li>Šedožlutý Krákorka</li>
            </ul>
          </div>

          {/* 2. Sloupec - RULY A DROBA */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col border border-gray-100 items-center">
            <h3 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2 w-full">
              RULY
            </h3>
            <ul className="text-gray-700 space-y-2 text-center mb-6">
              <li>Balkánské ruly (různé odstíny)</li>
              <li>Stébelnatá šedočerná rula Otmuchow</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2 w-full">
              MORAVSKÁ DROBA
            </h3>
            <ul className="text-gray-700 space-y-2 text-center">
              <li>Tradiční moravský kámen</li>
            </ul>
          </div>

          {/* 3. Sloupec - ŽULY A OSTATNÍ */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col border border-gray-100 items-center">
            <h3 className="text-xl font-bold mb-4 text-slate-800 border-b pb-2 w-full">
              ŽULY A TVRDÉ KAMENY
            </h3>
            <ul className="text-gray-700 space-y-2 text-center">
              <li>Žuly v různých odstínech</li>
              <li>Amfibolit</li>
              <li>Kvarcit</li>
            </ul>
          </div>

        </div>
      </section>

      <section
        id="galerie"
        className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8"
      >
        <h2 className="text-3xl font-bold mb-8 mt-16">GALERIE</h2>
        <div className="w-full max-w-4xl rounded-lg overflow-hidden">
          <EmblaGallery />
        </div>
      </section>

      <section id="o_nás" className="min-h-screen bg-white px-6 py-24">
        {/* Nadpis */}
        <h2 className="text-3xl font-bold text-center mb-12">O NÁS</h2>

        {/* Obsah: Text + Obrázek */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 py-12">
          {/* Text */}
          <div className="max-w-md text-center ">
            <p className="text-lg leading-relaxed">
              Naše rodinná firma tvoří kamenná návrhy a realizace již déle než 10 let. Pečlivost a profesionální přístup jsou pro nás samozřejmostí, protože věříme, že jen tak vznikají skutečně krásné a trvanlivé výsledky. Rádi pomúžeme i Vám proměnit vaše představy ve skutečnost.
            </p>
          </div>

          
        </div>
      </section>


      {/* Footer */}
      <footer
        id="kontakt"
        className="bg-white border-t border-gray-200 py-16"
      >
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-[#666666]  text-base">
          <div>
            <h3 className="text-lg font-semibold mb-2">Kontakt</h3>
            <p className="mb-1">+420 123 456 789</p>
            <p>kamendomu@gmail.com</p>
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
            <p className="mb-1">56201 Ústí nad Orlicí</p>
            <p>Česká republika</p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 mt-12 font-space-mono">
          © {new Date().getFullYear()} Kamendomu. Všechna práva vyhrazena.
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
