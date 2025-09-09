import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { StarIcon } from '@heroicons/react/24/solid';

export default function MovieList({movieData}) {

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        // movies 값이 들어오면 로딩 종료
        if (movieData.length > 0) setIsLoading(false)
    }, [movieData])
    const SKELETON_COUNT = 10 // 보여줄 스켈레톤 개수

    if (isLoading) return <div className="p-4 text-white">목록 불러오는 중…</div>;    
    if (!movieData.length) return <div className="p-4 text-white">영화가 없습니다.</div>;
      
        
    return (
        <>
        <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {isLoading
                ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                    <SkeletonCard key={`skeleton-${i}`} />
                    ))
                : movieData.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
         </SkeletonTheme>
        </>
    )
   
}
export function MovieCard( {movie }) {
    return (
    <Link to={`/movies/${movie.id}`} className='movie-card-con shadow-md border border-[#f0f0f0] dark:border-[#151515] rounded-[10px] block relative
    dark:hover:border-[#fff] dark:border-.5'>
        <div className='flex flex-col justify-start items-start gap-[.625rem] px-[.625rem] py-[.625rem] dark:text-[#fff]'>
            <div className='aspect-[2/3] w-full overflow-hidden'>
                <img src={movie.img} alt="" className="w-full h-full object-cover" />
            </div>
            <p className='font-bold mt-3 -tracking-2 text-[1.1rem] block'>{movie.title}</p>
            <span className='font-light text-[.9rem] dark:text-[#cdcdcd] block'>{movie.date}</span>
            <span className='font-normal block'>
                <StarRating rating={movie.rating} />
            </span>
        </div>
    </Link>
    )
}
export function SkeletonCard() {
    return (
        <div className="shadow-md border border-[#ccc] rounded-[10px] overflow-hidden">
        <div className="flex flex-col gap-[.625rem] px-[.625rem] py-[.625rem]">
            <div className="aspect-[2/3] w-full overflow-hidden rounded">
            <Skeleton className="w-full h-full" />
            </div>
            <Skeleton height={20} width="90%" />
            <Skeleton height={16} width="60%" />
            <Skeleton height={16} width="40%" />
            <Skeleton height={16} width="30%" />
        </div>
        </div>
    )
}


export  function StarRating({ rating }) {
  const stars = Math.round(rating / 2);
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i}  className={`h-5 w-5 ${i < stars ? "text-yellow-500" : "text-gray-400"}`}
        />
      ))}
      <span className="ml-2 text-sm text-[#000] dark:text-[#fff">{rating.toFixed(1)}</span>
    </div>
  );
}