"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { useRegister } from '@/context/RegisterContext'

export default function EmailVerifyPage() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const { data, setData } = useRegister()
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const requestData = {
        username: data.userName,
        code: code,
        recordar: false
      };

      const response = await api.post("/verificar-2fa", requestData)
      if (response.data.hasError) {
        return setError(response.data.message)
      }

      setSuccess(true)

    } catch (err: any) {
      console.error(err)
      setError("El código ingresado no es válido o ha expirado")
    }

    if (success) {
      const timer = setTimeout(() => {
        router.replace("/dashboard")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)] px-6 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4">Verifica tu código de sms</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <label htmlFor="code" className="block text-sm font-medium mb-2">Código</label>
        <input
          type="text"
          id="code"
          name="code"
          placeholder="Ingresa el código"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-2 border rounded mb-4 text-black"
        />
        {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}
        {success && <p className="text-green-600 mb-2 text-sm">✅ Verificación correcta. Redirigiendo...</p>}
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Verificar
        </button>
      </form>
    </main>
  )
}
