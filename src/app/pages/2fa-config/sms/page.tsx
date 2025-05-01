'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRegister } from '@/context/RegisterContext'
import api from '@/lib/api'

export default function SetupSMS() {
  const { data, setData } = useRegister()
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
  
    if (!phone) {
      setError('Debes ingresar un número telefónico.')
      return
    }
  
    try {
      setData({
        ...data,
        phone,
      })

      const requestData = {
        username: data.userName,
        password: data.password,
        tipo2FA: data.selected2FAMethod,
        telefono: phone,
        gauth: false,
      };

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

      router.replace('/pages/2fa-config/sms/verify')
  
    } catch (err) {
      console.log(err)
      setError("Error al procesar su solicitud, inténtelo más tarde.")
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)] px-6 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4">Configurar autenticación por SMS</h1>
      <p className="mb-6 text-center max-w-sm">
        Ingresa tu número de teléfono.<br/>Enviaremos un mensaje de texto con un código para verificar tu número.
      </p>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Ej. +593 099 999 9999"
          className="w-full p-3 mb-4 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {error && <p className="mt-4 text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
          Enviar código de verificación
        </button>
        <Link href="/pages/2fa-config" className="block mt-4 text-sm text-blue-400 hover:underline text-center">
          ← Volver a selección de método
        </Link>
      </form>
    </main>
  )
}
