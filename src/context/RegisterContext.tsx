'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type RegisterData = {
  userName: string
  password: string
  email?: string
  phone?: string
  qrCode?: string
  selected2FAMethod?: 'sms' | 'email' | 'app'
}

type RegisterContextType = {
  data: RegisterData
  setData: (data: RegisterData) => void
}

const RegisterContext = createContext<RegisterContextType | undefined>(undefined)

export function RegisterProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<RegisterData>({
    userName: '',
    password: '',
    email: '',
    phone: '',
    qrCode: '',
    selected2FAMethod: undefined,
  })

  return (
    <RegisterContext.Provider value={{ data, setData }}>
      {children}
    </RegisterContext.Provider>
  )
}

export function useRegister() {
  const context = useContext(RegisterContext)
  if (!context) {
    throw new Error('useRegister must be used within a RegisterProvider')
  }
  return context
}
