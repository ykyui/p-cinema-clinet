import { useSelector } from "react-redux";
import { paymentSlice, paymentState } from "../../redux/paymentSlice";
import { useEffect } from "react";
import { TicketsTransaction } from "../../model/ticketsTransaction";

export default function Payment() {
  const paymentS = useSelector(paymentState);
  useEffect(() => {
    const req: TicketsTransaction = {
      transactionId: 0,
      fieldId: paymentS.field,
      status: "",
      lastUpdateTime: "",
      adult: paymentS.adult,
      student: paymentS.student,
      child: paymentS.child,
      disabled: paymentS.disabled,
      boughtSeat: paymentS.selectedSeat,
    };
    fetch(`/api/transaction/purchaseTickets`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
  }, []);
  return <div>payment</div>;
}
