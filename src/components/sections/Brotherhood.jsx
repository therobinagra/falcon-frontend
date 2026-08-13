import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, X, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import FadeIn from '../ui/FadeIn'

const videos = [
  {
    id: 'r1',
    name: 'Rohit S.',
    role: 'Verified Brother · Agra',
    poster: '/images/video-1.jpg',
    srcs: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
      'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
      'https://download.samplelib.com/mp4/sample-5s.mp4',
    ],
  },
  {
    id: 'r2',
    name: 'Aman V.',
    role: 'Verified Brother · Delhi',
    poster: '/images/video-2.jpg',
    srcs: [
      'https://www.w3schools.com/html/movie.mp4',
      'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
      'https://download.samplelib.com/mp4/sample-5s.mp4',
    ],
  },
  {
    id: 'r3',
    name: 'Karan M.',
    role: 'Verified Brother · Bengaluru',
    poster: '/images/video-3.jpg',
    srcs: [
      'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
      'https://www.w3schools.com/html/mov_bbb.mp4',
      'https://download.samplelib.com/mp4/sample-5s.mp4',
    ],
  },
  {
    id: 'r4',
    name: 'Vikram S.',
    role: 'Verified Brother · Jaipur',
    poster: '/images/video-4.jpg',
    srcs: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
      'https://download.samplelib.com/mp4/sample-5s.mp4',
    ],
  },
  {
    id: 'r5',
    name: 'Arjun N.',
    role: 'Verified Brother · Kochi',
    poster: '/images/video-5.jpg',
    srcs: [
      'https://download.samplelib.com/mp4/sample-5s.mp4',
      'https://www.w3schools.com/html/mov_bbb.mp4',
    ],
  },
]

function Brotherhood() {
  const [active, setActive] = useState(null)
  const trackRef = useRef(null)

  const scroll = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[data-card]')
    const amount = (card?.clientWidth ?? 320) + 20
    track.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            JOIN OUR BOLD BROTHERHOOD
          </h2>
        </FadeIn>

        <div className="group/scroll relative mt-14">
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll videos left"
            className="absolute left-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-accent shadow-lux transition hover:bg-accent hover:text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={() => scroll(1)}
            aria-label="Scroll videos right"
            className="absolute right-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-accent shadow-lux transition hover:bg-accent hover:text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            ref={trackRef}
            className="flex snap-x gap-5 overflow-x-auto scroll-smooth px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {videos.map((video, i) => (
              <FadeIn key={video.id} delay={0.07 * i}>
                <button
                  data-card
                  onClick={() => setActive(video)}
                  className="group relative block w-[280px] shrink-0 snap-start overflow-hidden rounded-[1.75rem] border border-line bg-surface text-left shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lux sm:w-[300px]"
                  aria-label={`Watch ${video.name}'s story`}
                >
                  <div className="relative h-80 overflow-hidden sm:h-[340px]">
                    <img
                      src={video.poster}
                      alt={`${video.name} video`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

                    <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-accent shadow-2xl transition duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                      <Play className="ml-0.5 h-6 w-6 fill-current" />
                    </span>

                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-accent backdrop-blur">
                      <ShieldCheck className="h-3 w-3" />
                      Verified
                    </span>
                  </div>

                  <div className="flex items-center gap-4 p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-amber-600 text-sm font-extrabold text-white">
                      {video.name.split(' ').map((w) => w[0]).join('')}
                    </span>
                    <div>
                      <p className="font-bold text-ink">{video.name}</p>
                      <p className="text-xs text-mist">{video.role}</p>
                    </div>
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Video from ${active.name}`}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="w-full max-w-3xl overflow-hidden rounded-3xl bg-ink shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-amber-600 text-xs font-extrabold text-white">
                    {active.name.split(' ').map((w) => w[0]).join('')}
                  </span>
                  <div>
                    <p className="font-bold text-white">{active.name}</p>
                    <p className="text-xs text-white/60">{active.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close video"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <video
                key={active.id}
                src={active.srcs[0]}
                controls
                autoPlay
                playsInline
                poster={active.poster}
                className="aspect-video w-full bg-black object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Brotherhood
