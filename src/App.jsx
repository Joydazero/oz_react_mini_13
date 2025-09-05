import React, { useEffect, useState, } from 'react'
import './App.scss'
import MovieList from './pages/MovieList'
// import movieListData from './data/movieListData.json'
import Slider from './pages/Slider'
import { HEADERS, IMG_PATH } from './utils/constants' 

function App() {
    const [movies, setMovies] = useState([]); 

    useEffect( () => {
        const fetchMovieList = async() => {
                const options = {
                    method: 'GET',
                    headers: HEADERS
                };

                const data = await fetch(
                  'https://api.themoviedb.org/3/discover/movie'
                  + '?language=ko'
                  + '&sort_by=popularity.desc'
                  + '&include_adult=false'
                  + '&include_video=false'
                  + '&certification_country=US'
                  + '&certification.lte=PG-13'
                  + '&page=1',
                  options
                );
                const json = await data.json();
                console.log(json);
                setMovies(
                    json.results.filter(result => result && result.poster_path && result.adult === false)
                    .map( (result) => {
                        return(
                        {
                            ...result,
                            adult : result.adult,
                            id : result.id,
                            title : result.title,
                            img : `${IMG_PATH}${result.poster_path}`,
                            date : result.release_date,
                            rating :result.vote_average,                           
                        }
                        )

                    })
                )
            }
            fetchMovieList();
  },[]);

  return (
    <> 
      <div className='home__inner'>
        <div className='slider__wrap bg-[#e2e2e25c]'>
          <Slider movies={movies} />
        </div>
        <div className='list__wrap'>          
          <MovieList movies={movies}/>
        </div>
      </div>
    </>
  )
}

export default App 