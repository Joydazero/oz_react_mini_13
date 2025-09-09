import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import { IMG_PATH  } from '../utils/constants.js'
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux'

export default function Slider({movieData}) {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const [isLoading, setIsLoading] = useState(true)    

    useEffect(() => {
        // movies 값이 들어오면 로딩 종료
        if (movieData.length > 0) setIsLoading(false) 
    }, [movieData])

    const SKELETON_COUNT = 8 // 보여줄 스켈레톤 개수

    if (isLoading) return <div className="p-4 text-white">목록 불러오는 중…</div>;
    if (!movieData.length) return <div className="p-4 text-white">영화가 없습니다.</div>;
  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        className="mySwiper"
        modules={[Pagination]}
        centeredSlides={true}
        centeredSlidesBounds={true}   
        initialSlide={1}            
        breakpoints={{
          200: {
            slidesPerView: 1.1,
            spaceBetween: 10,
            centeredSlides:true,
          },
          300: {
            slidesPerView: 1.2,
            spaceBetween: 10,
            centeredSlides:true,
          },
          640: {
            slidesPerView: 1.5,
            spaceBetween: 10,
            centeredSlides:true,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 1.5,
            spaceBetween: 10,
            centeredSlides:true
          },
        }}
      >
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SwiperSlide key={`skeleton-${i}`}>
              <SkeletonSlide />
            </SwiperSlide>
            ))
          : movieData.map((movie) => {
            const dateString = movie.date
            const formattedDate = moment(dateString).format('MM월 DD, YYYY')
            //console.log(movieData);
            
            return (
                <SwiperSlide
                key={movie.id}
                className="w-[50%] border-[.5px] border-[#a0a0a0] text-black rounded-[5px] overflow-hidden relative"
                >
                    <Link to={`/movies/${movie.id}`} className="block bg-white dark:bg-[#1b1b1b]">
                    <div className="aspect-square md:aspect-[16/9] overflow-hidden">
                        <img
                        src={movie.backimg}
                        className="w-full h-full object-cover"
                        alt={movie.title}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" aria-hidden="true"></div>
                    <div className='absolute bottom-0 inset-x-0 bg-[rgba(0,0,0,0.2)] '>
                      <div className="text-2xl px-[.9rem] pt-[.9rem] font-medium overflow-hidden text-ellipsis truncate text-[#fff] dark:text-[#fff]">
                        {movie.title}
                      </div>
                      <div className="px-[.9rem] pb-[.9rem] text-[#cdcdcd] text-[.9rem] font-light mt-0.5">
                        {formattedDate}
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              )
            })}
      </Swiper>
    </SkeletonTheme>
  )
}

function SkeletonSlide() {
  return (
    <div className="w-full h-full flex flex-col rounded-lg border border-[#ccc] shadow-md overflow-hidden">
      <div className="aspect-[2/3] w-full">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-4">
        <Skeleton height={20} width="80%" />
        <Skeleton height={16} width="50%" style={{ marginTop: '0.5rem' }} />
      </div>
    </div>
  )
}