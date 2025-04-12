'use client'

type Props = {
  currentTheme: 'dark' | 'light'
  toggleTheme: () => void
}

export default function ThemeToggle({ currentTheme, toggleTheme }: Props) {
  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded"
    >
      {currentTheme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
    </button>
  )
}
