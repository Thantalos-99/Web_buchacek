

type Props = {
  src: string
  alt: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function FullscreenModal({ src, alt, onClose, onPrev, onNext }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <button
        onClick={e => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-80"
        aria-label="Předchozí obrázek"
      >
        ‹
      </button>

      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
        onClick={e => e.stopPropagation()}
      />

      <button
        onClick={e => { e.stopPropagation(); onNext() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-80"
        aria-label="Další obrázek"
      >
        ›
      </button>

      <button
        onClick={e => { e.stopPropagation(); onClose() }}
        className="absolute top-4 right-4 text-white text-3xl font-bold p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-80"
        aria-label="Zavřít"
      >
        ✕
      </button>
    </div>
  )
}
