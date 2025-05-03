'use client'

import { useRegister } from '@/context/RegisterContext'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AppVerifyPage() {
  const { data } = useRegister()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      const response = await api.post('/verificar-2fa', {
        username: data.userName,
        codigo: code,
        recordar: false
      })

      if (response.data.hasError) {
        setError(response.data.message || 'Código incorrecto.')
      } else {
        setSuccess(true)
      }
    } catch (err) {
      console.error(err)
      setError('Ocurrió un error al verificar el código.')
    } finally {
      setLoading(false)
    }
  
  }

  useEffect(() => {
      if (success) {
        const timer = setTimeout(() => {
          router.replace('/pages/dashboard')
        }, 3000)
    
        return () => clearTimeout(timer)
      }
    }, [success, router])

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)] px-6 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4">Verifica el código de tu app</h1>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <label htmlFor="code" className="block text-sm font-medium mb-2">
          Código de 6 dígitos
        </label>
        <input
          type="text"
          id="code"
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="123456"
          className="w-full p-2 border rounded mb-4 text-black"
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? 'Verificando...' : 'Verificar'}
        </button>
      </form>
    </main>
  )
}
