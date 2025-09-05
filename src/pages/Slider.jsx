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

export default function Slider() {
    const { data: movies, loading, error } = useSelector(state => state.movies); 
    const [isLoading, setIsLoading] = useState(true)    

    useEffect(() => {
        // movies 값이 들어오면 로딩 종료
        if (movies.length > 0) setIsLoading(false) 
    }, [movies])
    const SKELETON_COUNT = 8 // 보여줄 스켈레톤 개수

    if (loading) return <div className="p-4 text-white">목록 불러오는 중…</div>;
    if (error) return <div className="p-4 text-red-400">에러: {error}</div>;
    if (!movies.length) return <div className="p-4 text-white">영화가 없습니다.</div>;
  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        className="mySwiper"
        modules={[Pagination]}
      >
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SwiperSlide key={`skeleton-${i}`}>
              <SkeletonSlide />
            </SwiperSlide>
            ))
          : movies.map((movie) => {
            const dateString = movie.release_date
            const formattedDate = moment(dateString).format('MM월 DD, YYYY')
            console.log(movies);
            
            return (
                <SwiperSlide
                key={movie.id}
                className="border border-[#ebebeb] text-black bg-white rounded-lg overflow-hidden"
                >
                    <Link to={`/movies/${movie.id}`} className="block">
                    <div className="aspect-[2/3] overflow-hidden">
                        <img
                        src={movie.img}
                        className="w-full h-full object-cover"
                        alt={movie.title}
                      />
                    </div>
                    <div className="px-[1rem] pt-[1rem] font-bold overflow-hidden text-ellipsis truncate">
                      {movie.title}
                    </div>
                    <div className="px-[1rem] pb-[1rem] text-[#737373]">
                      {formattedDate}
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