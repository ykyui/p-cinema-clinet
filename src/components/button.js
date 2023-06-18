import { useRouter } from 'next/router'

export default function Button({ className, onClick, children, link }) {
    const router = useRouter()
    return <div onClick={link != undefined ? () => { router.push(link) } : onClick} className={className + " p-2 bg-blue-500 inline-block cursor-pointer rounded-xl select-none"}>{children}</div>
}