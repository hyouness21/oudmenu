import { motion } from 'framer-motion'
import { useMenu } from '../../contexts/MenuContext'
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

export default function AboutSection({ afterAbout }) {
  const { settings } = useMenu()
  const aboutPhotos = settings?.aboutPhotos ?? []
  const [bigPhoto, roundPhoto, smallPhoto] = aboutPhotos
  const hasPhotos = aboutPhotos.some((p) => p?.imageUrl)

  return (
    <>
      {/* ── Life at Oud ── */}
      <section id="about-section" style={{ background: '#CED8C7' }}>

        {/* Rug band strip */}
        <div style={{
          height: 14,
          backgroundImage: 'url("/rug-band.png")',
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 14px',
          backgroundPosition: 'center',
        }} />

        {/* Header */}
        <div style={{ textAlign: 'center', padding: '32px 16px 0' }}>
          <p style={{
            fontSize: 11,
            letterSpacing: '3px',
            color: '#5F6430',
            textTransform: 'uppercase',
            fontFamily: 'Lato, sans-serif',
            margin: '0 0 8px',
          }}>
            THE VIBE
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 'bold',
            fontSize: 28,
            color: '#2D1E14',
            margin: 0,
            lineHeight: 1.3,
          }}>
            Life <em style={{ color: '#5C7249', fontStyle: 'italic' }}>at Oud</em>
          </h2>
        </div>

        {/* Gallery */}
        <div style={{
            margin: '28px auto 0',
            maxWidth: 380,
            width: 'calc(100% - 32px)',
            aspectRatio: '358 / 430',
            position: 'relative',
          }}>

            {/* Outline arch — depth layer behind big arch */}
            <div style={{
              position: 'absolute',
              left: 12,
              top: 12,
              width: '54.7%',
              height: '92%',
              borderRadius: '999px 999px 12px 12px',
              border: '1.5px solid #C9A84C',
              background: 'transparent',
              zIndex: 0,
            }} />

            {/* Big arch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '54.7%',
                height: '92%',
                background: '#FFFAF0',
                padding: 7,
                borderRadius: '999px 999px 12px 12px',
                boxShadow: '0 14px 28px rgba(0,0,0,.18)',
                zIndex: 1,
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '992px 992px 5px 5px',
                overflow: 'hidden',
                lineHeight: 0,
              }}>
                {bigPhoto?.imageUrl ? (
                  <img
                    src={bigPhoto.imageUrl}
                    alt={bigPhoto.label || ''}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: `${bigPhoto.imagePosition?.x ?? 50}% ${bigPhoto.imagePosition?.y ?? 50}%`,
                      display: 'block',
                    }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#A8BF97' }} />
                )}
              </div>
              <div style={{
                position: 'absolute',
                bottom: 14,
                left: 10,
                background: '#FFFAF0',
                color: '#5F6430',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontSize: 14,
                padding: '3px 10px',
                borderRadius: 999,
                boxShadow: '0 2px 8px rgba(0,0,0,.15)',
              }}>
                {bigPhoto?.label || 'Evenings'}
              </div>
            </motion.div>

            {/* Round photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                position: 'absolute',
                left: '60.3%',
                top: '4.2%',
                width: '39.1%',
                aspectRatio: '1',
                background: '#FFFAF0',
                padding: 6,
                borderRadius: '50%',
                boxShadow: '0 8px 20px rgba(0,0,0,.16)',
                zIndex: 2,
              }}
            >
              <div style={{
                border: '1.5px solid #C9A84C',
                borderRadius: '50%',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                lineHeight: 0,
              }}>
                {roundPhoto?.imageUrl ? (
                  <img
                    src={roundPhoto.imageUrl}
                    alt={roundPhoto.label || ''}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: `${roundPhoto.imagePosition?.x ?? 50}% ${roundPhoto.imagePosition?.y ?? 50}%`,
                      display: 'block',
                      borderRadius: '50%',
                    }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#A8BF97', borderRadius: '50%' }} />
                )}
              </div>
              <div style={{
                position: 'absolute',
                bottom: 4,
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#5C7249',
                color: '#fff',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontSize: 13,
                padding: '2px 10px',
                borderRadius: 999,
                whiteSpace: 'nowrap',
                zIndex: 1,
              }}>
                {roundPhoto?.label || 'First coffee'}
              </div>
            </motion.div>

            {/* Eight-point star */}
            <div style={{
              position: 'absolute',
              left: '75.4%',
              top: '43%',
              zIndex: 3,
            }}>
              <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                <polygon
                  points="18,4 20.3,12.5 27.9,8.1 23.5,15.7 32,18 23.5,20.3 27.9,27.9 20.3,23.5 18,32 15.7,23.5 8.1,27.9 12.5,20.3 4,18 12.5,15.7 8.1,8.1 15.7,12.5"
                  stroke="#C9A84C"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Small arch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                position: 'absolute',
                left: '60.3%',
                top: '54%',
                width: '39.1%',
                height: '44%',
                background: '#FFFAF0',
                padding: 6,
                borderRadius: '999px 999px 10px 10px',
                boxShadow: '0 8px 20px rgba(0,0,0,.15)',
                zIndex: 2,
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '993px 993px 4px 4px',
                overflow: 'hidden',
                lineHeight: 0,
              }}>
                {smallPhoto?.imageUrl ? (
                  <img
                    src={smallPhoto.imageUrl}
                    alt={smallPhoto.label || ''}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: `${smallPhoto.imagePosition?.x ?? 50}% ${smallPhoto.imagePosition?.y ?? 50}%`,
                      display: 'block',
                    }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#A8BF97' }} />
                )}
              </div>
              <div style={{
                position: 'absolute',
                bottom: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#FFFAF0',
                color: '#5F6430',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontSize: 13,
                padding: '2px 10px',
                borderRadius: 999,
                boxShadow: '0 2px 6px rgba(0,0,0,.12)',
                whiteSpace: 'nowrap',
                zIndex: 1,
              }}>
                {smallPhoto?.label || 'Shisha nights'}
              </div>
            </motion.div>
          </div>

        {/* Gold divider */}
        <div style={{
          margin: '30px 24px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ flex: 1, height: 1, background: '#C9A84C' }} />
          <div style={{ width: 8, height: 8, background: '#C9A84C', transform: 'rotate(45deg)', flexShrink: 0 }} />
          <div style={{ flex: 1, height: 1, background: '#C9A84C' }} />
        </div>

        {/* Story */}
        <div style={{ textAlign: 'center', padding: '28px 28px 40px' }}>
          <p style={{
            fontSize: 11,
            letterSpacing: '3px',
            color: '#5F6430',
            textTransform: 'uppercase',
            fontFamily: 'Lato, sans-serif',
            margin: '0 0 12px',
          }}>
            OUR STORY
          </p>
          <h3 style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 'bold',
            fontSize: 26,
            color: '#2D1E14',
            margin: '0 0 20px',
            lineHeight: 1.35,
          }}>
            What started as a dream<br />
            <em style={{ color: '#5C7249' }}>is finally here.</em>
          </h3>
          <p style={{
            fontSize: 15,
            lineHeight: 1.75,
            color: '#3D2B1F',
            fontFamily: 'Lato, sans-serif',
            margin: '0 0 28px',
            textAlign: 'center',
          }}>
            We chose Dahye because of its lively energy and the people who make it feel like home.
            We wanted Oud to be a place where you can unwind, enjoy good food, meet your people,
            and simply feel comfortable.
          </p>
          <img
            src="/oud-logoo.png"
            alt="Oud"
            style={{ height: 46, margin: '0 auto', display: 'block' }}
          />
        </div>
      </section>

      {afterAbout}

      {/* ── Footer ── */}
      <footer style={{ background: '#879E76' }}>

        {/* Rug band strip */}
        <div style={{
          height: 16,
          backgroundImage: 'url("/rug-band.png")',
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 16px',
          backgroundPosition: 'center',
        }} />

        {/* Logo + tagline */}
        <div style={{ textAlign: 'center', paddingTop: 30 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Logo variant="gold" className="w-[6.5rem]" />
          </div>
          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 20,
            color: '#fff',
            margin: '10px 0 0',
            lineHeight: 1.3,
          }}>
            Beirut Coffee Lounge
          </p>
        </div>

        {/* Gold divider */}
        <div style={{ margin: '22px 24px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 1, background: '#C9A84C' }} />
          <div style={{ width: 8, height: 8, background: '#C9A84C', transform: 'rotate(45deg)', flexShrink: 0 }} />
          <div style={{ flex: 1, height: 1, background: '#C9A84C' }} />
        </div>

        {/* Quick links */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '4px 18px',
          marginTop: 16,
        }}>
          {[
            { label: 'MENU', id: 'menu-section' },
            { label: 'ABOUT', id: 'about-section' },
            { label: 'VISIT', id: 'visit-section' },
          ].map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '1.5px',
                color: '#fff',
                textDecoration: 'none',
                minHeight: 36,
                display: 'flex',
                alignItems: 'center',
                fontFamily: 'Lato, sans-serif',
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Social buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 18 }}>
          {[
            { href: 'https://www.instagram.com/oudlb_?vrfl=cGQ3NGFkbTN3bnB2', label: 'Instagram', icon: <InstagramIcon /> },
            { href: 'https://www.facebook.com/share/1KtRvfahko/?mibextid=wwXIfr', label: 'Facebook', icon: <FacebookIcon /> },
            { href: 'https://www.tiktok.com/@rolaowxy9dc?_r=1&_t=ZS-9APR14Dl3ED', label: 'TikTok', icon: <TikTokIcon /> },
            {
              href: 'https://wa.me/9613168644', label: 'WhatsApp',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              ),
            },
          ].map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener"
              aria-label={label}
              style={{
                width: 46,
                height: 46,
                borderRadius: '50%',
                background: '#FFFAF0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                color: '#5C7249',
                flexShrink: 0,
              }}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Back to top */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              minHeight: 40,
              padding: '0 20px',
              border: '1.5px solid #FFFAF0',
              borderRadius: 999,
              background: 'transparent',
              color: '#fff',
              fontFamily: 'Lato, sans-serif',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 10V2M2 6l4-4 4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to top
          </button>
        </div>

        {/* Bottom copyright strip */}
        <div style={{
          marginTop: 28,
          background: '#5C7249',
          padding: '14px 20px 98px',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: 12,
            letterSpacing: '2px',
            color: '#fff',
            fontFamily: 'Lato, sans-serif',
            margin: 0,
          }}>
            © {new Date().getFullYear()} OUD · عود
          </p>
        </div>

      </footer>
    </>
  )
}
