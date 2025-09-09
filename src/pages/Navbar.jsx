import React, { useEffect, useState } from 'react'
import logBlack from '../assets/cndb-logo-black.svg'
import logWhite from '../assets/cndb-logo-white.svg'
import { Link ,useNavigate  } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import ThemeToggleButton from './ThemeToggleButton';
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../store/themeSlice'

export default function Navbar() {     
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);
    const navigate = useNavigate()
    const [inputTouched, setInputTouched] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const debouncedInput = useDebounce( inputValue, 1000 );

    useEffect( () => {
        const trimmed = debouncedInput.trim()
        if (inputTouched) {
                navigate(`/search?movie=${encodeURIComponent(trimmed)}`)
        }
    },[debouncedInput])
    return (
        <>
            <header className='w-full fixed top-0 left-0 z-50 transition-[top] duration-200 ease-linear flex items-center justify-center bg-[#eaeaea] dark:bg-[#000] h-[110px] md:h-[80px]'>
                <div className='content w-full'>
                    <nav className='items-center flex flex-wrap px-[15px] md:px-[1rem] justify-between md:flex-nowrap'>
                        <Link to='/' className='w-1/4 text-left  xl:w-auto md:order-1 relative z-10 md:mr-[15px]'>
                            <h1 className='w-[130px] md:w-[9rem]'>
                                {darkMode ? (<img src={logWhite} alt="라이트 모드" className='w-full h-full' /> ): <img src={logBlack} alt="라이트 모드" className='w-full h-full' />}
                            </h1>   
                        </Link>
                        <div className="flex md:order-3 ml-auto mr-[10px] md:mr-[1rem]">
                        <ThemeToggleButton ></ThemeToggleButton>
                        </div>
                        <div className='nav__controls md:text-right flex justify-end md:w-auto md:order-4'>
                            <button className='text-[#e6e6e6] bg-[#335de7] :hoverbg-[#4f6ccd] dark:bg-[#2b2a2a] dark:hover:bg-[#3b3b3b] hover:text-[#fff] transition linear duration-100 flex justify-center items-center rounded-[3px] py-[.3rem] px-[.6rem] text-[.8rem] md:text-[.9rem] mr-[.5rem]
                            '>로그인</button>
                            <button className='text-[#e6e6e6] bg-[#335de7] :hoverbg-[#4f6ccd] dark:bg-[#2b2a2a] dark:hover:bg-[#3b3b3b] hover:text-[#fff] transition linear duration-100 flex justify-center items-center rounded-[3px] py-[.3rem] px-[.6rem] text-[.8rem] md:text-[.9rem]
                            '>회원가입</button>
                        </div>       
                            <input 
                            className='rounded-[999px] bg-[#fff] w-full h-[2rem] md:h-[2.3rem] text-left text-black mt-[15px] md:mt-0 xl:px-[20px] text-[1.1rem]
                            xl:ml-10 md:w-[20rem] lg:w-[35rem] md:order-2 px-[20px] dark:bg-[#2b2a2a] dark:text-[#fff] dark:hover:outline-white dark:hover:outline-1
                            :hover:outline-[#e9e9e9] hover:outline-1'
                            type="text"                             
                            value={inputValue} 
                            onFocus={() => setInputTouched(true)}
                            onChange={(e) => {
                                setInputValue(e.target.value)
                                setInputTouched(true) 
                                }
                            }
                            />            
                    </nav>
                </div>
            </header>
        </>    
    )
}

