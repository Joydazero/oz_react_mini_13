import React from 'react'
import movieListData from '../data/movieListData.json'
import { Link } from 'react-router-dom'
import { IMG_PATH } from '../utils/constants' 
export default function MovieList() {
    return (
    <>
    <div className='grid grid-cols-5 gap-5'>
    {
        movieListData.results.map( (movie) => {
            return <MovieCard key={movie.id} movie={movie}></MovieCard>
        })
    }
    </div>
        </>
    )
}
export function MovieCard({movie}) {
    return (
    <Link to={`/movies/${movie.id}`} className='movie-card-con shadow-md border border-[#ccc] rounded-[10px]'>
        <div className='flex flex-col justify-start items-start gap-[.625rem] px-[.625rem] py-[.625rem]'>
            <div className='aspect-[2/3] w-full overflow-hidden'>
                <img src={`${IMG_PATH}${movie.poster_path}`} alt="" className="w-full h-full object-cover" />
            </div>
            <p className='font-bold min-h-[48px] max-h-[48px]'>{movie.title}</p>
            <span>{movie.release_date}</span>
            <span>{movie.vote_average}</span>
        </div>
    </Link>
    )
}
