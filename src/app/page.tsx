'use client'

import React, { useEffect } from 'react'
import { TopBar } from '@/ui/topbar'
import { initTelegramRules } from '@/lib/tg'

export default function Home() {
  useEffect(() => {
    initTelegramRules()
  }, [])

  return (
    <>
      <TopBar />
      <main className="testcontent">
        test
      </main>
    </>
  )
}
