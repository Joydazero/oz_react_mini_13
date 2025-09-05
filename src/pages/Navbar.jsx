import React, { useState } from 'react'
import logo from '../assets/logo_w.svg'
import { Link ,useNavigate  } from 'react-router-dom';
// import { koreanRegexp } from 'korean-regexp'


export default function Navbar() {     
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState('');
    const handleSearch = (e) => {
        e.preventDefault();
        const trimmed = inputValue.trim();
        if (trimmed === '') return;
        navigate(`/search?movie=${encodeURIComponent(trimmed)}`);

    };
    return (
        <>
            <header className='bg-[#000] h-[70px]'>
                <div className='content'>
                    <nav className='flex items-center'>
                        <Link to='/'>
                            <h1 ><img src={logo} alt="오즈무비 로고"  /></h1>   
                        </Link>
                       <form onSubmit={handleSearch}>
                            <input 
                            className='rounded-[999px] bg-[#fff] xl:h-[2.5rem] xl:w-[30rem] text-black xl:px-[20px] text-[1.1rem]
                            xl:ml-10'
                            type="text"                             
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">검색</button>
                        </form>
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

