import { useSelector } from "react-redux";
import { paymentSlice, paymentState } from "../../redux/paymentSlice";

export default function Payment() {
    const paymentS = useSelector(paymentState);
    return <div>payment</div>
}