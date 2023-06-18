import MovieIcon from '@mui/icons-material/Movie';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeAction, selectAllMovie, selectAllTheatres, selectSeat, ticketState, updateSearch, updateTheatresList } from '@/redux/ticketSlice';
import { drawerState } from '@/redux/drawerSlice';
import SeattingPlan from './seattingPlan';
import { arrayGen } from '@/helper';
import dayjs from 'dayjs';


//ticket
const Ticket = () => {
    const dispatch = useDispatch();
    const ticketS = useSelector(ticketState);

    return <>
        <div>Tickets</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
            <div className='flex items-center bg-opacity-50 bg-white' onClick={() => dispatch(changeAction("movie"))}>
                <div className="flex-1">
                    <div>Movie</div>
                    <div>{`${ticketS.movie == undefined ? "All Movies" : ticketS.movie.name}`}</div>
                </div>
                <MovieIcon />
            </div>
            <div className='flex items-center bg-opacity-50 bg-white' onClick={() => dispatch(changeAction("date"))}>
                <div className="flex-1" >
                    <div>Date</div>
                    <div>{`${ticketS.date} ${ticketS.date == dayjs().format("YYYY-MM-DD") ? "(Today)" : ""}`}</div>
                </div>
                <EventIcon />
            </div>
            <div className='flex items-center bg-opacity-50 bg-white' onClick={() => dispatch(changeAction("theatres"))}>
                <div className="flex-1">
                    <div>Theatres</div>
                    <div>{`${ticketS.theatre == undefined ? "All Theatres" : ticketS.theatre.name}`}</div>
                </div>
                <PlaceIcon />
            </div>
        </div>
        <div>
            {ticketS.availableTheatres.filter((e) => ticketS.theatre == undefined || e.theatreId == ticketS.theatre.theatreId).map((e) => <div>
                <div>{e.name}</div>
                <TheatreMovies theatre={e} />
            </div>)}
        </div>
    </>
}

const TheatreMovies = ({ theatre }) => {
    const dispatch = useDispatch();
    const ticketS = useSelector(ticketState);
    const [movies, setMovies] = useState([])
    useEffect(() => {
        fetch(`/api/searchMovie?date=${ticketS.date}&movieId=${ticketS.movie?.id ?? 0}&theatreId=${theatre.theatreId}`).then((e) => e.json()).then((e) => setMovies(e))
    }, [])
    return <div>{movies.map((e) => <Movie movie={e} />)}</div>
}

const Movie = ({ movie }) => {
    const dispatch = useDispatch();
    return <div>
        <div>{movie.name}</div>
        <div className=''>{movie.fields == undefined ? "no fields" :
            movie.fields.map((e) => <div className='mr-2 p-2 bg-blue-200 inline-block cursor-pointer' onClick={() => dispatch(selectSeat(e))}>{e.showTime.substring(0, 5)}</div>)}</div>
    </div>
}

//selectSeat
const SelectSeat = () => {
    const dispatch = useDispatch();
    const ticketS = useSelector(ticketState);
    const [selectedSeat, setSelectedSeat] = useState([])
    const [field, setField] = useState()
    useEffect(() => {
        fetch(`/api/fieldSettingPlan/${ticketS.field.fieldId}`).then((res) => res.json()).then((res) => setField(res))
    }, [])
    if (field == undefined) return <></>
    return <>
        <div onClick={() => dispatch(changeAction("ticket"))}>Back</div>
        <SeattingPlan col={field.house.width} row={field.house.height} specialSeat={[...field.house.specialSeat, ...field.soldSeat]} selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat} />
    </>
}

const AvailableMovie = () => {
    const dispatch = useDispatch();
    const ticketS = useSelector(ticketState);
    const [availableMovie, setAvailableMovie] = useState([])
    useEffect(() => {
        fetch(`/api/movies?date=${ticketS.date}`).then((res) => res.json()).then((res) => setAvailableMovie(res))
    }, [])

    return <div>
        <div onClick={() => dispatch(changeAction("ticket"))}>Back</div>
        <div className='flex' >
            <div className='h-48 aspect-[12/16] bg-gray-500 opacity-60 text-center center' onClick={() => dispatch(selectAllMovie())}>
                All
            </div>
            {[...availableMovie].map((e) => <div className='h-48 aspect-[12/16]' onClick={() => dispatch(updateSearch({ movie: e }))}>
                <img className='h-full' src={`/api/attachmentHandler/${e.cover}`}></img>
                {e.name}
            </div>)}
            {JSON.stringify(availableMovie)}
        </div>
    </div>
}

//date
const AvailableDate = () => {
    const dispatch = useDispatch();
    return <div>
        <div onClick={() => dispatch(changeAction("ticket"))}>Back</div>
        {arrayGen(3).map((e, i) => <div onClick={() => dispatch(updateSearch({ date: dayjs().add(i, 'day').format("YYYY-MM-DD") }))}>{`${dayjs().add(i, 'day').format("YYYY-MM-DD")} ${i == 0 ? "Today" : ""}`}</div>)}
    </div>
}

const AvailableTheatres = () => {
    const dispatch = useDispatch();
    const ticketS = useSelector(ticketState);
    return <div>
        <div onClick={() => dispatch(changeAction("ticket"))}>Back</div>
        <div onClick={() => dispatch(selectAllTheatres())}>All</div>
        {ticketS.availableTheatres.map((e) => <div className='cursor-pointer' onClick={() => dispatch(updateSearch({ theatre: e }))}>{e.name}</div>)}
        {JSON.stringify(ticketS.availableTheatres)}
    </div>
}



export default function Tickets(params) {
    const dispatch = useDispatch();
    const ticketS = useSelector(ticketState);
    const drawerS = useSelector(drawerState);

    useEffect(() => {
        fetch(`/api/theatres`).then((e) => e.json()).then(e => dispatch(updateTheatresList(e)))
    }, [])

    useEffect(() => {
        dispatch(changeAction("ticket"))
    }, [])


    return <div className='w-full lg:min-w-[1024px] lg:max-w-[1024px]'>
        {{
            "ticket": <Ticket />,
            "movie": <AvailableMovie />,
            "date": <AvailableDate />,
            "theatres": <AvailableTheatres />,
            "selectSeat": <SelectSeat />
        }[ticketS.action]}
    </div>
}