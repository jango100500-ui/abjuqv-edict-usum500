'use client'

import React, { useRef } from 'react'

interface TopBarProps {
  onAdminHold?: () => void
}

export const TopBar: React.FC<TopBarProps> = ({ onAdminHold }) => {
  const timerRef = useRef<any>(null)

  const handleStart = () => {
    if (!onAdminHold) return
    timerRef.current = setTimeout(() => {
      onAdminHold()
    }, 1500)
  }

  const handleEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  return (
    <header className="topheader">
      <div 
        className="logowrap"
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        <img 
          src="/logos/cardslogo.png" 
          alt="sw cardsbot logo" 
          className="mainlogo"
        />
      </div>
    </header>
  )
}
