import { useState } from "react";
// Ujisti se, že cesty k těmto importům jsou u tebe správně:
import jezirko from "./assets/jezirko.jpg";
import logo from "./assets/logos/kamendomu.svg";
import EmblaGallery from './components/EmblaGallery';

// --- 1. DEFINICE TYPŮ (PRO TYPESCRIPT) ---
type ServiceImage = {
  name: string;
  src: string;
};

interface MiniServiceGalleryProps {
  images: ServiceImage[];
  title: string;
  colorClass: string;
  onImageClick: (img: ServiceImage) => void;
}

// --- 2. KOMPONENTA PRO MINI GALERIE VE SLUŽBÁCH ---
const MiniServiceGallery = ({ 
  images, 
  title, 
  colorClass, 
  onImageClick 
}: MiniServiceGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col items-center w-full">
      <h3 className={`text-xl font-bold mb-4 border-b pb-2 w-full ${colorClass}`}>
        {title}
      </h3>
      
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md group bg-gray-200">
        <img 
          src={images[currentIndex].src} 
          alt={images[currentIndex].name} 
          className="w-full h-full object-cover transition duration-500 cursor-pointer hover:scale-105"
          onClick={() => onImageClick(images[currentIndex])}
        />
        
        {/* Popisek + počítadlo */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3 text-white text-center">
          <p className="text-sm md:text-base font-semibold">
            {images[currentIndex].name}
          </p>
          <p className="text-xs text-gray-300 mt-1">
            {currentIndex + 1} / {images.length}
          </p>
        </div>

        {/* Šipky */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 opacity-0 group-hover:opacity-100 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 opacity-0 group-hover:opacity-100 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// --- 3. HLAVNÍ APLIKACE ---
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ServiceImage | null>(null);

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

  // --- DATA PRO SLUŽBY (FOTKY MÍSTO ODRÁŽEK) ---
  const servicesImages: Record<string, ServiceImage[]> = {
    zahrada: [
      { name: "Grafické návrhy zahrad", src: "/images/sluzby/navrh.jpg" },
      { name: "Realizace zahrad", src: "/images/sluzby/realizace.jpg" },
      { name: "Úpravy stávajících zahrad", src: "/images/IMG-20250807-WA0025.jpg" },
      { name: "Vodní prvky (jezírka, vodopády, potoky)", src: "/images/IMG-20250807-WA0022.jpg" },
      { name: "Zahradní zídky a skalky", src: "/images/služby/zahradni zidky.jpg" },
    ],
    kamen: [
      { name: "Kamenné dlažby", src: "/images/služby/dlazba.jpg" },
      { name: "Opěrné zdi a zahradní zídky", src: "/images/služby/zidka.jpg" },
      { name: "Vyvýšené záhony a skalky", src: "/images/služby/zahon.jpg" },
      { name: "Různé typy schodišť", src: "/images/IMG-20250807-WA0007.jpg" },
      { name: "Obklady soklů a podezdívek", src: "/images/služby/obklady.jpg" },
      { name: "Parapety a dveřní zárubně", src: "/images/sluzby/parapety.jpg" },
      { name: "Ohniště a grily", src: "/images/sluzby/gril.jpg" },
      { name: "Zahradní posezení", src: "/images/sluzby/posezeni.jpg" },
      { name: "Terasy a pergoly", src: "/images/služby/pergola.jpg" },
    ],
    drevo: [
      { name: "Terasy a mola", src: "/images/služby/terasa.jpg" },
      { name: "Posezení v kombinaci dřevo a kámen", src: "/images/služby/posezeni.jpg" },
    ]
  };

  // --- DATA PRO MATERIÁLY ---
  const materialsData: Record<string, ServiceImage[]> = {
    piskovce: [
      { name: "Zelený Záměl", src: "/images/kameny/zelený záměl.jpg" },
      { name: "Bílý Božanov", src: "/images/kameny/bozanov.jpeg" },
      { name: "Žlutý Kocbeře", src: "/images/kameny/kocbere2.png" },
      { name: "Bíložlutý Vyhnánov", src: "/images/kameny/vyhnánov.jfif" },
      { name: "Červený Javorka", src: "/images/kameny/javorka.jpg" },
      { name: "Šedozelený Dubenec", src: "/images/kameny/Dubenec.jpg" },
      { name: "Šedožlutý Krákorka", src: "/images/kameny/krakorka.jpg" },
    ],
    ruly: [
      { name: "Balkánské ruly", src:  "/images/kameny/rula otmuchow.jpg"},
      { name: "Rula Otmuchow", src:  "/images/kameny/rula.JPG"},
      { name: "Moravská Droba", src: "/images/kameny/droba.jpeg" },
    ],
    zuly: [
      { name: "Žuly", src: "/images/kameny/zula.webp" },
      { name: "Amfibolit", src: "/images/kameny/amfibolit.jpg" },
      { name: "Kvarcit", src: "/images/kameny/Kvarcit.jpg" },
    ]
  };

  return (
    <div className="bg-white min-h-screen font-mono scroll-smooth pt-20 relative">
      
      {/* --- LIGHTBOX (ZVĚTŠOVÁNÍ OBRÁZKŮ) --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-[#9C834D] transition transform hover:scale-110 p-2"
            aria-label="Zavřít"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div 
            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.name} 
              className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
            <p className="text-white text-xl mt-4 font-bold tracking-wide">
              {selectedImage.name}
            </p>
          </div>
        </div>
      )}

      {/* --- HLAVIČKA (HEADER) --- */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center text-[#666666] hover:text-[#9C834D] transition duration-300">
            <svg className="w-10 h-10 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 10.75L12 3l9 7.75v9a1.25 1.25 0 0 1-1.25 1.25h-5.5A1.25 1.25 0 0 1 13 19.5v-4a1 1 0 0 0-2 0v4a1.25 1.25 0 0 1-1.25 1.25h-5.5A1.25 1.25 0 0 1 3 19.75v-9z" />
            </svg>
          </a>

          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-6 text-2xl font-bold font-space-mono">
            {menuItems.map(({ text, id }) => {
              const isContact = text === "KONTAKT";
              return (
                <a key={text} href={`#${id}`} className={"flex items-center px-6 py-2 transition duration-300 " + (isContact ? "bg-[#9C834D] text-white rounded-3xl hover:bg-[#666666]" : "text-[#666666] relative inline-block after:content-[''] after:absolute after:left-1/2 after:-bottom-5 after:w-0 after:h-[2px] after:bg-[#9C834D] after:transition-all after:duration-300 hover:text-[#9C834D] hover:after:w-full hover:after:left-0")}>
                  {text}
                </a>
              );
            })}
          </nav>

          {/* Mobilní tlačítko */}
          <button className="md:hidden text-[#666666]" onClick={() => setIsOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        {/* Mobilní menu */}
        <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 z-50`}>
          <div className="p-4 flex justify-between items-center border-b">
            <div className="text-lg font-bold">Menu</div>
            <button onClick={() => setIsOpen(false)} className="text-[#666666]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <nav className="flex flex-col p-4 gap-4 text-[#666666] font-space-mono font-bold text-lg">
            {menuItems.map(({ text, id }) => (
              <a key={text} href={`#${id}`} onClick={() => setIsOpen(false)} className="hover:text-[#9C834D] transition">{text}</a>
            ))}
          </nav>
        </div>
        {isOpen && <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setIsOpen(false)}></div>}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[94vh] bg-black overflow-hidden">
        <img src={jezirko} alt="Jezírko" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center md:block">
          <div className="mb-8 md:mb-0 md:absolute md:bottom-12 md:left-10 px-4">
            <img src={logo} alt="Logo" className="w-56 md:w-64 h-auto drop-shadow-lg" />
          </div>
          <div className="mx-4 p-6 rounded-2xl bg-black/40 backdrop-blur-sm md:absolute md:top-1/2 md:right-20 md:transform md:-translate-y-[-60px] md:translate-x-[-40px] md:max-w-2xl md:bg-gray-900/20 md:backdrop-blur-0">
            <p className="text-white text-lg leading-relaxed text-center drop-shadow-md">
              Naše firma poskytuje služby zaměřené na úpravu a zvelebování zahrad,
              okolí domů a případně i drobné úpravy domů samotných
              (parapety, vnitřní kamenné obklady, zárubně, obklady podezdívek).
            </p>
          </div>
        </div>
      </section>

      {/* --- SLUŽBY (S MINI GALERIEMI) --- */}
      <section id="služby" className="scroll-mt-28 min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-12 uppercase tracking-wide text-gray-800">
          Služby
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* 1. Sloupec */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
            <MiniServiceGallery 
              images={servicesImages.zahrada} 
              title="ZAHRADA" 
              colorClass="text-green-700" 
              onImageClick={setSelectedImage}
            />
          </div>

          {/* 2. Sloupec */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
             <MiniServiceGallery 
              images={servicesImages.kamen} 
              title="KAMENICKÉ PRÁCE" 
              colorClass="text-gray-700"
              onImageClick={setSelectedImage} 
            />
          </div>

          {/* 3. Sloupec */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
             <MiniServiceGallery 
              images={servicesImages.drevo} 
              title="DŘEVO V ZAHRADĚ" 
              colorClass="text-amber-700"
              onImageClick={setSelectedImage} 
            />
          </div>
        </div>
      </section>

      {/* --- MATERIÁLY --- */}
      <section id="materiály" className="scroll-mt-14 min-h-screen flex flex-col items-center justify-center bg-white px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 uppercase tracking-wide text-gray-800">Materiály</h2>
        <p className="max-w-3xl text-gray-700 text-lg leading-relaxed mb-12">
          Pro realizace zahrad a zahradních doplňků používáme různé materiály. 
          <br /> Materiál je volen pečlivě podle regionu a podle účelu použití, 
          aby dokonale zapadl do rázu vaší zahrady.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* Pískovce */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col border border-gray-100 items-center">
            <h3 className="text-xl font-bold mb-4 text-amber-600 border-b pb-2 w-full">PÍSKOVCE</h3>
            <div className="grid grid-cols-2 gap-3 w-full">
              {materialsData.piskovce.map((item, index) => (
                <div key={index} onClick={() => setSelectedImage(item)} className="relative group overflow-hidden rounded-md shadow-sm aspect-square cursor-zoom-in">
                  <img src={item.src} alt={item.name} className="object-cover w-full h-full transform group-hover:scale-110 transition duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
                    <p className="text-white text-xs font-bold uppercase">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Ruly */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col border border-gray-100 items-center">
            <h3 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2 w-full">RULY A DROBA</h3>
            <div className="grid grid-cols-2 gap-3 w-full">
              {materialsData.ruly.map((item, index) => (
                <div key={index} onClick={() => setSelectedImage(item)} className="relative group overflow-hidden rounded-md shadow-sm aspect-square cursor-zoom-in">
                  <img src={item.src} alt={item.name} className="object-cover w-full h-full transform group-hover:scale-110 transition duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
                    <p className="text-white text-xs font-bold uppercase">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Žuly */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col border border-gray-100 items-center">
            <h3 className="text-xl font-bold mb-4 text-slate-800 border-b pb-2 w-full">TVRDÉ KAMENY</h3>
            <div className="grid grid-cols-2 gap-3 w-full">
              {materialsData.zuly.map((item, index) => (
                <div key={index} onClick={() => setSelectedImage(item)} className="relative group overflow-hidden rounded-md shadow-sm aspect-square cursor-zoom-in">
                  <img src={item.src} alt={item.name} className="object-cover w-full h-full transform group-hover:scale-110 transition duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
                    <p className="text-white text-xs font-bold uppercase">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- VELKÁ GALERIE --- */}
      <section id="galerie" className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
        <h2 className="text-3xl font-bold mb-8 mt-16">GALERIE</h2>
        <div className="w-full max-w-4xl rounded-lg overflow-hidden">
          <EmblaGallery />
        </div>
      </section>

      {/* --- O NÁS --- */}
      <section id="o_nás" className="min-h-screen bg-white px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">O NÁS</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 py-12">
          <div className="max-w-md text-center ">
            <p className="text-lg leading-relaxed">
              Naše rodinná firma tvoří kamenná návrhy a realizace již déle než 10 let. Pečlivost a profesionální přístup jsou pro nás samozřejmostí, protože věříme, že jen tak vznikají skutečně krásné a trvanlivé výsledky. Rádi pomúžeme i Vám proměnit vaše představy ve skutečnost.
            </p>
          </div>
        </div>
      </section>

      {/* --- PATIČKA --- */}
      <footer id="kontakt" className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-center gap-12 md:gap-32 text-center text-[#666666] text-base">
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Kontakt</h3>
            <p className="mb-1">+420 739 820 025</p>
            <p>kamendomu@gmail.com</p>
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

      {/* --- ŠIPKA NAHORU --- */}
      <button onClick={scrollToTop} className="fixed bottom-6 right-6 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition duration-300 shadow-lg z-50" aria-label="Scroll to top">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
      </button>
    </div>
  );
}