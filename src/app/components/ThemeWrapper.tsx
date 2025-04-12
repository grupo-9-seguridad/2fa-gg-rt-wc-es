'use client'

import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark')

    useEffect(() => {
        const stored = localStorage.getItem('theme')
        const preferred = stored === 'dark' || stored === 'light' ? stored : 'dark';
        setTheme(preferred)
        document.documentElement.classList.toggle('dark', preferred === 'dark')
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
        localStorage.setItem('theme', newTheme)
    }

    return (
        <>
            <div className="absolute top-4 left-4 z-50">
                <Link href="/">🏠 Inicio</Link>
            </div>
            <div className="absolute top-4 right-4 z-50">
                <ThemeToggle currentTheme={theme} toggleTheme={toggleTheme} />
            </div>
            {children}
        </>
    )
}
