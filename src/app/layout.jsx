import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'sw cardsbot',
  description: 'Telegram Mini App'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0b0e14'
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <Script 
          src="https://telegram.org/js/telegram-web-app.js" 
          strategy="beforeInteractive" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
