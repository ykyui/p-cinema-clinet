import { useRouter } from 'next/router'
import React from "react";

interface Props {
    link?: string
    children?: React.ReactNode
    onClick?: () => void
    className?: string
    disable?: boolean
}

const Button: React.FC<Props> = ({
    link,
    children,
    onClick,
    className,
    disable = false,
}) => {
    const router = useRouter()
    return (
        <button
            onClick={link != undefined ? () => { router.push(link) } : onClick}
            className={`${className} p-2 bg-blue-500 inline-block cursor-pointer rounded-xl select-none ${disable ? "cursor-not-allowed" : "cursor-pointer"}`}
            disabled={disable}
        >
            {children}
        </button>
    );
}

export default Button;