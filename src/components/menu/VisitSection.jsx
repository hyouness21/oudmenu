const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.4079734021097!2d35.51449268927715!3d33.854875987490395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17b399b4e389%3A0x131be1556bbabbd9!2sOud%20lb!5e0!3m2!1sen!2slb!4v1793196202723!5m2!1sen!2slb'

const NavArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 11l19-9-9 19-2-8-8-2z" fill="#C9A84C" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5C7249" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#5C7249" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5C7249" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="#5C7249" stroke="none" />
  </svg>
)

const Divider = () => (
  <svg width="14" height="56" viewBox="0 0 14 56" fill="none" aria-hidden="true" style={{ flexShrink: 0, margin: '0 6px' }}>
    <line x1="7" y1="0" x2="7" y2="22" stroke="#C9A84C" strokeWidth="1.5" />
    <polygon points="7,22 12,27 7,32 2,27" fill="#C9A84C" />
    <line x1="7" y1="32" x2="7" y2="56" stroke="#C9A84C" strokeWidth="1.5" />
  </svg>
)

const ContactButton = ({ href, tel, label, children }) => (
  <a
    href={href}
    {...(tel ? {} : { target: '_blank', rel: 'noopener' })}
    aria-label={label}
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textDecoration: 'none' }}
  >
    <div style={{
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: '#FFFAF0',
      border: '1.5px solid #C9A84C',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {children}
    </div>
    <span style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: 13, color: '#2D1E14' }}>
      {label}
    </span>
  </a>
)

export default function VisitSection() {
  return (
    <section id="visit-section" style={{ background: '#CED8C7', paddingBottom: 90 }}>

      {/* Rug band strip */}
      <div style={{
        height: 14,
        backgroundImage: 'url("/rug-band.png")',
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'auto 14px',
        backgroundPosition: 'center',
      }} />

      {/* Heading */}
      <div style={{ textAlign: 'center', padding: '26px 20px 0' }}>
        <p style={{
          fontSize: 11,
          letterSpacing: '3px',
          color: '#5F6430',
          textTransform: 'uppercase',
          fontFamily: 'Lato, sans-serif',
          margin: '0 0 8px',
        }}>
          VISIT
        </p>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 'bold',
          fontSize: 30,
          color: '#2D1E14',
          margin: 0,
          lineHeight: 1.3,
        }}>
          Come sit <em style={{ color: '#5C7249', fontStyle: 'italic' }}>with us.</em>
        </h2>
      </div>

      {/* Arch map wrapper — paddingBottom makes room for the card hanging below */}
      <div style={{
        margin: '26px auto 0',
        maxWidth: 380,
        width: 'calc(100% - 44px)',
        position: 'relative',
        paddingBottom: 50,
      }}>

        {/* Outline arch — decorative depth layer, shifted 12px right + 12px down */}
        <div style={{
          position: 'absolute',
          left: 12,
          top: 12,
          width: '100%',
          height: 420,
          borderRadius: '999px 999px 16px 16px',
          border: '1.5px solid #C9A84C',
          background: 'transparent',
          zIndex: 0,
          pointerEvents: 'none',
        }} />

        {/* Arch frame */}
        <div style={{
          position: 'relative',
          height: 420,
          background: '#FFFAF0',
          padding: 8,
          borderRadius: '999px 999px 16px 16px',
          boxShadow: '0 16px 32px rgba(0,0,0,.2)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>

          {/* Map area — overflow:hidden clips the iframe's top toolbar */}
          <div style={{
            flex: 1,
            borderRadius: '999px 999px 8px 8px',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <iframe
              title="Oud location"
              src={MAP_SRC}
              style={{
                position: 'absolute',
                top: -70,
                left: 0,
                width: '100%',
                height: 'calc(100% + 70px)',
                border: 0,
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          {/* Cream base — keeps Google attribution visible; card overlaps this */}
          <div style={{ height: 58, flexShrink: 0 }} />
        </div>

        {/* Info card — overlaps cream base, hangs ~30px below arch frame */}
        <div style={{
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 20,
          zIndex: 2,
          background: '#5C7249',
          borderRadius: 18,
          padding: 6,
          boxShadow: '0 8px 20px rgba(0,0,0,.18)',
        }}>
          <div style={{ background: '#FFFAF0', borderRadius: 13, padding: 5 }}>
            <div style={{
              border: '1.5px solid #C9A84C',
              borderRadius: 9,
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
            }}>

              {/* Left: location */}
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: 10,
                  letterSpacing: '2px',
                  color: '#5F6430',
                  textTransform: 'uppercase',
                  fontFamily: 'Lato, sans-serif',
                  margin: '0 0 4px',
                }}>
                  FIND US
                </p>
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 16,
                  color: '#2D1E14',
                  margin: '0 0 3px',
                  lineHeight: 1.3,
                }}>
                  Hay Madi
                </p>
                <p style={{
                  fontFamily: 'Lato, sans-serif',
                  fontSize: 12,
                  color: '#5C7249',
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  Beside Khaymat Mouwad
                </p>
              </div>

              {/* Middle: gold divider with diamond */}
              <Divider />

              {/* Right: hours */}
              <div style={{ flex: 1, textAlign: 'right' }}>
                <p style={{
                  fontSize: 10,
                  letterSpacing: '2px',
                  color: '#5F6430',
                  textTransform: 'uppercase',
                  fontFamily: 'Lato, sans-serif',
                  margin: '0 0 4px',
                }}>
                  OPEN
                </p>
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 16,
                  color: '#2D1E14',
                  margin: '0 0 3px',
                  lineHeight: 1.3,
                }}>
                  Daily
                </p>
                <p style={{
                  fontFamily: 'Lato, sans-serif',
                  fontSize: 12,
                  color: '#5C7249',
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  10 am – 2 am
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Directions button */}
      <div style={{ margin: '22px auto 0', maxWidth: 380, width: 'calc(100% - 44px)' }}>
        <a
          href="https://maps.app.goo.gl/oMJboQstgNzDoMyP9"
          target="_blank"
          rel="noopener"
          aria-label="Get directions to Oud"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            minHeight: 56,
            width: '100%',
            background: '#2D1E14',
            color: '#FFFAF0',
            fontFamily: 'Lato, sans-serif',
            fontWeight: 700,
            fontSize: 16,
            borderRadius: 999,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(0,0,0,.22)',
          }}
        >
          <NavArrow />
          Get Directions
        </a>
      </div>

      {/* Contact row */}
      <div style={{
        margin: '24px auto 0',
        maxWidth: 300,
        width: 'calc(100% - 44px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <ContactButton href="https://wa.me/9613168644" label="WhatsApp">
          <WhatsAppIcon />
        </ContactButton>
        <ContactButton href="tel:+9613168644" tel label="Call">
          <PhoneIcon />
        </ContactButton>
        <ContactButton href="https://www.instagram.com/oudlb_" label="Instagram">
          <InstagramIcon />
        </ContactButton>
      </div>

    </section>
  )
}
