'use client'

import React from 'react'
import { getUserData } from '../../lib/tg'
import { SearchInput } from './search-input'

export const HomeHeader = () => {
  const user = getUserData()

  return (
    <div style={{
      width: '100%',
      paddingLeft: '16px',
      paddingRight: '16px',
      paddingTop: '16px',
      paddingBottom: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.4px' }}>
          Привет, {user.first_name || 'Игрок'}!
        </h1>
        <p style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.65)' }}>
          Что хочешь найти?
        </p>
      </div>

      <SearchInput />
    </div>
  )
}
