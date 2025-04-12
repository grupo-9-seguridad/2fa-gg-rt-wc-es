// app/2fa/sms/page.tsx

'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function SMSVerification() {
  const [code, setCode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí podrías verificar el código vía API
    console.log('Código SMS:', code)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4">
      <h1 className="text-2xl font-bold mb-4">Verificación por SMS</h1>
      <p className="mb-6 text-center max-w-sm">Ingresa el código de 6 dígitos que hemos enviado a tu teléfono móvil.</p>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Código de verificación"
          className="w-full p-3 mb-4 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
        >
          Verificar código
        </button>
        <Link href="/2fa-method" className="block mt-4 text-sm text-blue-400 hover:underline text-center">
          ← Volver a selección de método
        </Link>
      </form>
    </main>
  )
}
