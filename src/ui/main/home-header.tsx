'use client'

import React from 'react'
import { getUserData } from '../../lib/tg'
import { SearchInput } from './search-input'

export const HomeHeader = () => {
  const user = getUserData()

  return (
    <div style={{
      width: '100%',
      maxWidth: '100%',
      paddingLeft: '16px',
      paddingRight: '16px',
      paddingTop: '32px',
      paddingBottom: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px',
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '4px', width: '100%' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.4px', margin: 0 }}>
          Привет, {user.first_name || 'Игрок'}!
        </h1>
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.65)', letterSpacing: '-0.4px', margin: 0 }}>
          Что хочешь найти?
        </h2>
      </div>

      <SearchInput />
    </div>
  )
}
