import NavBar from '../layout/navbar'
import '../styles/globals.css'
import { wrapper } from "../redux/store";
import Drawer from '../layout/drawer/drawer';
import { headState, updateHead } from '../redux/headSlice';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { updateTheatresList } from '../redux/ticketSlice';


export default wrapper.withRedux(function App({ Component, pageProps }) {
  const dispatch = useDispatch()

  useEffect(() => {
    fetch(`/api/theatres`).then((e) => e.json()).then(e => { dispatch(updateTheatresList(e)) })
  }, [])

  return <>
    <Head>
      <title>Cinema</title>
    </Head>
    <NavBar></NavBar>
    <Drawer></Drawer>
    <Component {...pageProps} />
  </>
})
