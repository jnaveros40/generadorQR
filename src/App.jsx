import { useState } from 'react'
import QRCode from 'qrcode'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('')

  const generateQRCode = async () => {
    if (!url) return;
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000ff',
          light: '#ffffffff'
        }
      });
      setQrCodeDataUrl(dataUrl);
    } catch (err) {
      console.error(err);
    }
  }

  const handleDownload = () => {
    if (!qrCodeDataUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="container">
      <header>
        <h1>Generador de Código QR</h1>
        <p>Ingresa una URL y genera un código QR para descargar en formato PNG</p>
      </header>

      <main>
        <div className="input-group">
          <input
            type="text"
            placeholder="Ingresa la URL aquí (ej: https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generateQRCode()}
          />
          <button onClick={generateQRCode} className="generate-btn">
            Generar QR
          </button>
        </div>

        {qrCodeDataUrl && (
          <div className="qr-result">
            <div className="qr-image-container">
              <img src={qrCodeDataUrl} alt="Código QR Generado" />
            </div>
            <button onClick={handleDownload} className="download-btn">
              Descargar PNG
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
