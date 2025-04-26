"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRegister } from '@/context/RegisterContext'

export default function RegisterPage() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const { setData } = useRegister()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!userName || !password) {
      setError('Todos los campos son obligatorios.')
      return
    }

    setData({ userName, password, email : '' })
    router.push('/pages/2fa-config')
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)] px-6 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6">Registro</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium dark:text-white">Nombre de usuario</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium dark:text-white">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
        >
          Registrarse
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </main>
  )
}
