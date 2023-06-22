import Banner from '../components/banner'
import dayjs from 'dayjs'
import { Movie } from '../model/movie'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps: GetServerSideProps<{ data: Array<Movie> }> = async (context) => {
  const response = await fetch(`http://${context.req.headers.host}/api/movies?date=${dayjs().format("YYYY-MM-DD")}`)
  const data = await response.json()
  return { props: { data } }
}

export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Banner>
        {data.filter(e => e.promo == 1).map((e) =>
          <a href={`/movie/${e.path}`}>
            <div className='flex justify-center items-center h-full '>
              <img className='object-fill h-full' src={`/api/attachmentHandler/${e.cover}`}></img>
            </div>
          </a>
        )}
      </Banner >
      <div className='p-8 flex justify-center items-center'>
        <div className='max-w-[1024px] '>
          <div>Movies</div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2'>
            {data.map((e, i) => <a href={`/movie/${e.path}`}>
              <div className='aspect-[2/3]'>
                <img src={`/api/attachmentHandler/${e.cover}`}></img>
              </div>
              <p className='whitespace-nowrap overflow-hidden'>
                {e.name}
              </p>
            </a>)}
          </div>
        </div>
      </div >
    </>
  )
}

