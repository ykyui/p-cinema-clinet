import style from "./backArrow.module.css";

type Porps = {
    onClick: () => void
}

export default function BackArrow({ onClick }: Porps) {
    return <i className={`${style.arrow} ${style.left} cursor-pointer`} onClick={onClick}></i>
}