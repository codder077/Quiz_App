'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const ThemeToggle = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme('light');

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const handleThemeSwitch = () => {
		theme === 'light' ? setTheme('dark') : setTheme('light');
	}

	return (
		<div className="flex items-center">

			<button onClick={handleThemeSwitch}>
				{theme === "dark" ? <MdOutlineLightMode size={24} /> : <MdOutlineDarkMode size={24} />}
			</button>

		</div>
	);
};

export default ThemeToggle;