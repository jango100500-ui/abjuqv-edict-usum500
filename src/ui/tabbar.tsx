'use client'

import React from 'react'
import { triggerHaptic, getUserData } from '../lib/tg'

interface TabBarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
  const user = getUserData()

  const handleSelect = (tabKey: string) => {
    if (activeTab !== tabKey) {
      triggerHaptic('light')
      setActiveTab(tabKey)
    }
  }

  return (
    <nav className="tabbarwrap">
      <button 
        className={`tabitem ${activeTab === 'market' ? 'active' : ''}`}
        onClick={() => handleSelect('market')}
      >
        <img src="/icons/mart.png" alt="Рынок" className="tabicon" />
        <span className="tablabel">Рынок</span>
      </button>

      <button 
        className={`tabitem ${activeTab === 'leaders' ? 'active' : ''}`}
        onClick={() => handleSelect('leaders')}
      >
        <img src="/icons/cup.png" alt="Лидеры" className="tabicon" />
        <span className="tablabel">Лидеры</span>
      </button>

      <button 
        className={`tabitem ${activeTab === 'cards' ? 'active' : ''}`}
        onClick={() => handleSelect('cards')}
      >
        <img src="/icons/cards.png" alt="Главная" className="tabicon" />
        <span className="tablabel">Главная</span>
      </button>

      <button 
        className={`tabitem ${activeTab === 'tasks' ? 'active' : ''}`}
        onClick={() => handleSelect('tasks')}
      >
        <img src="/icons/ticket.png" alt="Задания" className="tabicon" />
        <span className="tablabel">Задания</span>
      </button>

      <button 
        className={`tabitem ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => handleSelect('profile')}
      >
        <div className="avatarbox">
          {user.photo_url ? (
            <img src={user.photo_url} alt="Аватар" className="useravatar" />
          ) : (
            <span className="avatarfallback">
              {user.first_name ? user.first_name.charAt(0).toUpperCase() : 'U'}
            </span>
          )}
        </div>
        <span className="tablabel">Профиль</span>
      </button>
    </nav>
  )
}
