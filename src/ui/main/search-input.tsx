'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lottie from 'lottie-react'
import { triggerHaptic } from '../../lib/tg'

const textVariants = {
  initial: (isAi: any) => ({
    opacity: 0,
    y: isAi ? 12 : -12
  }),
  animate: {
    opacity: 1,
    y: 0
  },
  exit: (isAi: any) => ({
    opacity: 0,
    y: isAi ? -12 : 12
  })
}

export const SearchInput = () => {
  const [isAiMode, setIsAiMode] = useState(false)
  const [value, setValue] = useState('')
  const [searchData, setSearchData] = useState(null)
  const [aiData, setAiData] = useState(null)
  const lottieRef = useRef(null)

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

  useEffect(() => {
    if (lottieRef.current) {
      const player = lottieRef.current as any
      if (player.stop && player.play) {
        player.stop()
        player.play()
      }
    }
  }, [isAiMode])

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
    <div style={{ width: '100%', maxWidth: '100%', display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', height: '48px', boxSizing: 'border-box' }}>
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="search-glass"
        style={{
          flex: 1,
          height: '100%',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '4px',
          paddingLeft: '20px',
          position: 'relative',
          zIndex: 10,
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
                  color: 'rgba(255, 255, 255, 0.35)',
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
              borderRadius: '9999px',
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
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{
          order: isAiMode ? -1 : 1,
          height: '48px',
          width: '48px',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          zIndex: 20,
          overflow: 'hidden',
          cursor: 'pointer',
          boxSizing: 'border-box'
        }}
        className="search-glass"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isAiMode ? 'search-icon' : 'ai-icon'}
            initial={{ scale: 0.4, opacity: 0, rotate: isAiMode ? -45 : 45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {activeAnimation ? (
              <Lottie
                lottieRef={lottieRef}
                animationData={activeAnimation}
                loop={false}
                autoplay={true}
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <img 
                src={isAiMode ? '/icons/search.png' : '/icons/ai.png'} 
                alt="Toggle" 
                style={{ width: '20px', height: '20px', objectFit: 'contain' }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
