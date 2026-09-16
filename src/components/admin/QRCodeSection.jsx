import { useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

const MENU_URL = window.location.origin + '/'

export default function QRCodeSection() {
  const canvasRef = useRef(null)

  const handleDownload = () => {
    const canvas = canvasRef.current?.querySelector('canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'oud-menu-qr.png'
    a.click()
  }

  return (
    <div className="p-6 max-w-sm">
      <h2 className="font-playfair text-brown text-2xl font-bold mb-2">QR Code</h2>
      <p className="text-text-muted text-sm mb-6">Scan this QR code to open the menu. Print and place it in your coffee shop.</p>

      <div className="flex flex-col items-center gap-6">
        <div
          ref={canvasRef}
          className="bg-white p-5 rounded-3xl shadow-lg border border-surface-2"
        >
          <QRCodeCanvas
            value={MENU_URL}
            size={220}
            bgColor="#ffffff"
            fgColor="#2D1E14"
            level="H"
            imageSettings={{
              src: '/oud-logo.png',
              height: 40,
              width: 60,
              excavate: true,
            }}
          />
        </div>

        <div className="text-center">
          <p className="text-text-muted text-xs font-mono break-all">{MENU_URL}</p>
        </div>

        <button onClick={handleDownload} className="btn-primary w-full">
          ↓ Download QR Code
        </button>
      </div>
    </div>
  )
}
