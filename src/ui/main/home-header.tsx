'use client'

import React from 'react'
import { SearchInput } from './search-input'

interface HomeHeaderProps {
  user: any
  isLoading: boolean
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ user, isLoading }) => {
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px', width: '100%' }}>
        {isLoading ? (
          <div className="skel-block" style={{ width: '60%', height: '34px', borderRadius: '12px' }} />
        ) : (
          <h1 className="clamp-2" style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.4px', margin: 0, width: '100%' }}>
            Привет, {user?.first_name || 'Гость'}!
          </h1>
        )}

        {isLoading ? (
          <div className="skel-block" style={{ width: '40%', height: '28px', borderRadius: '8px', marginTop: '4px' }} />
        ) : (
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.65)', letterSpacing: '-0.4px', margin: 0 }}>
            Что хочешь найти?
          </h2>
        )}
      </div>

      <SearchInput />
    </div>
  )
}
