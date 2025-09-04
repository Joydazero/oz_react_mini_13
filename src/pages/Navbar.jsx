import React, { useState } from 'react'
import logo from '../assets/logo_w.svg'
import { Link } from 'react-router-dom';

export default function Navbar() {
 const [inputValue, setInputValue] = useState("");

  return (
    <>
    <header className='bg-[#000]'>
        <div className='content'>
            <nav className='flex items-center'>
                <Link to='/'>
                    <h1 ><img src={logo} alt="오즈무비 로고"  /></h1>   
                </Link>
                <input 
                className='rounded-[999px] bg-[#fff] xl:h-[2.5rem] xl:w-[30rem] text-black xl:px-[20px] text-[1.1rem]
                xl:ml-10'
                type="text"
                value={inputValue}
                onChange={ (e) => {setInputValue(e.target.value) }}
                />
                <div className='nav__controls'>
                    <button className='nav__controls-btn login'>로그인</button>
                    <button className='nav__controls-btn join'>회원가입</button>
                </div>                          
            </nav>
        </div>
    </header>
    </>    
  )
}
