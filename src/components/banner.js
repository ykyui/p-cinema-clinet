import { useState } from "react"

export default function Banner(params) {
    const [index, setIndex] = useState(0)
    return <div className='md:h-[336px] h-[400px] bg-blue-50 relative overflow-hidden'>
        <div className='h-full transition ease-in-out duration-150 whitespace-nowrap' style={{ transform: `translateX(-${index * 100}%)` }}>
            <div className="h-full">
                {params.children.map((e) =>
                    <div className='inline-block w-screen h-full'>
                        {e}
                    </div>
                )}
            </div>
        </div>
        <div className='absolute bottom-4 w-full'>
            <div className='flex items-center justify-center'>
                {params.children.map((e, i) =>
                    <div className='inline-block p-2'>
                        <div className='w-4 h-4 border-2 rounded-full cursor-pointer' style={{ background: index == i ? 'yellow' : null }} onClick={() => setIndex(i)}></div>
                    </div>
                )}
            </div>
        </div>
    </div>
}