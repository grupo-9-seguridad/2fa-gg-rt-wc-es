'use client'

import { useRegister } from '@/context/RegisterContext'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SMSVerification() {
  const { data } = useRegister()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess("")
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
        setSuccess('Acceso exitoso. Redirigiendo...')
      }

    } catch (err) {
      console.error(err)
      setError('Error al verificar el código.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (success !== '') {
      const timer = setTimeout(() => {
        router.replace('/pages/dashboard')
      }, 3000)
  
      return () => clearTimeout(timer)
    }
  }, [success, router])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4">
      <h1 className="text-2xl font-bold mb-4">Verificación por SMS</h1>
      <p className="mb-6 text-center max-w-sm">Ingresa el código que hemos enviado a tu teléfono móvil.</p>
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
        {success && <p className="mt-4 text-green-500">{success}</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </main>
  )
}
