'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { triggerHaptic } from '../../lib/tg'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const textVariants = {
  initial: (isAi) => ({
    opacity: 0,
    y: isAi ? 12 : -12
  }),
  animate: {
    opacity: 1,
    y: 0
  },
  exit: (isAi) => ({
    opacity: 0,
    y: isAi ? -12 : 12
  })
}

export const SearchInput = () => {
  const [isAiMode, setIsAiMode] = useState(false)
  const [value, setValue] = useState('')
  const [searchData, setSearchData] = useState(null)
  const [aiData, setAiData] = useState(null)

  useEffect(() => {
    fetch('/jsons/search.json')
      .then((res) => res.json())
      .then((data) => setSearchData(data))
      .catch(() => {})

    fetch('/jsons/ai.json')
      .then((res) => res.json())
      .then((data) => setAiData(data))
      .catch(() => {})
  }, [])

  const handleToggle = () => {
    triggerHaptic('medium')
    setTimeout(() => {
      triggerHaptic('medium')
    }, 100)
    setIsAiMode(!isAiMode)
  }

  const currentPlaceholder = isAiMode ? 'Спроси у ИИ' : 'Найди что-нибудь...'
  const activeAnimation = isAiMode ? searchData : aiData

  return (
    <div style={{ width: '100%', maxWidth: '100%', display: 'flex', alignItems: 'center', position: 'relative', height: '48px', boxSizing: 'border-box' }}>
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="search-glass"
        style={{
          flex: 1,
          height: '100%',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '4px',
          paddingLeft: '18px',
          position: 'relative',
          zIndex: 20,
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ position: 'relative', flex: 1, height: '100%', display: 'flex', alignItems: 'center', marginRight: '8px', boxSizing: 'border-box' }}>
          <AnimatePresence mode="wait" custom={isAiMode}>
            {value === '' && (
              <motion.span
                key={currentPlaceholder}
                custom={isAiMode}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2, ease: 'backOut' }}
                style={{
                  position: 'absolute',
                  left: 0,
                  color: 'rgba(255, 255, 255, 0.45)',
                  fontWeight: 500,
                  fontSize: '14px',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                {currentPlaceholder}
              </motion.span>
            )}
          </AnimatePresence>

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '14px',
              width: '100%',
              fontWeight: 500,
              position: 'relative',
              zIndex: 10,
              boxSizing: 'border-box'
            }}
          />
        </div>

        {isAiMode && (
          <button 
            className="btn-send-white"
            style={{
              height: '38px',
              paddingLeft: '18px',
              paddingRight: '18px',
              borderRadius: '14px',
              cursor: 'pointer',
              flexShrink: 0,
              boxSizing: 'border-box'
            }}
          >
            <img 
              src="/icons/send.png" 
              alt="Send" 
              style={{ width: '14px', height: '14px', objectFit: 'contain' }} 
            />
          </button>
        )}
      </motion.div>

      <motion.button
        layout
        onClick={handleToggle}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="search-glass"
        style={{
          height: '48px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          paddingLeft: '16px',
          paddingRight: '16px',
          marginLeft: '-10px',
          zIndex: 10,
          cursor: 'pointer',
          boxSizing: 'border-box',
          flexShrink: 0
        }}
      >
        <div style={{ width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {activeAnimation ? (
            <Lottie
              animationData={activeAnimation}
              loop={false}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <img 
              src={isAiMode ? '/icons/search.png' : '/icons/ai.png'} 
              alt="Toggle" 
              style={{ width: '18px', height: '18px', objectFit: 'contain' }}
            />
          )}
        </div>
        <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap' }}>
          {isAiMode ? 'Поиск' : 'ИИ'}
        </span>
      </motion.button>
    </div>
  )
}
