import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Layout() {
   const darkMode = useSelector((state) => state.theme.darkMode);  

    useEffect( () => {
      if( darkMode ) {
        document.documentElement.classList.add('dark');
      }else{
        document.documentElement.classList.remove('dark');
      }
    },[darkMode])
   
  return (    
    <>
        <Navbar  />
        <main className='pt-[110px] md:pt-[80px] h-full bg-[#fff] dark:bg-[#1b1b1b]'>
            <Outlet />
        </main>
    </>
  )
}
