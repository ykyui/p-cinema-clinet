import { useRouter } from 'next/router'
import React from "react";

interface Props {
    link?: string
    children?: React.ReactNode
    onClick?: () => void
    className?: string
}

const Button: React.FC<Props> = ({
    link,
    children,
    onClick,
    className,
}) => {
    const router = useRouter()
    return (
        <button
            onClick={link != undefined ? () => { router.push(link) } : onClick}
            className={className + " p-2 bg-blue-500 inline-block cursor-pointer rounded-xl select-none"}
        >
            {children}
        </button>
    );
}

export default Button;