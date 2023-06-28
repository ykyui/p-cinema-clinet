import MovieIcon from '@mui/icons-material/Movie';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeAction, selectAllMovie, selectAllTheatres, selectSeat, ticketState, updateSearch, updateTheatresList } from '../../redux/ticketSlice';
import { drawerState, openDrawer } from '../../redux/drawerSlice';
import SeattingPlan from '../../components/seattingPlan';
import { arrayGen } from '../../helper';
import dayjs from 'dayjs';
import { Movie } from '../../model/movie';
import { Field } from '../../model/field';
import { Seat } from '../../model/seat';
import { Theatre } from '../../model/theatre';
import Theatres from './theatres';
import Button from '../../components/button';
import style from './tickets.module.css'
import BackArrow from '../../components/backArrow';
import { initPayment, paymentState } from '../../redux/paymentSlice';


//ticket
const Ticket = () => {
    const dispatch = useDispatch();
    const ticketS = useSelector(ticketState);
    const [selectedTheatre, setSelectTheatre] = useState({} as Theatre | undefined);
    const availableTheatres = ticketS.availableTheatres.filter((e: Theatre) => ticketS.theatre == undefined || e.theatreId == ticketS.theatre.theatreId) as Array<Theatre>;
    useEffect(() => {
        setSelectTheatre(availableTheatres.at(0))
    }, [])

    return <>
        <div>Tickets</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
            <div className='flex items-center bg-opacity-50 bg-white cursor-pointer' onClick={() => dispatch(changeAction("movie"))}>
                <div className="flex-1">
                    <div>Movie</div>
                    <div>{`${ticketS.movie == undefined ? "All Movies" : ticketS.movie.name}`}</div>
                </div>
                <MovieIcon />
            </div>
            <div className='flex items-center bg-opacity-50 bg-white cursor-pointer' onClick={() => dispatch(changeAction("date"))}>
                <div className="flex-1" >
                    <div>Date</div>
                    <div>{`${ticketS.date} ${ticketS.date == dayjs().format("YYYY-MM-DD") ? "(Today)" : ""}`}</div>
                </div>
                <EventIcon />
            </div>
            <div className='flex items-center bg-opacity-50 bg-white cursor-pointer' onClick={() => dispatch(changeAction("theatres"))}>
                <div className="flex-1">
                    <div>Theatres</div>
                    <div>{`${ticketS.theatre == undefined ? "All Theatres" : ticketS.theatre.name}`}</div>
                </div>
                <PlaceIcon />
            </div>
        </div>
        <div className='pb-40 py-4'>
            {availableTheatres.map((e: Theatre) => <div>
                <div className='font-bold text-2xl cursor-pointer flex justify-between' onClick={() => setSelectTheatre(e == selectedTheatre ? undefined : e)}>
                    {e.name}
                    <div className={`${selectedTheatre?.theatreId == e.theatreId ? "" : style.collapsed} ${style.expand_collapse_icon}`}></div>
                </div>
                {selectedTheatre?.theatreId == e.theatreId ? <TheatreMovies theatre={e} /> : ""}
            </div>)}
        </div>
    </>
}

const TheatreMovies = ({ theatre }) => {
    const dispatch = useDispatch();
    const ticketS = useSelector(ticketState);
    const [movies, setMovies] = useState([] as Movie[])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch(`/api/searchMovie?date=${ticketS.date}&movieId=${ticketS.movie?.id ?? 0}&theatreId=${theatre.theatreId}`).then((e) => e.json()).then((e) => setMovies(e)).finally(() => setLoading(false))
    }, [])
    if (loading) return <div className='h-8 opacity-5'>loading...</div>
    return <div className='space-y-4 transition-all duration-1000 opacity-100' >
        {movies.map((e) => <Movie movie={e} />)}
    </div >
}
type MovieProps = {
    movie: Movie
}
const Movie = ({ movie }: MovieProps) => {
    const dispatch = useDispatch();
    return <div className='space-y-4'>
        <div className='flex space-x-4'>
            <img className='aspect-[12/16] h-48' src={`/api/attachmentHandler/${movie.cover}`}></img>
            <div className='flex-1'>
                <div>{movie.name}</div>
            </div>
        </div>
        <div className='grid grid-cols-3 md:grid-cols-6'>
            {movie.fields == undefined ? "no fields" :
                movie.fields.map((e) => <Button className='mr-2 p-2 inline-block cursor-pointer w-full' onClick={() => dispatch(selectSeat(e))}>{e.showTime.substring(0, 5)}</Button>)}
        </div>
    </div>
}
type SeatCombination = {
    selectedSeat: Seat[]
}
const SeatCombination = ({ selectedSeat }: SeatCombination) => {
    const dispatch = useDispatch();
    const ticketS = useSelector(ticketState);
    const numberOfTickets = {
        adult: useState(0),
        student: useState(0),
        child: useState(0),
        disabled: useState(0),
    }
    const ticketType = Object.keys(numberOfTickets).map((k) => k)
    const [mainType, setMainType] = useState(ticketType.at(0))
    useEffect(() => {
        let numberSet = 0
        ticketType.forEach((k) => {
            const [num, setNum] = numberOfTickets[k]
            numberSet += num
        })
        if (numberSet > selectedSeat.length) {
            const [num, setNum] = numberOfTickets[mainType]
            if (num > 0) {
                setNum(num - 1)
            } else {
                for (let index = 0; index < ticketType.length; index++) {
                    const k = ticketType[index];
                    const [num, setNum] = numberOfTickets[k]
                    if (num > 0) {
                        setNum(num - 1)
                        break
                    }
                }
            }
        } else if (numberSet < selectedSeat.length) {
            const [num, setNum] = numberOfTickets[mainType]
            setNum(num + 1)
        }
    }, [selectedSeat.length])

    return <div className='grid grid-cols-2 text-center max-w-lg gap-4'>
        {ticketType.map((k) => {
            const [num, setNum] = numberOfTickets[k]
            const [m, setM] = numberOfTickets[mainType]
            return <div className='grid grid-cols-4'>
                {k}
                {mainType == k ? <div></div> : <Button onClick={() => {
                    if (m > 0) {
                        setNum(num + 1)
                        setM(m - 1)
                    }
                }}>+</Button>}
                {num}
                {mainType == k ? <div></div> : <Button onClick={() => {
                    if (num > 0) {
                        setNum(num - 1)
                        setM(m + 1)
                    }
                }}>-</Button>}
            </div>
        })}
        <Button className='col-span-2' onClick={() => {
            dispatch(initPayment({
                field: ticketS.field,
                adult: numberOfTickets.adult[0],
                student: numberOfTickets.student[0],
                child: numberOfTickets.child[0],
                disabled: numberOfTickets.disabled[0],
                selectedSeat
            }))
            dispatch(openDrawer("PAYMENT"))
        }}>Confirm</Button>
    </div>
}

