import Logo from '../shared/Logo'

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.38a8.19 8.19 0 0 0 4.79 1.52V7.45a4.85 4.85 0 0 1-1.02-.76z" />
  </svg>
)

export default function AboutSection({ lang }) {
  return (
    <>
      {/* ── About ── */}
      <section className="bg-[#1A0D06] pt-16 pb-12 px-6">
        {/* Gold top rule */}
        <div className="flex items-center gap-3 max-w-xl mx-auto mb-10">
          <div className="flex-1 h-px bg-gold/20" />
          <Logo variant="white" className="w-24" />
          <div className="flex-1 h-px bg-gold/20" />
        </div>

        {/* Heading */}
        <h2 className={`text-center text-gold tracking-[0.2em] uppercase text-xs mb-6 font-lato ${lang === 'ar' ? 'font-cairo tracking-normal' : ''}`}>
          {lang === 'ar' ? 'من نحن' : 'About Us'}
        </h2>

        {/* Description */}
        <div className="max-w-lg mx-auto text-center mb-10">
          {lang === 'ar' ? (
            <p className="text-white/60 text-sm leading-7 font-cairo" dir="rtl">
              عود أكثر من مجرد مقهى — إنه مكانٌ تُحكى فيه القصص على أنغام رائحة القهوة.
              مستوحى من دفء الضيافة العربية الأصيلة، نقدم لكم تجربة مشروبات استثنائية
              في أجواء صُممت خصيصاً للراحة واللقاء.
            </p>
          ) : (
            <p className="text-white/60 text-sm leading-7 font-lato">
              Oud is more than a coffee shop — it's a place where every cup tells a story.
              Inspired by the warmth of authentic Arabic hospitality, we craft exceptional
              beverages in a space designed for comfort and genuine connection.
            </p>
          )}
        </div>

        {/* Info grid */}
        <div className="max-w-xl mx-auto grid grid-cols-3 gap-4 text-center">
          {/* Hours */}
          <div>
            <p className="text-gold text-xs tracking-widest uppercase font-lato mb-3">
              {lang === 'ar' ? 'أوقات العمل' : 'Hours'}
            </p>
            <p className="text-white/50 text-xs leading-5 font-lato">
              {lang === 'ar' ? (
                <>الاثنين – الجمعة<br />٨ص – ١١م<br />السبت – الأحد<br />٩ص – ١٢م</>
              ) : (
                <>Mon – Fri<br />8am – 11pm<br />Sat – Sun<br />9am – 12am</>
              )}
            </p>
          </div>

          {/* Location */}
          <div>
            <p className="text-gold text-xs tracking-widest uppercase font-lato mb-3">
              {lang === 'ar' ? 'الموقع' : 'Location'}
            </p>
            <p className="text-white/50 text-xs leading-5 font-lato">
              {lang === 'ar' ? (
                <>لبنان، حي معد<br />بجانب خيمة مواد</>
              ) : (
                <>Lebanon, Hay Made<br />Beside Khaymat Mouwad</>
              )}
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-gold text-xs tracking-widest uppercase font-lato mb-3">
              {lang === 'ar' ? 'تواصل معنا' : 'Contact'}
            </p>
            <a
              href="tel:+81874651"
              className="text-white/50 text-xs leading-5 font-lato block hover:text-gold transition-colors"
            >
              +81 874 651
            </a>
            <a
              href="https://wa.me/81874651"
              className="text-gold/70 text-xs leading-5 font-lato block mt-1 hover:text-gold transition-colors"
            >
              WhatsApp ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#120C05] py-8 px-6 text-center">
        {/* Social icons */}
        <div className="flex justify-center gap-6 mb-5">
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

        <div className="h-px bg-white/5 max-w-xs mx-auto mb-5" />

        <p className="text-white/20 text-xs font-lato tracking-widest uppercase">
          © {new Date().getFullYear()} Oud · عود
        </p>
      </footer>
    </>
  )
}
