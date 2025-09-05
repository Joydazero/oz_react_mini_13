import React, { useEffect, useState } from 'react'
// import movieDetailData from '../data/movieDetailData.json'
import { useParams } from 'react-router-dom'
import { HEADERS, IMG_PATH } from '../utils/constants' 
import Skeleton from 'react-loading-skeleton';

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
                setMovie(json)
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
            <div className='w-full h-dvh relative overflow-hidden'>
                <div className="absolute inset-0 scale-110" aria-hidden="true"   style={
                    {   backgroundImage: movie.backdrop_path ? `url(${IMG_PATH}${movie.backdrop_path})` : undefined,
                        filter: 'blur(20px)', 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transform: 'translateZ(0)',          
                        willChange: 'transform',
                    }}  ></div>
                <div className="absolute inset-0 bg-black/55 pointer-events-none" />
                <div className='flex flex-row w-full h-full justify-between p-4 relative z-10 text-white'>            
                    <div className='flex flex-2/5 justify-center items-center'>
                        <div className="flex w-[60%] full">                            
                            { isLoading ? 
                                <div className='relative w-[60%] aspect-[2/3] overflow-hidden rounded-xl'>
                                    <Skeleton height="100%" width="100%" containerClassName="absolute inset-0"  
                                    style={{display: 'block'}} />
                                </div>
                            : 
                                <img src={`${IMG_PATH}${movie.poster_path}`} className='w-full h-full' alt="" /> 
                            }
                        </div>
                    </div>
                    <div className='flex flex-3/5 flex-col pr-10 pt-3 justify-end-safe bg-cover bg-center'>
                        <div className='flex flex-row'>
                            <div className='flex font-bold xl:text-4xl mr-3'>{ isLoading ? <Skeleton width={260} /> : movie.name }</div> 
                            <div className='flex items-center xl:text-lg ml-xl'>{ isLoading ? <Skeleton width={60} /> : `🌟 ${movie.vote_average}`}</div>
                        </div>
                        <div className='flex mt-3 font-medium xl:text-lg'>
                            { isLoading ? 
                                (<Skeleton width={200} />)
                                :
                                ( movie.genres?.map(g => g.name).join(" • ") )
                            }
                            </div> 
                        <div className='flex font-normal mt-10 xl:break-words xl:leading-relaxed pb-20'>
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
