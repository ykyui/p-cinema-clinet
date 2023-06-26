import { useDispatch, useSelector } from "react-redux";
import { selectAllTheatres, ticketState, updateSearch } from "../../redux/ticketSlice";
import { useEffect } from "react";
import { drawerState, openDrawer } from "../../redux/drawerSlice";

export default function Theatres() {
    const dispatch = useDispatch();
    const ticketS = useSelector(ticketState);
    return <div className="w-full lg:min-w-[1120px] lg:max-w-[1120px] space-y-4">
        <div className="text-3xl font-bold">Select a theatre</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[{ name: "All" }, ...ticketS.availableTheatres].map((e, i) => <div className={`cursor-pointer ${i == 0 ? "md:col-span-2" : ""}`} onClick={() => {
                if (e.name == "All")
                    dispatch(selectAllTheatres())
                else
                    dispatch(updateSearch({ theatre: e }))
                dispatch(openDrawer('TICKETS'))

            }}>{e.name}</div>)}
        </div>
    </div>
}