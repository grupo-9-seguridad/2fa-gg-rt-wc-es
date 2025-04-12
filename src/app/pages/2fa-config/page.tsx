// app/2fa-method/page.tsx

'use client'

import Link from 'next/link'

export default function Select2FAMethod() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)] px-6 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-[var(--foreground)]">
        Selecciona tu método de autenticación 2FA
      </h1>

      <p className="text-gray-700 dark:text-[var(--foreground)] mb-8 text-center max-w-md">
        Elige el método de autenticación para proteger tu cuenta.
      </p>

      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <Link
          href="/pages/2fa-config/sms"
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition"
        >
          📱 SMS (Código por mensaje de texto)
        </Link>
        <Link
          href="/pages/2fa-config/email"
          className="w-full px-4 py-3 bg-green-600 text-white rounded-lg text-center hover:bg-green-700 transition"
        >
          📧 Correo electrónico
        </Link>
        <Link
          href="/pages/2fa-config/app"
          className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg text-center hover:bg-purple-700 transition"
        >
          🔐 Google Authenticator
        </Link>
      </div>
    </main>
  )
}
