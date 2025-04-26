'use client'

import Link from 'next/link'

export default function SetupApp() {
  const secret = 'ABC123XYZ456'

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)] px-6 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4">Configurar autenticación con app</h1>
      <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <p className="mb-4">Escanea este código QR con Google Authenticator o una app similar:</p>
        <div className="bg-white p-4 rounded inline-block">
          {/* Aquí puedes renderizar un QR dinámico */}
          <img src="/qr-placeholder.png" alt="Código QR" className="mx-auto" />
        </div>
        <p className="mt-4 text-sm">O ingresa manualmente este código: <br /><strong className="text-blue-500">ABCD1234EFGH5678</strong></p>
        <p className="text-sm mb-4 text-gray-600 dark:text-white">
          Una vez configurado, tu app generará códigos de 6 dígitos.
        </p>

        <button type="button" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
          Ingresar código generado en la app
        </button>
      </div>


      <Link href="/pages/2fa-config" className="text-blue-400 hover:underline text-sm">
        ← Volver a selección de método
      </Link>
    </main>
  )
}
