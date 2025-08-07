import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState, useCallback } from 'react'
import galleryData from '../data/gallery.json'
import FullscreenModal from './FullscreenModal'
import type { EmblaOptionsType } from 'embla-carousel'

type Image = {
  src: string
  alt: string
}

export default function EmblaGallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true } as EmblaOptionsType,
    [Autoplay()]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [images] = useState<Image[]>(galleryData)

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

  // Přidávám funkce pro fullscreen modal
  const onPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    emblaApi?.scrollTo(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)
  }

  const onNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    emblaApi?.scrollTo(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)
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
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="max-h-[60vh] object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Šipky */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-4xl text-gray-700 z-10 bg-white/60 rounded-full px-2"
        >
          ←
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl text-gray-700 z-10 bg-white/60 rounded-full px-2"
        >
          →
        </button>
      </div>

      {/* Náhledy */}
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


      {/* Modal fullscreen */}
      {isModalOpen && (
        <FullscreenModal
          src={images[selectedIndex].src}
          alt={images[selectedIndex].alt}
          onClose={() => setIsModalOpen(false)}
          onPrev={onPrev}
          onNext={onNext}
        />
      )}
    </div>
  )
}
