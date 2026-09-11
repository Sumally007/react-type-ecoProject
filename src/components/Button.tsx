import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    children,
    className = "",
    ...props
}) => {

    // Base styles
    const baseStyles = "px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    // Variants
    const variants = {
        // primary 
        primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 dark:bg-blue-600 dark:hover:bg-blue-500",

        // Secondary 
        secondary: "bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200",

        // Outline
        outline: "border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
    }

    return (
        <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button;