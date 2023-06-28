import { closeDrawer, drawerState } from "../../redux/drawerSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import Tickets from "./tickets";
import Theatres from "./theatres";
import Payment from "./payment";

function disableScrolling() {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () { window.scrollTo(x, y); };
}

function enableScrolling() {
    console.log("enable")
    window.onscroll = function () { };
}


export default function Drawer(params) {
    const drawerS = useSelector(drawerState);
    const dispatch = useDispatch();
    useEffect(() => {
        if (drawerS.open) {
            document.body.style.overflow = "hidden"
            disableScrolling()
        }
        else {
            document.body.style.overflow = "auto"
            enableScrolling()
        }
    }, [drawerS.open])
    if (!drawerS.open) return ""
    return <div className={`${drawerS.open ? "block" : "hidden"} flex w-full h-full z-10 fixed top-[40px] md:top-[80px]`}>
        <div className="md:flex-1 opacity-50 bg-black" onClick={() => dispatch(closeDrawer())}></div>
        <div className="w-full lg:w-auto h-full overflow-y-auto overflow-x-hidden p-5 " style={{ "backgroundImage": "linear-gradient(black,blue)" }}>
            <div className="flex justify-end absolute right-5" onClick={() => dispatch(closeDrawer())}> <CloseIcon /></div>
            {drawerS.drawerType == "TICKETS" ? <Tickets /> : ""}
            {drawerS.drawerType == "THEATRES" ? <Theatres /> : ""}
            {drawerS.drawerType == "PAYMENT" ? <Payment /> : ""}
            {drawerS.drawerType == "SEARCH" ? "SEARCH" : ""}
            {drawerS.drawerType == "ACCOUNT" ? "ACCOUNT" : ""}
        </div>
    </div >
}
