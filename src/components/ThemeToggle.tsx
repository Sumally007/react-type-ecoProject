import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from './ThemeContext'

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className='p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer shadow-xs'
            title='Toggle Theme'
        >
            {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
        </button>
    )
}

export default ThemeToggle;