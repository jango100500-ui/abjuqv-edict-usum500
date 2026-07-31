interface AdminState {
  unlocked: boolean
  attempts: number
  lockUntil: number | null
}

let state: AdminState = {
  unlocked: false,
  attempts: 3,
  lockUntil: null
}

export const ADMIN_USERS = ['doomtux', 'temkazavr']

export const checkIsAdminUser = (username?: string) => {
  if (!username) return true
  const clean = username.replace('@', '').toLowerCase()
  return ADMIN_USERS.includes(clean)
}

export const getAdminState = (): AdminState => {
  if (state.lockUntil && Date.now() > state.lockUntil) {
    state.lockUntil = null
    state.attempts = 3
  }
  return state
}

export const verifyPassword = (pin: string) => {
  const current = getAdminState()
  
  if (current.lockUntil) {
    return { success: false, locked: true, remaining: 0 }
  }

  if (pin === '7125') {
    state.unlocked = true
    state.attempts = 3
    return { success: true, locked: false, remaining: 3 }
  }

  state.attempts -= 1
  if (state.attempts <= 0) {
    state.lockUntil = Date.now() + 30 * 60 * 1000
    return { success: false, locked: true, remaining: 0 }
  }

  return { success: false, locked: false, remaining: state.attempts }
}

export const resetAdminSession = () => {
  state.unlocked = false
}
