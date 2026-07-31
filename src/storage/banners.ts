export interface Banner {
  id: string
  title: string
  photoUrl: string
  duration: number
  actionType: 'market' | 'leaders' | 'tasks' | 'profile' | 'link'
  linkUrl?: string
}

const DEFAULT_BANNERS: Banner[] = [
  {
    id: '1',
    title: 'Стартовый Баннер',
    photoUrl: '/logos/cardslogo.png',
    duration: 7,
    actionType: 'tasks'
  }
]

export const getStoredBanners = (): Banner[] => {
  if (typeof window === 'undefined') return DEFAULT_BANNERS
  const data = localStorage.getItem('sw_banners')
  if (!data) {
    localStorage.setItem('sw_banners', JSON.stringify(DEFAULT_BANNERS))
    return DEFAULT_BANNERS
  }
  try {
    return JSON.parse(data)
  } catch (e) {
    return DEFAULT_BANNERS
  }
}

export const addStoredBanner = (banner: Banner) => {
  const list = getStoredBanners()
  const updated = [banner, ...list]
  localStorage.setItem('sw_banners', JSON.stringify(updated))
  return updated
}

export const removeStoredBanner = (id: string) => {
  const list = getStoredBanners()
  const updated = list.filter(b => b.id !== id)
  localStorage.setItem('sw_banners', JSON.stringify(updated))
  return updated
}
