"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import api, { apiPost } from "@/lib/api"
import { useRegister } from "@/context/RegisterContext"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const {data, setData, resetData } = useRegister()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    resetData();
    try {
      const response = await api.post('/login', {
        username,
        password,
      })
      console.log(response)

      if (response.data.hasError) {
        return setError(response.data.message)
      }

      if (response.data.tiene2FA) {
        const requestData = {
          username,
          password,
        };
        console.log(requestData)

        const verifier = await api.post('/FactorGenerate', requestData)
        console.log("verifier", verifier.data.message)
        if(verifier.data.hasError){
          return setError(verifier.data.message)
        }    
        setData({ userName: username, password })
      // if (response.data.tiene2FA) {
        // router.replace("/pages/dashboard")
        router.replace(`/pages/login/2fa-verify/${verifier.data.message}`)
      } else {
        setData({ userName: username, password })
        router.replace(`/pages/2fa-config`)
      }
    } catch (err: any) {
      console.error(err)
      setError("Usuario o contraseña incorrectos")
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)] px-6 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6">Iniciar sesión</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium dark:text-white">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
        >
          Ingresar
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </main>
  )
}
