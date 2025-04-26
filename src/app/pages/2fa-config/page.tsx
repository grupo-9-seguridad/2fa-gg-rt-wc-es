'use client'

import { useRegister } from '@/context/RegisterContext'
import { useRouter } from 'next/navigation'

export default function Select2FAMethod() {
  const { data, setData } = useRegister()
  const router = useRouter()

  const handleSelect = (method: 'sms' | 'email' | 'app') => {
    setData({
      ...data,
      selected2FAMethod: method,
    })
    router.push(`/pages/2fa-config/${method}`)
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)] px-6 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-[var(--foreground)]">
        Selecciona tu método de autenticación 2FA
      </h1>

      <p className="text-gray-700 dark:text-[var(--foreground)] mb-8 text-center max-w-md">
        Elige el método de autenticación para proteger tu cuenta.
      </p>

      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <button
          onClick={() => handleSelect('sms')}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition"
        >
          📱 SMS (Código por mensaje de texto)
        </button>
        <button
          onClick={() => handleSelect('email')}
          className="w-full px-4 py-3 bg-green-600 text-white rounded-lg text-center hover:bg-green-700 transition"
        >
          📧 Correo electrónico
        </button>
        <button
          onClick={() => handleSelect('app')}
          className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg text-center hover:bg-purple-700 transition"
        >
          🔐 Google Authenticator
        </button>
      </div>
    </main>
  )
}
