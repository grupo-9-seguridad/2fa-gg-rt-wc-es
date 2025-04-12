
export default function LoginPage() {
    return (
      <main className="flex flex-col items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)] px-6 transition-colors duration-300">
        <h1 className="text-3xl font-bold mb-6">Iniciar sesión</h1>
        <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium dark:text-white">Correo electrónico</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium dark:text-white">Contraseña</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            Ingresar
          </button>
        </form>
      </main>
    )
  }
  