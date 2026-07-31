'use client'

import React, { useEffect, useState } from 'react'
import { TopBar } from '../ui/topbar'
import { TabBar } from '../ui/tabbar'
import { HomeHeader } from '../ui/main/home-header'
import { initTelegramRules, fetchTgUser } from '../lib/tg'

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('cards')
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    initTelegramRules()
    
    const timer = setTimeout(() => {
      setUser(fetchTgUser())
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {activeTab === 'cards' && <div className="home-top-glow" />}

      <TopBar />
      
      <main className="pagebody">
        {activeTab === 'cards' && <HomeHeader user={user} isLoading={isLoading} />}
        {activeTab === 'market' && <div>Раздел: Рынок</div>}
        {activeTab === 'leaders' && <div>Раздел: Лидеры</div>}
        {activeTab === 'tasks' && <div>Раздел: Задания</div>}
        {activeTab === 'profile' && <div>Раздел: Профиль</div>}
      </main>

      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} user={user} isLoading={isLoading} />
    </>
  )
}
