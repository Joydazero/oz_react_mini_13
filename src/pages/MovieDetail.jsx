import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { HEADERS, IMG_PATH } from '../utils/constants' 
import Skeleton from 'react-loading-skeleton';
import { StarRating } from './MovieList';

export default function MovieDetail() {    
    const { id } = useParams();
    const [movie, setMovie ] = useState({})

    const [ isLoading, setIsLoading ] = useState(true);
    
    useEffect( () =>{
        const fetchMovieDetail = async( id ) => {
            try{
                const options = {
                    method: 'GET',
                    headers: HEADERS
                };

                const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko&page=1`, options)
                const json = await data.json()
                console.log(json);
                const movieData = {
                                id: json.id,
                                title: json.title,
                                img: `${IMG_PATH}${json.poster_path}`,
                                date: json.release_date,
                                rating: json.vote_average,
                                overview: json.overview,
                                genres: json.genres,
                                backdrop_path: json.backdrop_path,
                                adult: json.adult,                          
                };
                setMovie(movieData)
            } catch(error){
                console.error("Error fetching movie detail:", error)
            } finally {
                setIsLoading(false)
            }
            
        }
        fetchMovieDetail(id);
    },[id])

    return (
        <> 
            <div className='w-full h-full md:h-dvh relative overflow-hidden'>
                <div className="absolute inset-0 scale-110" aria-hidden="true"   style={
                    {   backgroundImage: movie.backdrop_path ? `url(${IMG_PATH}${movie.backdrop_path})` : undefined,
                        filter: 'blur(20px)', 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transform: 'translateZ(0)',          
                        willChange: 'transform',
                    }}  ></div>
                <div className="absolute inset-0 bg-white/45 dark:bg-black/55 pointer-events-none" />
                <div className='flex flex-col md:flex-row w-full h-full justify-between p-4 relative z-10 text-[#3a3a3a] dark:text-[#fff]'>            
                    <div className='flex flex-5/5 md:flex-2/5 justify-center items-center'>
                        <div className="flex w-full lg:w-[70%] full shadow-sm shadow-black-500/30">                            
                            { isLoading ? 
                                <div className='relative w-[60%] aspect-[2/3] overflow-hidden rounded-xl'>
                                    <Skeleton height="100%" width="100%" containerClassName="absolute inset-0"  
                                    style={{display: 'block'}} />
                                </div>
                            : 
                                <img src={`${IMG_PATH}${movie.img}`} className='w-full h-full' alt="" /> 
                            }
                        </div>
                    </div>
                    <div className='flex flex-3/5 flex-col pr-15 pt-3 xl:pt-2 justify-center bg-cover bg-center sm:pl-10'>
                        <div className='flex flex-col md:flex-row'>
                            <div className='flex font-bold text-3xl xl:text-4xl mr-3 w-full'>{ isLoading ? <Skeleton width={260} /> : movie.title }</div> 
                            <div className='flex items-center mt-1 md:mt-0 xl:text-lg ml-xl]'>{ isLoading ? <Skeleton width={60} /> :  <StarRating rating={movie.rating} /> }</div>
                        </div>
                        <div className='flex mt-3 font-medium xl:text-lg'>
                            { isLoading ? 
                                (<Skeleton width={200} />)
                                :
                                ( movie.genres?.map((g,i) => (<span key={i} className='inline-flex px-[.5rem] py-[.1rem] rounded-[6px] bg-[#e0e0e0] dark:bg-[#b74d4d]  mr-1.5 font-mono text-[#2e2e2e] dark:text-[#fff] text-sm -tracking-2'>{g.name}</span>) ))
                            }
                            </div> 
                        <div className='flex font-normal mt-10 xl:break-words xl:leading-relaxed pb-[3rem] md:pb-20'>
                            {
                                isLoading ? 
                                <div className="w-full h-full">
                                    <Skeleton
                                    width="100%" height="100%"
                                    style={{ display: 'block', width: '100%', borderRadius: '8px' }}
                                    />
                                </div>
                                :
                                movie.overview
                            }   
                            </div>
                    </div>
                </div>
            </div>
        </>    
  )
}
