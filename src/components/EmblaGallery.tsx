import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState, useCallback, useRef } from 'react' // Přidán useRef
import galleryData from '../data/gallery.json'
import FullscreenModal from './FullscreenModal'
import type { EmblaOptionsType } from 'embla-carousel'

type Image = {
  src: string
  alt: string
}

interface EmblaGalleryProps {
  onModalToggle?: (isOpen: boolean) => void
}

export default function EmblaGallery({ onModalToggle }: EmblaGalleryProps) {
  // 1. Vytvoříme si pevný odkaz na Autoplay s pomalejším časem (např. 4000ms = 4 vteřiny)
  // stopOnInteraction: false zajistí, že animace poběží pořád stejně plynule a nenechá se rozhodit okolím
  const autoplayRef = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: false })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      duration: 30, // 2. Tímto zpomalíme samotný posun (přechod) z jedné fotky na druhou (výchozí je 25)
    } as EmblaOptionsType,
    [autoplayRef.current]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [images] = useState<Image[]>(galleryData)

  // 3. Upravená funkce pro otevírání/zavírání modalu, která ovládá i Autoplay
  const toggleModal = (open: boolean) => {
    setIsModalOpen(open)
    if (onModalToggle) {
      onModalToggle(open)
    }

    // Pokud se otevře fullscreen, vypneme autoplay. Když se zavře, zase ho zapneme.
    if (open) {
      autoplayRef.current.stop()
    } else {
      autoplayRef.current.play()
    }
  }

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', onSelect)
      onSelect()
    }
  }, [emblaApi, onSelect])

  const onPrev = () => {
    const newIndex = selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
    setSelectedIndex(newIndex)
    emblaApi?.scrollTo(newIndex)
  }

  const onNext = () => {
    const newIndex = selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
    setSelectedIndex(newIndex)
    emblaApi?.scrollTo(newIndex)
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center">
      {/* Hlavní carousel */}
      <div className="relative w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((img, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] px-2 cursor-pointer flex justify-center"
              onClick={() => toggleModal(true)} // Voláme novou funkci při otevření
            >
              <img
                src={img.src}
                alt={img.alt}
                className="max-h-[60vh] object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Šipky uvnitř carouselu */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition duration-300 shadow-lg z-10"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition duration-300 shadow-lg z-10"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Náhledy (Thumbnails) */}
      <div className="flex justify-start gap-2 mt-4 w-full px-4 overflow-x-auto">
        {images.map((img, index) => (
          <button
            key={index}
            className={`flex-shrink-0 w-24 h-16 overflow-hidden border-2 rounded-lg ${
              index === selectedIndex ? 'border-blue-500' : 'border-transparent'
            } ${index === 0 ? 'ml-0.5' : ''}`}
            onClick={() => scrollTo(index)}
            aria-label={`Thumbnail ${index + 1}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover rounded-lg"
              draggable={false}
            />
          </button>
        ))}
      </div>

      {/* Fullscreen modal */}
      {isModalOpen && (
        <FullscreenModal
          src={images[selectedIndex].src}
          alt={images[selectedIndex].alt}
          onClose={() => toggleModal(false)} // Voláme novou funkci při zavření
          onPrev={onPrev}
          onNext={onNext}
        />
      )}
    </div>
  )
}