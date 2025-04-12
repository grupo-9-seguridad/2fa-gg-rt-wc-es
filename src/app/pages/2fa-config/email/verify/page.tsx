export default function EmailVerifyPage() {
    return (
        <main className="flex flex-col items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)] px-6 transition-colors duration-300">
        <h1 className="text-2xl font-bold mb-4">Verifica tu código de correo</h1>
        <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
          <label htmlFor="code" className="block text-sm font-medium mb-2">Código</label>
          <input
            type="text"
            id="code"
            name="code"
            placeholder="Ingresa el código"
            className="w-full p-2 border rounded mb-4 text-black"
          />
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Verificar
          </button>
        </form>
      </main>
    );
  }