//selectSeat
const SelectSeat = () => {
    const dispatch = useDispatch();
    const ticketS = useSelector(ticketState);
    const [selectedSeat, setSelectedSeat] = useState<Seat[]>([])
    const [field, setField] = useState({} as Field)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        fetch(`/api/fieldSettingPlan/${ticketS.field.fieldId}`).then((res) => res.json()).then((res) => setField(res)).finally(() => setLoading(false))
    }, [])
    if (loading) return <></>
    return <>
        <BackArrow onClick={() => dispatch(changeAction("ticket"))}></BackArrow>
        <SeattingPlan col={field.house.width} row={field.house.height} specialSeat={[...field.house?.specialSeat, ...field.soldSeat]} selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat} />
        <SeatCombination selectedSeat={selectedSeat} />
    </>
}

const AvailableMovie = () => {
    const dispatch = useDispatch();
    const ticketS = useSelector(ticketState);
    const [availableMovie, setAvailableMovie] = useState([])
    useEffect(() => {
        fetch(`/api/movies?date=${ticketS.date}`).then((res) => res.json()).then((res) => setAvailableMovie(res))
    }, [])

    return <div className='space-y-4'>
        <BackArrow onClick={() => dispatch(changeAction("ticket"))}></BackArrow>
        <div className='grid grid-cols-3 md:grid-cols-6 gap-4' >
            <div className='aspect-[12/16] w-full bg-gray-500 opacity-60 flex items-center justify-center cursor-pointer' onClick={() => dispatch(selectAllMovie())}>
                ALL
            </div>
            {availableMovie.map((e) => <div className=' truncate ... cursor-pointer' onClick={() => dispatch(updateSearch({ movie: e }))}>
                <img className='aspect-[12/16] w-full' src={`/api/attachmentHandler/${e.cover}`}></img>
                {e.name}
            </div>)}
        </div>
    </div>
}

//date
const AvailableDate = () => {
    const dispatch = useDispatch();
    return <div>
        <BackArrow onClick={() => dispatch(changeAction("ticket"))}></BackArrow>
        <div className='grid grid-cols-1 md:grid-cols-3'>
            {arrayGen(3).map((e, i) => {
                const d = dayjs().add(i, 'day')
                return <div className='cursor-pointer' onClick={() => dispatch(updateSearch({ date: d.format("YYYY-MM-DD") }))}>
                    <div className="font-bold text-3xl">{`${i == 0 ? "Today" : i == 1 ? "Tomorrow" : d.format('dddd')}`}</div>
                    <div className='text-gray-500'>{d.format("MMM DD, YYYY")}</div>
                </div>
            }
            )}
        </div>
    </div>
}

const AvailableTheatres = () => {
    const dispatch = useDispatch();
    return <div>
        <BackArrow onClick={() => dispatch(changeAction("ticket"))}></BackArrow>
        <Theatres></Theatres>
    </div>
}



export default function Tickets(params) {
    const dispatch = useDispatch();
    const ticketS = useSelector(ticketState);
    const drawerS = useSelector(drawerState);

    useEffect(() => {
        fetch(`/api/theatres`).then((e) => e.json()).then(e => { dispatch(updateTheatresList(e)) })
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