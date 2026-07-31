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

export const initTelegramRules = () => {
  const tg = getTg()
  if (!tg) return

  tg.ready()
  tg.expand()

  if (tg.requestFullscreen) {
    try {
      tg.requestFullscreen()
    } catch (e) {}
  }

  if (tg.disableVerticalSwipes) {
    try {
      tg.disableVerticalSwipes()
    } catch (e) {}
  }

  if (tg.enableClosingConfirmation) {
    try {
      tg.enableClosingConfirmation()
    } catch (e) {}
  }
}
