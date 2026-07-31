'use client'

import React from 'react'
import { SearchInput } from './search-input'

interface HomeHeaderProps {
  user: any
  isLoading: boolean
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ user, isLoading }) => {
  const firstName = user?.first_name || ''
  const isLongName = firstName.length > 7

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
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'flex-end',
        textAlign: 'center', 
        gap: '4px', 
        width: '100%',
        minHeight: '110px'
      }}>
        {isLoading ? (
          <>
            <div className="skel-block" style={{ width: '55%', height: '32px' }} />
            <div className="skel-block" style={{ width: '40%', height: '28px', marginTop: '6px' }} />
          </>
        ) : (
          <>
            {isLongName ? (
              <>
                <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.4px', margin: 0 }}>
                  Привет,
                </h1>
                <h1 className="clamp-2" style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.4px', margin: 0, width: '100%' }}>
                  {firstName}!
                </h1>
              </>
            ) : (
              <h1 className="clamp-2" style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.4px', margin: 0, width: '100%' }}>
                Привет, {firstName || 'Гость'}!
              </h1>
            )}

            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.65)', letterSpacing: '-0.4px', margin: 0 }}>
              Что хочешь найти?
            </h2>
          </>
        )}
      </div>

      <SearchInput />
    </div>
  )
}
