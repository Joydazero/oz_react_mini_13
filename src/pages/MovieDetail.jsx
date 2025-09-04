import React, { useState } from 'react'
import movieDetailData from '../data/movieDetailData.json'
import { useParams } from 'react-router-dom'
import { IMG_PATH } from '../utils/constants'

export default function MovieDetail() {    
    const { id } = useParams();
    const [moviesDetail, setmoviesDetail] = useState(movieDetailData)
    return (
    <> 
    <div className='w-full h-dvh relative overflow-hidden'>
        <div className="absolute inset-0 scale-110" aria-hidden="true"   style={
            {   backgroundImage: `url(${IMG_PATH}${moviesDetail.belongs_to_collection.backdrop_path})`,
                filter: 'blur(20px)', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: 'translateZ(0)',          
                willChange: 'transform',
            }}  ></div>
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />
        <div className='flex flex-row w-full h-full justify-between p-4 relative z-10 text-white'>            
            <div className='flex flex-2/5 justify-center items-center'>
                <div className="flex w-[60%]">
                    <img src={`${IMG_PATH}${moviesDetail.belongs_to_collection.poster_path}`} className='w-full h-full' alt="" />
                </div>
            </div>
            <div className='flex flex-3/5 flex-col pr-10 pt-3 justify-end-safe bg-cover bg-center'>
                <div className='flex flex-row'>
                    <div className='flex font-bold xl:text-4xl mr-3'>{moviesDetail.belongs_to_collection.name}</div>
                    <div className='flex items-center xl:text-lg ml-xl'>🌟 {moviesDetail.vote_average}</div>
                </div>
                <div className='flex mt-3 font-medium xl:text-lg'>{moviesDetail.genres.map(g => g.name).join(" • ")}</div>
                <div className='flex font-normal mt-10 xl:break-words xl:leading-relaxed pb-20'>{moviesDetail.overview}</div>
            </div>
        </div>
    </div>
    </>    
  )
}
