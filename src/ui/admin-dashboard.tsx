'use client'

import React from 'react'
import { triggerHaptic } from '../lib/tg'

interface AdminDashboardProps {
  onOpenBanners: () => void
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onOpenBanners }) => {
  const handleClick = () => {
    triggerHaptic('light')
    onOpenBanners()
  }

  return (
    <div className="admin-container">
      <h2 style={{ fontSize: 20, fontWeight: 700, alignSelf: 'flex-start' }}>Админ-панель</h2>
      
      <div className="admin-card" onClick={handleClick}>
        <span className="admin-card-title">Управление баннерами</span>
        <div className="admin-card-action">
          <span>Перейти</span>
          <span>&gt;</span>
        </div>
      </div>
    </div>
  )
}
