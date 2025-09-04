import React from 'react'
import moment from 'moment'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import { IMG_PATH } from '../utils/constants'
import { useNavigate } from 'react-router-dom'

export default function Slider({movies}) {
    const navigate = useNavigate();
    const goDetail = (id) => {
        navigate(`/movies/${movies.id}`);
    }
    return (
        
        <Swiper 
            slidesPerView={4}
            spaceBetween={30}
            className="mySwiper">
                {   movies.
                    map( (movie) => {
                        const dateString = movie.release_date;
                        const formattedDate = moment(dateString).format('MM월 DD,YYYY');
                        
                        return(
                            <>
                                <SwiperSlide 
                                onClick={ () => goDetail(movie.id)}
                                key={movie.id} className='border border-1 border-[#ebebeb] text-black bg-[white]'>
                                    <div className='aspect-2/3 overflow-hidden'>
                                        <img src={`${IMG_PATH}${movie.poster_path}`} className='w-ful h-full object-cover' alt="" />
                                    </div>
                                    <div className='px-[1rem] pt-[1rem] font-bold'>{movie.title}</div>
                                    <div className='px-[1rem] pb-[1rem] text-[#737373]'>{formattedDate}</div>
                                </SwiperSlide>
                            </>
                        )
                    })
                }
        </Swiper>
    )
}
