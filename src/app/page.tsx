'use client'

import React, { useEffect, useState } from 'react'
import { TopBar } from '../ui/topbar'
import { TabBar } from '../ui/tabbar'
import { BannersCarousel } from '../ui/banners-carousel'
import { AdminPassword } from '../ui/admin-password'
import { AdminDashboard } from '../ui/admin-dashboard'
import { AdminBanners } from '../ui/admin-banners'
import { initTelegramRules, getUserData, getTg } from '../lib/tg'
import { checkIsAdminUser, getAdminState } from '../storage/admin'
import { getStoredBanners, Banner } from '../storage/banners'

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('cards')
  const [adminMode, setAdminMode] = useState<boolean>(false)
  const [adminScreen, setAdminScreen] = useState<'password' | 'dashboard' | 'banners'>('password')
  const [banners, setBanners] = useState<Banner[]>([])

  useEffect(() => {
    initTelegramRules()
    setBanners(getStoredBanners())
  }, [])

  const user = getUserData()

  const handleLogoHold = () => {
    if (!checkIsAdminUser(user.username)) return

    const state = getAdminState()
    if (state.lockUntil && Date.now() < state.lockUntil) {
      alert('Доступ в админку временно заблокирован')
      return
    }

    setAdminMode(true)
    if (state.unlocked) {
      setAdminScreen('dashboard')
    } else {
      setAdminScreen('password')
    }

    const tg = getTg()
    if (tg && tg.BackButton) {
      tg.BackButton.show()
      tg.BackButton.onClick(handleBackFromAdmin)
    }
  }

  const handleBackFromAdmin = () => {
    setAdminMode(false)
    const tg = getTg()
    if (tg && tg.BackButton) {
      tg.BackButton.hide()
    }
  }

  const handleRefreshBanners = () => {
    setBanners(getStoredBanners())
  }

  return (
    <>
      {activeTab === 'cards' && !adminMode && <div className="cards-bg-glow" />}

      <TopBar onAdminHold={handleLogoHold} />

      <main className="pagebody">
        {adminMode ? (
          <>
            {adminScreen === 'password' && (
              <AdminPassword 
                onSuccess={() => setAdminScreen('dashboard')} 
                onCancel={handleBackFromAdmin}
              />
            )}
            {adminScreen === 'dashboard' && (
              <AdminDashboard 
                onOpenBanners={() => setAdminScreen('banners')} 
              />
            )}
            {adminScreen === 'banners' && (
              <AdminBanners 
                onBannerChange={handleRefreshBanners} 
              />
            )}
          </>
        ) : (
          <>
            {activeTab === 'cards' && (
              <BannersCarousel 
                banners={banners} 
                onSelectTab={(tab) => setActiveTab(tab)} 
              />
            )}
            {activeTab === 'market' && <div>Раздел: Рынок</div>}
            {activeTab === 'leaders' && <div>Раздел: Лидеры</div>}
            {activeTab === 'tasks' && <div>Раздел: Задания</div>}
            {activeTab === 'profile' && <div>Раздел: Профиль</div>}
          </>
        )}
      </main>

      <TabBar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        hidden={adminMode}
      />
    </>
  )
}
