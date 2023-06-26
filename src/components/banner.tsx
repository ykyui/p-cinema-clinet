import React, { useEffect, useRef, useState } from "react"

type Props = {
    children: JSX.Element[]
}



export default function Banner({ children }: Props) {
    const bannerRef = useRef<HTMLDivElement>()
    const [index, setIndex] = useState(0)

    const dragstart = (e) => {
        e.preventDefault()

    }

    useEffect(() => {
        bannerRef.current.addEventListener("mousedown", (e) => {
            console.log("mousedown")
            // console.log(e)
            bannerRef.current.style.cursor = 'grabbing';
            bannerRef.current.style.userSelect = "none"

        })
        bannerRef.current.addEventListener("mousemove", (e) => {
            // console.log(e)
        })
        bannerRef.current.addEventListener("mouseup", (e) => {
            // console.log(e)
        })
        bannerRef.current.addEventListener("dragstart", dragstart)
        bannerRef.current.addEventListener("dragend", (e) => {
            bannerRef.current.removeEventListener("dragstart", dragstart)
        })

    }, [])

    return <div className='md:h-[600px] h-[400px] relative overflow-hidden dragable hover:cursor-pointer ' ref={bannerRef} draggable>
        <div className='h-full transition ease-in-out duration-150 whitespace-nowrap' style={{ transform: `translateX(-${index * 100}%)` }}>
            <div className="h-full pointer-events: none">
                {children.map((e) =>
                    <div className='inline-block w-screen h-full'>
                        {e}
                    </div>
                )}
            </div>
        </div>
        <div className="absolute bottom-0 w-full h-2/5 " style={{ "backgroundImage": "linear-gradient(transparent,black)" }}> </div >
        <div className='absolute bottom-4 w-full'>
            <div className='flex items-center justify-center'>
                {children.map((e, i) =>
                    <div className='inline-block p-2'>
                        <div className='w-4 h-4 border-2 rounded-full cursor-pointer hover:bg-blue-400 hover:border-0' style={{ background: index == i ? 'white' : null }} onClick={() => setIndex(i)}></div>
                    </div>
                )}
            </div>
        </div>
    </div >
}