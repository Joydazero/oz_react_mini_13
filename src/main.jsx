import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MovieList from './pages/MovieList'
import MovieDetail from './pages/MovieDetail'
import Layout from './pages/Layout'


// const App = lazy( () => import('./App'))
// const MovieList = lazy(() => import('./pages/MovieList')) 
// const MovieDetail = lazy(() => import('./pages/MovieDetail')) 
// const Layout = lazy(() => import('./pages/Layout')) 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  
      {/* <Suspense fallback={<div>로딩 중입니다...</div>}> </Suspense> */}
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index  element={<App />} />
            <Route path='movies' element={<MovieList />}></Route>
            <Route path='movies/:id' element={<MovieDetail />}></Route>   
            <Route path="*" element={<div>Not Found</div>} />
          </Route> 
        </Routes>
     
    </BrowserRouter>
  </StrictMode>
)
