import './globals.css'
import Script from 'next/script'
import { Viewport, Metadata } from 'next'

export const metadata: Metadata = {
  title: 'sw cardsbot',
  description: 'Telegram Mini App'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#000000'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <Script 
          src="https://telegram.org/js/telegram-web-app.js" 
          strategy="beforeInteractive" 
        />
      </head>
      <body>
        <div className="mainlayout">
          <div className="vignette-top" />
          <div className="vignette-bottom" />
          {children}
        </div>
      </body>
    </html>
  )
}
