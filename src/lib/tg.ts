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

export const triggerHaptic = (style: 'light' | 'medium' | 'heavy' = 'light') => {
  const tg = getTg()
  if (tg && tg.HapticFeedback) {
    tg.HapticFeedback.impactOccurred(style)
  }
}

export const getUserData = () => {
  const tg = getTg()
  if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    return tg.initDataUnsafe.user
  }
  return {
    id: 7777777,
    first_name: 'Игрок',
    username: 'jedi_player',
    photo_url: ''
  }
}
