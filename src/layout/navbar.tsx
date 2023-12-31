import Button from "../components/button"
import { openDrawer } from "../redux/drawerSlice";
import { useDispatch } from "react-redux";



export default function NavBar(params) {
    const dispatch = useDispatch()
    return <div className="flex justify-between z-10 sticky top-0 bg-black text-white md:px-8 md:h-20 items-center">
        <div>
            <Button className="bg-transparent" link="/">HOME</Button>
        </div>
        <div className="flex justify-center md:justify-end overflow-hidden">
            <Button className="bg-transparent" onClick={() => dispatch(openDrawer('TICKETS'))}>TICKETS</Button>
            <Button className="bg-transparent" onClick={() => dispatch(openDrawer('THEATRES'))}>THEATRES</Button>
            {/* <Button className="bg-transparent" onClick={() => dispatch(openDrawer('SEARCH'))}>SEARCH</Button> */}
            {/* <Button className="bg-transparent" onClick={() => dispatch(openDrawer('ACCOUNT'))}>ACCOUNT</Button> */}
        </div>
    </div>

}