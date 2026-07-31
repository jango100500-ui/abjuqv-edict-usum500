'use client'

import React, { useEffect, useState } from 'react'
import { Banner } from '../storage/banners'
import { triggerHaptic } from '../lib/tg'

interface BannersCarouselProps {
  banners: Banner[]
  onSelectTab: (tab: string) => void
}

export const BannersCarousel: React.FC<BannersCarouselProps> = ({ banners, onSelectTab }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const activeBanner = banners[currentIndex] || banners[0]

  useEffect(() => {
    if (!banners.length || !activeBanner) return

    const durationMs = (activeBanner.duration || 7) * 1000
    const stepInterval = 100
    let elapsed = 0

    const timer = setInterval(() => {
      elapsed += stepInterval
      const pct = Math.min((elapsed / durationMs) * 100, 100)
      setProgress(pct)

      if (elapsed >= durationMs) {
        clearInterval(timer)
        setProgress(0)
        setCurrentIndex((prev) => (prev + 1) % banners.length)
      }
    }, stepInterval)

    return () => clearTimeout(timer)
  }, [currentIndex, banners])

  if (!banners.length || !activeBanner) return null

  const handleClick = () => {
    triggerHaptic('light')
    if (activeBanner.actionType === 'link' && activeBanner.linkUrl) {
      window.open(activeBanner.linkUrl, '_blank')
    } else {
      onSelectTab(activeBanner.actionType)
    }
  }

  return (
    <div className="carousel-box" onClick={handleClick}>
      <img src={activeBanner.photoUrl} alt={activeBanner.title} className="carousel-img" />
      <div className="carousel-title">{activeBanner.title}</div>
      <div className="carousel-progress-bg">
        <div className="carousel-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
