'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SetupEmail() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Email ingresado:', email)
    // Aquí enviarías el correo con el código de confirmación
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)] px-6 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4">Configurar autenticación por correo</h1>
      <p className="mb-6 text-center max-w-sm">
        Ingresa tu correo electrónico. Te enviaremos un código para confirmar tu dirección.
      </p>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ej. usuario@correo.com"
          className="w-full p-3 mb-4 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
          Enviar código de verificación
        </button>
        <Link href="/pages/2fa-config" className="block mt-4 text-sm text-blue-400 hover:underline text-center">
          ← Volver a selección de método
        </Link>
      </form>
    </main>
  )
}
