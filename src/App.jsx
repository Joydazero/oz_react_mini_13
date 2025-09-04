import { useState } from 'react'
import './App.scss'
import MovieList from './pages/MovieList'
import MovieDetail from './pages/MovieDetail'
import movieListData from './data/movieListData.json'
import Slider from './pages/Slider'

function App() {
  const [movies, setMovies] = useState(movieListData.results);

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
