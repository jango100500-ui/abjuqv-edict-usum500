'use client'

import React, { useEffect, useState } from 'react'
import { TopBar } from '../ui/topbar'
import { TabBar } from '../ui/tabbar'
import { HomeHeader } from '../ui/main/home-header'
import { initTelegramRules } from '../lib/tg'

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('cards')

  useEffect(() => {
    initTelegramRules()
  }, [])

  return (
    <>
      {activeTab === 'cards' && <div className="home-top-glow" />}

      <TopBar />
      
      <main className="pagebody">
        {activeTab === 'cards' && <HomeHeader />}
        {activeTab === 'market' && <div>Раздел: Рынок</div>}
        {activeTab === 'leaders' && <div>Раздел: Лидеры</div>}
        {activeTab === 'tasks' && <div>Раздел: Задания</div>}
        {activeTab === 'profile' && <div>Раздел: Профиль</div>}
      </main>

      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  )
}
