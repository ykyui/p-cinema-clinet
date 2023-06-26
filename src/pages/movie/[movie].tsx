import Button from "../../components/button";
import NavBar from "../../layout/navbar";
import { openDrawer } from "../../redux/drawerSlice";
import { updateSearch } from "../../redux/ticketSlice";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'
import { updateHead } from "../../redux/headSlice";
import Head from "next/head";
import dayjs from "dayjs";

export async function getServerSideProps({ req, res, params }) {
    const response = await fetch(`http://${req.headers.host}/api/movieDetail/${params.movie}`)
    if (response.status != 200) { }
    return {
        props: { data: await response.json() },
    }
}

export default function Movie({ data }) {
    const dispatch = useDispatch();
    const titleString = `Cinema | ${data.name}`;
    return <>
        <Head>
            <title>{titleString}</title>
        </Head>
        <div className="md:h-[336px] h-[400px] w-full flex items-center justify-center">
            <img className='object-fill h-full' src={`/api/attachmentHandler/${data.cover}`}></img>
        </div>
        <div className="md:max-w-[1480px] mx-auto">
            <h1 className="text-4xl font-bold">{data.name}</h1>
            <h3 className="text-xl py-8">{dayjs(data.startDate).format("MMM D, YYYY")}</h3>
            <div className="grid grid-cols-3 md:grid-rows-4 md:grid-flow-col md:max-h-64 md:grid-cols-6 gap-4">
                <img className='object-fill aspect-[2/3] col-span-1 md:row-span-4' src={`/api/attachmentHandler/${data.cover}`}></img>
                <div className="order-last md:order-none col-span-3 md:row-span-1">
                    <Button className="w-full" onClick={() => {
                        dispatch(updateSearch({ movie: data }))
                        dispatch(openDrawer('TICKETS'))
                    }}>Get Tickets</Button>
                </div>
                <div className="col-span-2 md:col-span-4 row-span-1 space-x-4 items-start flex">
                    <div className="inline-block">
                        <p>Length</p>
                        <p>{data.length}</p>
                    </div>
                    <div className="inline-block">
                        <p>Ratings</p>
                        <p>{data.ratingsDesc}</p>
                    </div>
                    <div className="inline-block">
                        <p>Genre</p>
                        <p>{data.genre?.join(', ')}</p>
                    </div>
                </div>
            </div>
            <div>
                {data.desc}
            </div>
        </div>
    </>
}