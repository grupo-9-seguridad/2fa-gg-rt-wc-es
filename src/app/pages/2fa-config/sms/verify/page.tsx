export default function SmsSetupPage() {
    return (
        <main className="flex flex-col items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)] px-6 transition-colors duration-300">
        <h1 className="text-2xl font-bold mb-4">Configura tu número de teléfono</h1>
        <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
          <label htmlFor="phone" className="block text-sm font-medium mb-2">Número de teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+34 600 123 456"
            className="w-full p-2 border rounded mb-4 text-black"
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Enviar código
          </button>
        </form>
      </main>
    );
  }