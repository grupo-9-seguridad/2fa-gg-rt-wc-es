'use client'

import { useRegister } from '@/context/RegisterContext'
import api from '@/lib/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SetupApp() {
  const [loading, setLoading] = useState(true)
  const { data, setData } = useRegister()
  const [qrCode, setQrCode] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError('')
        setLoading(true)

        const requestData = {
          username: data.userName,
          password: data.password,
          tipo2FA: data.selected2FAMethod,
          gauth: true,
        };
        console.log(requestData)

        const response = await api.post("/updateUsr",
          requestData
        )
        if (response.data.hasError) {
          return setError(response.data.message)
        }
        const verifier = await api.post('/FactorGenerate', requestData)

        if (verifier.data.hasError) {
          return setError(verifier.data.message)
        }
        setQrCode(verifier.data.message	)

      } catch (err) {
        console.error('Error al obtener datos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    router.push('/pages/2fa-config/app/verify')

  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)] px-6 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4">Configurar autenticación con app</h1>
      {loading ? (
        <div className="text-center text-gray-700 dark:text-white">
          <p className="text-lg">🔄 Generando código QR...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4 w-full max-w-md text-center">
          {error}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
          <p className="mb-4">Escanea este código QR con Google Authenticator o una app similar:</p>
          <div className="bg-white p-4 rounded inline-block">
            <img src={qrCode} alt="Código QR" className="mx-auto" />
          </div>
          <p className="text-sm mb-4 text-gray-600 dark:text-white">
            Una vez configurado, tu app generará códigos de 6 dígitos.
          </p>

          <button onClick={handleSubmit} type="button" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
            Ingresar código generado en la app
          </button>
        </div>
      )}

      <Link href="/pages/2fa-config" className="text-blue-400 hover:underline text-sm">
        ← Volver a selección de método
      </Link>
    </main>
  )
}
