declare global {
  interface Window {
    Telegram?: {
      WebApp?: any
    }
  }
}

export const getTg = () => {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    return window.Telegram.WebApp
  }
  return null
}
