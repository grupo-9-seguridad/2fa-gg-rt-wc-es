'use client'
import { useRegister } from '@/context/RegisterContext'

export default function DashboardPage() {
    const { data } = useRegister()

    return (
        <main className="flex flex-col items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)] px-6 transition-colors duration-300">
            <h1 className="text-3xl font-bold mb-6">Bienvenido al Panel de Usuario</h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Datos del usuario:</h2>
                <ul className="space-y-2 text-left">
                    <li><strong>Nombre de usuario:</strong> {data.userName.toUpperCase()}</li>
                    <li><strong>Método 2FA seleccionado:</strong> {data.selected2FAMethod ? data.selected2FAMethod.toUpperCase() : ''}</li>
                </ul>

            </div>
            <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-2xl text-center">
                <h2 className="text-xl font-semibold mb-4">¿Qué es la autenticación de dos factores (2FA)?</h2>
                <p className="text-gray-700 dark:text-gray-300 text-md leading-relaxed">
                    La autenticación de dos factores (2FA) es un mecanismo de seguridad que requiere dos formas de verificación
                    para acceder a tu cuenta. Esto combina algo que conoces (como tu contraseña) con algo que tienes
                    (como un código generado en tu app de autenticación).
                    <br /><br />
                    Al habilitar el 2FA, aumentas significativamente la seguridad de tu cuenta, protegiéndola contra accesos
                    no autorizados incluso si alguien conoce tu contraseña.
                </p>
            </section>
        </main>
    )
}
