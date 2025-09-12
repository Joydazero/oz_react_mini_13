import React, { useEffect, useState, } from 'react'
import './App.scss'
import MovieList from './pages/MovieList'
import Slider from './pages/Slider'
import { HEADERS, IMG_PATH } from './utils/constants' 
import { useSelector } from 'react-redux';
import { supabase } from './supabase/supabaseClient';

function App() {  
  const [user, setUser] = useState(null);
   useEffect(() => {
      const getUser = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (data?.user) {
          setUser(data.user);
        }
      };
      getUser();

      const { data: listener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === "SIGNED_IN") setUser(session.user);
          if (event === "SIGNED_OUT") setUser(null);
        }
      );

      return () => {
        listener.subscription.unsubscribe();
      };
    }, []);

    const handleLogout = async () => {
      await supabase.auth.signOut();
      setUser(null);
    };

  const darkMode = useSelector((state) => state.theme.darkMode );

  const [movieData, setMovies] = useState([]); 
  const [sliderData, setSliderData] = useState([]);
   
  // common mapper
  const mapMovie = ( result ) => (
     {
        ...result,
        adult : result.adult,
        id : result.id,
        title : result.title,
        img : `${IMG_PATH}${result.poster_path}`,
        backimg : `${IMG_PATH}${result.backdrop_path}`,
        date : result.release_date,
        rating: result.vote_average ?? 0,                     
    }
  )

  // common fetch 
  const fetchMovies = async (url) => {
    const data = await fetch(url, { method: 'GET', headers: HEADERS });
    if (!data.ok) throw new Error(`HTTP ${data.status}`);
    const json = await data.json();
    console.log(json);
    return(
      (json.results || []).filter(result => result && result.poster_path && result.adult === false)
      .map(mapMovie)
    )
  }
    useEffect( () => {
      ( async () => {
        try {
          
          const sliderUrl = 
                  'https://api.themoviedb.org/3/trending/movie/week'
                  + '?language=ko'
                  + '&sort_by=popularity.desc'
                  + '&include_adult=false'
                  + '&include_video=false'
                  + '&certification_country=US'
                  + '&certification.lte=PG-13'
                  + '&page=1'
          ;

          const listUrl =
                  'https://api.themoviedb.org/3/discover/movie'
                  + '?language=ko'
                  + '&sort_by=popularity.desc'
                  + '&include_adult=false'
                  + '&include_video=false'
                  + '&certification_country=US'
                  + '&certification.lte=PG-13'
                  + '&page=1';

          const [slider, list] = await Promise.all([
            fetchMovies(sliderUrl),
            fetchMovies(listUrl),
          ]);

          setSliderData(slider);
          setMovies(list);

        } catch (e) {
          console.error(e);
        }

       })();
  }, []);

  return (
    <> 
      <div >
        <div className='pt-[20px] pb-[20px] lg:px-[15px] bg-[#dfdfdf] dark:bg-[#1b1b1b]'>
          <Slider movieData={sliderData}  />
        </div>
        <div className='list__wrap px-[10px] pt-[20px] pb-[20px] lg:px-[4rem] lg:pb-[3rem] dark:bg-[#1b1b1b]'>          
          <MovieList movieData={movieData}  />
        </div>
      </div>
    </>
  )
}

export default App 