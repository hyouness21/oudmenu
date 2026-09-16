export default function Logo({ variant = 'dark', className = '' }) {
  const src =
    variant === 'gold' ? '/oud-logo-gold.png' :
    variant === 'white' ? '/oud-logo-white.png' :
    variant === 'light' ? '/oud-logo-light.png' :
    '/oud-logo.png'
  return (
    <img
      src={src}
      alt="Oud | عود"
      className={className}
      draggable={false}
    />
  )
}
