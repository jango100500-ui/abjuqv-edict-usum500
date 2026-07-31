'use client'

import React, { useEffect, useState } from 'react'
import { TopBar } from '@/ui/topbar'
import { TabBar } from '@/ui/tabbar'
import { initTelegramRules } from '@/lib/tg'

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('cards')

  useEffect(() => {
    initTelegramRules()
  }, [])

  return (
    <>
      <TopBar />
      
      <main className="testcontent">
        {activeTab === 'market' && <div>Раздел: Рынок</div>}
        {activeTab === 'leaders' && <div>Раздел: Лидеры</div>}
        {activeTab === 'cards' && <div>Раздел: Карты</div>}
        {activeTab === 'tasks' && <div>Раздел: Задания</div>}
        {activeTab === 'profile' && <div>Раздел: Профиль</div>}
      </main>

      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  )
}
