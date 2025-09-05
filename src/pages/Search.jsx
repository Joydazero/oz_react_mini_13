import React, { useState } from 'react'
import { getRegExp } from 'korean-regexp';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { selectMoviesByRegExp } from '../RTK/selctor'; 
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';


export default function Search() {
        const [searchParams] = useSearchParams();
        const [isLoading, setIsLoading] = useState(true);

        const param = searchParams.get('movie') || ''; // null 방지
        const reg = param ? getRegExp(param) : null;
        const movieSel = param ? useSelector(selectMoviesByRegExp(reg)) : [];
//        useDebounce()

        useEffect(() => {
            setIsLoading(true);
            const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // 로딩 딜레이 (0.5초)

        return () => clearTimeout(timer);
        }, [param]);

        

        return (
        <div className="p-[3rem] pb-[10rem]">
        <div className="flex justify-center items-center flex-col">
            <h2 className="text-xl font-bold mb-4">검색 결과 :</h2>

            {param === '' ? (
            <p>검색어를 입력해주세요.</p>
            ) : isLoading ? (
            movieSel.length > 0 ? (
                <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
                <div className="grid grid-cols-5 gap-5">
                    {Array.from({ length: movieSel.length }).map((_, i) => (
                    <SkeletonCard key={`skeleton-${i}`} />
                    ))}
                </div>
                </SkeletonTheme>
            ) : (
                <p>검색 결과가 없습니다.</p>
            )
            ) : movieSel.length === 0 ? (
            <p>검색 결과가 없습니다.</p>
            ) : (
            <div className="grid grid-cols-5 gap-5">
                {movieSel.map((indata) => (
                <MovieSearchCard key={indata.id} indata={indata} />
                ))}
            </div>
            )}
        </div>
        </div>
    );
}


export function MovieSearchCard({ indata }) {
  return (
    <Link to={`/movies/${indata.id}`} className='movie-card-con shadow-md border border-[#ccc] rounded-[10px]'>
        <div className='flex flex-col justify-start items-start gap-[.625rem] px-[.625rem] py-[.625rem]'>
            <div className='aspect-[2/3] w-full overflow-hidden'>
                <img src={indata.img} alt="" className="w-full h-full object-cover" />
            </div>
            <p className='font-bold min-h-[48px] max-h-[48px]'>{indata.title}</p>
            <span>{indata.date}</span>
            <span>{indata.rating}</span>
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



// const [search, setSearch] = useState('');
// const debouncedSearch = useDebounce(search, 500);

// useEffect(() => {
//   if (debouncedSearch) {
//     fetchData(debouncedSearch);
//   }
// }, [debouncedSearch]);