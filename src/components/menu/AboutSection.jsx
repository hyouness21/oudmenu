import Logo from '../shared/Logo'

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.38a8.19 8.19 0 0 0 4.79 1.52V7.45a4.85 4.85 0 0 1-1.02-.76z" />
  </svg>
)

export default function AboutSection() {
  return (
    <>
      {/* ── About Us ── */}
      <section id="about-section" className="bg-[#E1CFB9] py-14 px-6">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-brown/40 text-xs tracking-widest uppercase font-lato mb-1">Our Story</p>
          <h2 className="text-brown text-2xl font-bold mb-4 font-playfair">About Us</h2>
          <div className="h-px bg-brown/20 max-w-[80px] mx-auto mb-6" />
          <p className="text-brown/70 text-sm leading-8 font-lato">
            At Oud, we believe every cup of coffee tells a story. From the warmth of authentic
            Arabic hospitality to every detail of our space, we strive to offer you moments
            that truly matter. Our drinks are crafted with care, and our space is designed
            to be your daily refuge for comfort and connection.
          </p>
          <p className="text-brown/40 text-sm mt-8 italic font-playfair">— The Oud Team</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#120C05] pt-12 pb-8 px-6">
        <div className="max-w-xl mx-auto">

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo variant="white" className="w-20" />
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-3 gap-4 text-center mb-8">
            <div>
              <p className="text-gold text-xs tracking-widest uppercase font-lato mb-3">Hours</p>
              <p className="text-white/50 text-xs leading-5 font-lato">
                Mon – Fri<br />8am – 11pm<br />Sat – Sun<br />9am – 12am
              </p>
            </div>
            <div>
              <p className="text-gold text-xs tracking-widest uppercase font-lato mb-3">Location</p>
              <p className="text-white/50 text-xs leading-5 font-lato">
                Lebanon, Hay Made<br />Beside Khaymat Mouwad
              </p>
            </div>
            <div>
              <p className="text-gold text-xs tracking-widest uppercase font-lato mb-3">Contact</p>
              <a href="tel:+81874651" className="text-white/50 text-xs leading-5 font-lato block hover:text-gold transition-colors">
                +81 874 651
              </a>
              <a href="https://wa.me/81874651" className="text-gold/70 text-xs block mt-1 hover:text-gold transition-colors font-lato">
                WhatsApp ↗
              </a>
            </div>
          </div>

          <div className="h-px bg-white/8 mb-6" />

          {/* Nav links */}
          <div className="flex justify-center gap-6 mb-6">
            <a href="#about-section" className="text-white/40 text-xs font-lato tracking-widest uppercase hover:text-white transition-colors">
              About Us
            </a>
            <span className="text-white/20">·</span>
            <a href="#menu-section" className="text-white/40 text-xs font-lato tracking-widest uppercase hover:text-white transition-colors">
              Menu
            </a>
          </div>

          {/* Social icons */}
          <div className="flex justify-center gap-5 mb-6">
            <a href="#" aria-label="Instagram" className="text-white/30 hover:text-gold transition-colors">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="Facebook" className="text-white/30 hover:text-gold transition-colors">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="TikTok" className="text-white/30 hover:text-gold transition-colors">
              <TikTokIcon />
            </a>
          </div>

          <div className="h-px bg-white/5 mb-5" />

          <p className="text-white/20 text-xs font-lato tracking-widest uppercase text-center">
            © {new Date().getFullYear()} Oud · عود
          </p>

        </div>
      </footer>
    </>
  )
}
