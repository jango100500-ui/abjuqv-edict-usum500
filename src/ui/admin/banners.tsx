'use client'

import React, { useState } from 'react'
import { Banner, getStoredBanners, addStoredBanner, removeStoredBanner } from '@/storage/banners'
import { triggerHaptic } from '@/lib/tg'

interface AdminBannersProps {
  onBannerChange: () => void
}

export const AdminBanners: React.FC<AdminBannersProps> = ({ onBannerChange }) => {
  const [banners, setBanners] = useState<Banner[]>(getStoredBanners())
  const [mode, setMode] = useState<'list' | 'create'>(banners.length > 0 ? 'list' : 'create')

  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('7')
  const [actionType, setActionType] = useState<Banner['actionType']>('market')
  const [linkUrl, setLinkUrl] = useState('')
  const [photoUrl, setPhotoUrl] = useState('/logos/cardslogo.png')

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreate = () => {
    if (!title.trim()) return

    let durNum = parseInt(duration, 10) || 7
    if (durNum > 45) durNum = 45
    if (durNum < 5) durNum = 5

    const newBanner: Banner = {
      id: Date.now().toString(),
      title,
      photoUrl,
      duration: durNum,
      actionType,
      linkUrl: actionType === 'link' ? linkUrl : undefined
    }

    const updated = addStoredBanner(newBanner)
    setBanners(updated)
    triggerHaptic('heavy')
    alert('Баннер создан, можешь сам проверить на главной')
    onBannerChange()
    setMode('list')
    setTitle('')
  }

  const handleDelete = (id: string) => {
    const updated = removeStoredBanner(id)
    setBanners(updated)
    onBannerChange()
    triggerHaptic('medium')
  }

  const isFormReady = title.trim().length > 0 && photoUrl.length > 0

  if (mode === 'list' && banners.length > 0) {
    return (
      <div className="admin-container">
        <button 
          className="submit-btn ready" 
          onClick={() => setMode('create')}
        >
          Создать новый
        </button>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {banners.map((b) => (
            <div key={b.id} className="banner-item-row">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{b.title}</span>
                <span style={{ fontSize: 11, opacity: 0.5 }}>{b.duration}с • {b.actionType}</span>
              </div>
              <button className="del-btn" onClick={() => handleDelete(b.id)}>
                Удалить
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <label className="photo-uploader">
        {photoUrl ? (
          <img src={photoUrl} alt="Превью" className="photo-uploader-img" />
        ) : (
          <>
            <img src="/icons/photo.png" alt="Photo" style={{ width: 28, height: 28, opacity: 0.5 }} />
            <span style={{ fontSize: 12, opacity: 0.5 }}>Фото баннера</span>
          </>
        )}
        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />
      </label>

      <div className="admin-input-group">
        <input 
          className="admin-field" 
          placeholder="Введи название" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="field-hint">
          Придумай и введи название для этого баннера. к слову, оно будет видно только админам
        </span>
      </div>

      <div className="admin-input-group">
        <div style={{ position: 'relative' }}>
          <input 
            className="admin-field" 
            type="number"
            placeholder="Установи длительность" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)}
          />
          <span style={{ position: 'absolute', right: 16, top: 14, opacity: 0.5, fontSize: 14 }}>с</span>
        </div>
        <span className="field-hint">
          Установи время длительности баннера. лично я рекомендую 7 секунд
        </span>
      </div>

      <div className="admin-input-group">
        <div className="admin-card" style={{ padding: '12px 16px' }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Действие</span>
          <select 
            value={actionType} 
            onChange={(e) => setActionType(e.target.value as any)}
            style={{ background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: 13 }}
          >
            <option value="market" style={{ background: '#161c26' }}>Открыть Рынок</option>
            <option value="leaders" style={{ background: '#161c26' }}>Открыть Лидеров</option>
            <option value="tasks" style={{ background: '#161c26' }}>Открыть Задания</option>
            <option value="profile" style={{ background: '#161c26' }}>Открыть Профиль</option>
            <option value="link" style={{ background: '#161c26' }}>Открыть ссылку</option>
          </select>
        </div>
      </div>

      {actionType === 'link' && (
        <div className="admin-input-group">
          <input 
            className="admin-field" 
            placeholder="https://..." 
            value={linkUrl} 
            onChange={(e) => setLinkUrl(e.target.value)}
          />
        </div>
      )}

      <button 
        className={`submit-btn ${isFormReady ? 'ready' : ''}`}
        disabled={!isFormReady}
        onClick={handleCreate}
      >
        Создать
      </button>
    </div>
  )
}
