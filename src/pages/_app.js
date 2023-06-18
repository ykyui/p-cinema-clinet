import NavBar from '@/layout/navbar'
import '@/styles/globals.css'
import { wrapper } from "../redux/store";
import Drawer from '@/layout/drawer';


export default wrapper.withRedux(function App({ Component, pageProps }) {
  return <>
    <NavBar></NavBar>
    <Drawer></Drawer>
    <Component {...pageProps} />
  </>
})
