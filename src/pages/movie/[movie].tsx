import Button from "../../components/button";
import NavBar from "../../layout/navbar";
import { openDrawer } from "../../redux/drawerSlice";
import { updateSearch } from "../../redux/ticketSlice";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'
import { updateHead } from "../../redux/headSlice";
import Head from "next/head";

export async function getServerSideProps({ req, res, params }) {
    const response = await fetch(`http://${req.headers.host}/api/movieDetail/${params.movie}`)
    if (response.status != 200) { }
    return {
        props: { data: await response.json() },
    }
}

export default function Movie({ data }) {
    const dispatch = useDispatch();
    const titleString = `Cinema - ${data.name}`;
    return <>
        <Head>
            <title>{titleString}</title>
        </Head>
        <div className="md:h-[336px] h-[400px] w-full bg-black flex items-center justify-center">
            <img className='object-fill h-full' src={`/api/attachmentHandler/${data.cover}`}></img>
        </div>
        <h1 className="text-2xl">{data.name}</h1>
        <h3 className="text-xl">{data.startDate}</h3>
        <div className="h-96 items-start flex">
            <div className="inline-block h-full aspect-[2/3] bg-black">
                <img className='object-fill h-full' src={`/api/attachmentHandler/${data.cover}`}></img>
            </div>
            <div>
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
                <div>
                    <Button onClick={() => {
                        dispatch(updateSearch({ movie: data }))
                        dispatch(openDrawer('TICKETS'))
                    }}>Get Tickets</Button>
                </div>
            </div>
        </div>
        <div>
            {data.desc}
        </div>
        {process.env.NEXT_PUBLIC_ENV == "DEV" ? <div>{JSON.stringify(data)}</div> : ""}
    </>
}