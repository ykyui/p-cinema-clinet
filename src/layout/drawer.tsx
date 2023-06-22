import { closeDrawer, drawerState } from "../redux/drawerSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import Tickets from "../components/tickets";

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
    return <div className={`${drawerS.open ? "block" : "hidden"} flex w-full z-10 fixed top-[40px]`}
        style={{ height: "calc(100vh - 40px)" }}
    >
        <div className="md:flex-1 opacity-50 bg-black"></div>
        <div className="w-full lg:w-auto bg-yellow-300 h-full overflow-y-auto overflow-x-hidden p-5">
            <div className="flex justify-end" onClick={() => dispatch(closeDrawer())}> <CloseIcon /></div>
            {drawerS.drawerType == "TICKETS" ? <Tickets></Tickets> : ""}
            {drawerS.drawerType == "THEATRES" ? "THEATRES" : ""}
            {drawerS.drawerType == "SEARCH" ? "SEARCH" : ""}
            {drawerS.drawerType == "ACCOUNT" ? "ACCOUNT" : ""}
        </div>
    </div >
}
