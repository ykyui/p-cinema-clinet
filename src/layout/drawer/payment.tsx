import { useDispatch, useSelector } from "react-redux";
import { paymentSlice, paymentState, transactionUpdateToken } from "../../redux/paymentSlice";
import { useEffect, useState } from "react";
import { TicketsTransaction } from "../../model/ticketsTransaction";
import LoadingSpin from "../../components/loadingSpin";
import Button from "../../components/button";
import { closeDrawer, openDrawer } from "../../redux/drawerSlice";
import jwt_decode from "jwt-decode";

export default function Payment() {
    const dispatch = useDispatch()
    const paymentS = useSelector(paymentState);
    const [loading, setLoading] = useState(true)
    const [paymentLoading, setPaymentLoading] = useState(false)
    const [paymentResult, setPaymentResult] = useState<{ success: boolean }>()

    useEffect(() => {
        const req: TicketsTransaction = {
            transactionId: 0,
            fieldId: paymentS.field.fieldId,
            status: "",
            lastUpdateTime: "",
            adult: paymentS.adult,
            student: paymentS.student,
            child: paymentS.child,
            disabled: paymentS.disabled,
            boughtSeat: paymentS.selectedSeat,
        };
        fetch(`/api/transaction/checkout`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        }).then(async res => {
            if (res.status == 200) {
                return res.json()
            }
            throw new Error(await res.text());
        }).then((res: { transactionJwt: string }) => {
            dispatch(transactionUpdateToken(res.transactionJwt))
        }).catch(e => {
            dispatch(openDrawer("TICKETS"))
        }).finally(() => {
            setLoading(false)
        });
    }, []);

    const checkout = () => {
        setPaymentLoading(true)
        fetch(`/api/transaction/pay`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        }).then(async res => {
            if (res.status == 200) {
                setPaymentResult(await res.json())
            }
        }).finally(() => setPaymentLoading(false))
    }

    return <div className="w-full lg:w-[600px] flex items-center justify-center h-full ">
        <div>
            <LoadingSpin loading={loading} >
                <div>Payment</div>
                <p>It is locked seat now, if you cancel will after 3 min release the seat</p>
                <p>Click the button to finish the payment</p>
                <p>If you want to verify payment you can go to portal payment function check it out</p>
                <p>Your transaction id is <b>{paymentS.transactionToken != undefined ? jwt_decode<{ transactionId: number }>(paymentS.transactionToken).transactionId : ""}</b></p>
                {paymentResult == undefined ? <LoadingSpin loading={paymentLoading}><Button onClick={checkout}>Pay</Button></LoadingSpin> :
                    (paymentResult.success?"success":"fail")}
            </LoadingSpin>
        </div>
    </div>
}
