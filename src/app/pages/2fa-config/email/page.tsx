'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useRegister } from '@/context/RegisterContext'
import api, { apiPost, getErrorMessage } from '@/lib/api'

export default function SetupEmail() {
  const { data, setData } = useRegister()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
  
    if (!email) {
      setError('Debes ingresar un correo electrónico.')
      return
    }
  
    try {
      setData({
        ...data,
        email,
      })

      const requestData = {
        username: data.userName,
        password: data.password,
        tipo2FA: data.selected2FAMethod,
        email: email,
        telefono: '',
        gauth: false,
      };
      console.log(requestData)

      const response = await api.post("/updateUsr", 
        requestData
      )
  
      if(response.data.hasError){
        return setError(response.data.message)
      }
  
      const verifier = await api.post('/FactorGenerate', requestData)

      if(verifier.data.hasError){
        return setError(verifier.data.message)
      }

      router.replace('/pages/2fa-config/email/verify')
  
    } catch (err) {
      const niceError = getErrorMessage(err)
      setError(niceError)
    }
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
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </form>
    </main>
  )
}
