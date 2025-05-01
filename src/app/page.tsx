import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen px-6 text-center bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">
        Autenticación 2FA
      </h1>
      <p className="text-lg max-w-xl">
        Por favor Inicia sesión o regístrate para acceder a la aplicación.
        <br />
        <br />
        La autenticación de dos factores (2FA) añade una capa adicional de seguridad a tu cuenta, asegurando que solo tú puedas acceder a ella.
        <br /><br />
      </p>
      <div className="mt-8 space-x-4">
        <Link href="/pages/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Iniciar sesión
        </Link>
        <Link href="/pages/register" className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
          Registrarse
        </Link>
      </div>
    </main>

  );
}