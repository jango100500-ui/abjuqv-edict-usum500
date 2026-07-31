'use client'

import React, { useState, useRef } from 'react'
import { verifyPassword } from '@/storage/admin'
import { triggerHaptic } from '@/lib/tg'

interface AdminPasswordProps {
  onSuccess: () => void
  onCancel: () => void
}

export const AdminPassword: React.FC<AdminPasswordProps> = ({ onSuccess, onCancel }) => {
  const [pin, setPin] = useState<string[]>(['', '', '', ''])
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ]

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const newPin = [...pin]
    newPin[index] = val.slice(-1)
    setPin(newPin)

    if (val && index < 3) {
      inputRefs[index + 1].current?.focus()
    }

    const fullPin = newPin.join('')
    if (fullPin.length === 4) {
      submitPin(fullPin)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const submitPin = (code: string) => {
    const res = verifyPassword(code)
    if (res.success) {
      triggerHaptic('heavy')
      onSuccess()
    } else {
      triggerHaptic('heavy')
      if (res.locked) {
        alert('Доступ заблокирован на 30 минут из-за превышения попыток')
        onCancel()
      } else {
        alert(`Пароль неверный. Осталось ${res.remaining} попыток`)
        setPin(['', '', '', ''])
        inputRefs[0].current?.focus()
      }
    }
  }

  return (
    <div className="admin-container">
      <div style={{ width: 90, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/icons/lock.png" alt="Lock" style={{ width: 64, height: 64, opacity: 0.8 }} onError={(e) => {
          e.currentTarget.style.display = 'none'
        }} />
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 700 }}>Подтверди доступ</h2>
      <p style={{ fontSize: 13, opacity: 0.65, textAlign: 'center', maxWidth: 280 }}>
        Введи админский пароль, чтобы получить доступ к тулбоксу
      </p>

      <div className="pin-row">
        {pin.map((digit, idx) => (
          <input
            key={idx}
            ref={inputRefs[idx]}
            type="password"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className={`pin-cell ${digit || idx === pin.findIndex(p => !p) ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
