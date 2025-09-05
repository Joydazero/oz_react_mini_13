import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function MovieList({movies = []}) {
      const [isLoading, setIsLoading] = useState(true)

        useEffect(() => {
            // movies 값이 들어오면 로딩 종료
            if (movies.length > 0) setIsLoading(false)
        }, [movies])

        const SKELETON_COUNT = 10 // 보여줄 스켈레톤 개수
    return (
        <>
        {/* <div className='grid grid-cols-5 gap-5'>
            {
                movies.map( (movie) => {
                    return <MovieCard key={movie.id} movie={movie}></MovieCard>
                })
            }
        </div> */}
        <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
            <div className="grid grid-cols-5 gap-5">
                {isLoading
                ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                    <SkeletonCard key={`skeleton-${i}`} />
                    ))
                : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
         </SkeletonTheme>
        </>
    )
   
}
export function MovieCard({movie}) {
    return (
    <Link to={`/movies/${movie.id}`} className='movie-card-con shadow-md border border-[#ccc] rounded-[10px]'>
        <div className='flex flex-col justify-start items-start gap-[.625rem] px-[.625rem] py-[.625rem]'>
            <div className='aspect-[2/3] w-full overflow-hidden'>
                <img src={movie.img} alt="" className="w-full h-full object-cover" />
            </div>
            <p className='font-bold min-h-[48px] max-h-[48px]'>{movie.title}</p>
            <span>{movie.date}</span>
            <span>{movie.rating}</span>
            <span>{movie.adult.toString()}</span>
        </div>
    </Link>
    )
}
function SkeletonCard() {
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