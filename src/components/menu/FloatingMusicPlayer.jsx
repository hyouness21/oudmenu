import { useState, useRef, useEffect } from 'react'

export default function FloatingMusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  // The music file (~1.4 MB) is only downloaded the first time someone taps play.
  useEffect(() => () => { audioRef.current?.pause() }, [])

  const toggle = () => {
    if (!audioRef.current) {
      const audio = new Audio('/music/small promo.mp3')
      audio.loop = true
      audioRef.current = audio
    }
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().catch(() => setPlaying(false))
      setPlaying(true)
    }
  }

  return (
    <div className="fixed bottom-6 right-5 z-50">
      <button
        onClick={toggle}
        className="flex items-center justify-center transition-transform active:scale-95"
      >
        <img
          src="/oud-icon-colored.png"
          alt="music"
          className={`w-10 h-10 object-contain ${playing ? 'animate-pulse' : ''}`}
        />
      </button>
    </div>
  )
}
