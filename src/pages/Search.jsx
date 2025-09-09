import React, { useState } from 'react'
import { getRegExp } from 'korean-regexp';
import { Link, useSearchParams } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { HEADERS, IMG_PATH } from '../utils/constants' 
import { StarIcon } from '@heroicons/react/24/solid';
import { StarRating } from './MovieList';

export default function Search() {
        const [searchParams] = useSearchParams();
        const [isLoading, setIsLoading] = useState(true);
        const [movieData, setMovies] = useState([]);

        const param = searchParams.get('movie') || '';
        const debouncedParam = useDebounce(param, 500);

            useEffect( () => {
                const fetchSearchMovieList = async() => {
                    setIsLoading(true);
                    try {

                        const options = {
                            method: 'GET',
                            headers: HEADERS
                        };
        
                        // const res = await fetch(
                        //     'https://api.themoviedb.org/3/discover/movie'
                        //     + '?language=ko'
                        //     + '&sort_by=popularity.desc'
                        //     + '&include_adult=false'
                        //     + '&include_video=false'
                        //     + '&certification_country=US'
                        //     + '&certification.lte=PG-13'
                        //     + '&page=1',
                        //     options
                        // );
                        // const json = await res.json();
                        // console.log(json);


                        const discoverRes = await fetch('https://api.themoviedb.org/3/discover/movie'
                            + '?language=ko'
                            + '&sort_by=popularity.desc'
                            + '&include_adult=false'
                            + '&include_video=false'
                            + '&certification_country=US'
                            + '&certification.lte=PG-13'
                            + '&page=1',
                            options
                        );
                        const discoverJson = await discoverRes.json();
                        const trendingRes = await fetch(
                            "https://api.themoviedb.org/3/trending/movie/week?language=ko",
                            options
                        );
                        const trendingJson = await trendingRes.json();
                        const combinedResults = [...(discoverJson.results || []), ...(trendingJson.results || [])];

                        const uniqueResults = Array.from(
                            new Map(combinedResults.map(movie => [movie.id, movie])).values()
                        );

                        const movieData = uniqueResults.filter((result) => result && result.poster_path && result.title && result.adult === false)
                        .map((result) => ({
                                    ...result,
                                    adult : result.adult,
                                    id : result.id,
                                    title : result.title,
                                    img : `${IMG_PATH}${result.poster_path}`,
                                    date : result.release_date,
                                    rating :result.vote_average,                           
                        }));

                        if (debouncedParam.trim() === '') {
                            setMovies([]);
                        } else {
                        const keyword = debouncedParam.trim();
                        const regex = getRegExp(keyword, { initialSearch: true });
                        const lowerKeyword = keyword.toLowerCase().replace(/\s/g, '');
                        const filtered = movieData.filter((movie) => {
                            const title = movie.title.toLowerCase().replace(/\s/g, '');
                            return regex.test(movie.title) || title.includes(lowerKeyword);
                        });
                        setMovies(filtered);
                        }
                    } catch (e) {
                        console.error(e);
                        setMovies([]);
                    } finally {
                        setIsLoading(false);
                    }
                    };
                    fetchSearchMovieList();
                }, [debouncedParam]);
        

        useEffect(() => {
            setIsLoading(true);
            const timer = setTimeout(() => {
            setIsLoading(false);
            }, 500);

            return () => clearTimeout(timer);
        }, [debouncedParam]);

        

        return (
        <div className="p-[1rem] pb-[5rem] md:p-[3rem] md:pb-[10rem] dark:bg-[#1b1b1b]">
        <div className="flex justify-center items-center flex-col">
            <h2 className="text-xl font-bold mb-4 dark:text-[#fff]"><small className='mr-[10px]'>🔎</small>검색 결과 :</h2>

            {debouncedParam.trim() === '' ? (
            <p>검색어를 입력해주세요.</p>
            ) : isLoading ? (
                <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
                <div className="grid grid-cols-5 gap-3">
                {Array.from({ length: 10 }).map((_, i) => (
                    <SkeletonCard key={`skeleton-${i}`} />
                ))}
            </div>
                </SkeletonTheme>
            ) : movieData.length === 0 ? (
                <p>검색 결과가 없습니다.</p>
            ) : (
            <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-4 xl:gap-5 xl:grid-cols-5">
                {movieData.map((movie) => (
                <MovieSearchCard key={movie.id} movie={movie} />
                ))}
            </div>
            )}
        </div>
        </div>
    );
}


export function MovieSearchCard({ movie }) {
  return (
    <Link  to={`/movies/${movie.id}`} className='movie-card-con shadow-md border border-[#f0f0f0] dark:border-[#151515] rounded-[10px] block relative
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
