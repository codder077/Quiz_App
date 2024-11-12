import React from 'react'
import Timer from './timer'
import ThemeToggle from './themeToggle'

function Header({ timer }) {
    return (
        <header className="flex justify-between items-center py-2.5 px-4 bg-black/85 dark:bg-[#d4e09b] text-white dark:text-black">
            <h1 className="text-3xl">Quiz20</h1>
            <Timer timer={timer} />
            <ThemeToggle/>
        </header>
    )
}

export default Header