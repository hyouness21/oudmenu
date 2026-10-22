import { useState, useRef, useEffect } from 'react'

export default function FloatingMusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio('/music/small promo.mp3')
    audio.loop = true
    audioRef.current = audio
    return () => { audio.pause() }
  }, [])

  const toggle = () => {
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
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
