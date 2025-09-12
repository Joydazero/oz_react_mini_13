import React, { useEffect, useState } from 'react'
import logBlack from '../assets/cndb-logo-black.svg'
import logWhite from '../assets/cndb-logo-white.svg'
import { Link ,NavLink,useNavigate  } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import ThemeToggleButton from './ThemeToggleButton';
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../store/themeSlice';
import { supabase } from '../supabase/supabaseClient';
import personFill from '../assets/person-fill.svg'

export default function Navbar() {     
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);
    const navigate = useNavigate()
    const [inputTouched, setInputTouched] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const debouncedInput = useDebounce( inputValue, 1000 );


   
       const [user, setUser] = useState(null);
       const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // 처음 로드 시 로그인 상태 확인
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (data?.user) setUser(data.user);
        };
        getUser();

        // 로그인/로그아웃 상태 감지
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

      const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        navigate("/"); // 로그아웃 후 홈으로 이동
    };

    useEffect( () => {
        const trimmed = debouncedInput.trim()
        if (inputTouched) {
                navigate(`/search?movie=${encodeURIComponent(trimmed)}`)
        }
    },[debouncedInput])
    return (
        <>
        {/* bg-[#eaeaea] */}
            <header className='w-full fixed top-0 left-0 z-50 transition-[top] duration-200 ease-linear flex items-center justify-center  bg-[#F5F5F5] dark:bg-[#000] h-[110px] md:h-[80px]'>
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
                        {!user ? (
                            <>
                            <button className='text-[#e6e6e6] bg-[#335de7] :hoverbg-[#4f6ccd] dark:bg-[#2b2a2a] dark:hover:bg-[#3b3b3b] hover:text-[#fff] transition linear duration-100 flex justify-center items-center rounded-[3px] py-[.3rem] px-[.6rem] text-[.8rem] md:text-[.9rem] mr-[.5rem]
                            '><NavLink to='/login'>로그인</NavLink></button>
                            <button onClick={ () => {
                                navigate('/signup');
                            }} className='text-[#e6e6e6] bg-[#335de7] :hoverbg-[#4f6ccd] dark:bg-[#2b2a2a] dark:hover:bg-[#3b3b3b] hover:text-[#fff] transition linear duration-100 flex justify-center items-center rounded-[3px] py-[.3rem] px-[.6rem] text-[.8rem] md:text-[.9rem]
                            '><NavLink to='/signup'>회원가입</NavLink></button>
                            </>
                        ):(
                            <>
                                <img src={user.user_metadata?.avatar_url || personFill }
                                    alt="프로필"
                                    className="rounded-[50%] w-[30px] h-[30px] md:w-[40px] md:h-[40px] m-0 bg-[#ff9b04]"  onClick={() => setMenuOpen((prev) => !prev)}
                                />
                                {menuOpen && (
                                <div className='absolute top-15 right-0 bg-white dark:bg-[#2b2a2a] shadow-md rounded p-2'>
                                    <ul>
                                        <li>
                                            <NavLink to="/mypage">
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded min-w-[90px] text-[.9rem]">
                                                마이페이지
                                            </button>
                                            </NavLink>
                                        </li>
                                        <li className='mt-[10px]'>
                                            <button
                                                onClick={handleLogout}
                                                className="bg-red-500 text-white px-2 py-1 rounded min-w-[90px] text-[.9rem]">
                                                로그아웃
                                            </button>
                                        </li>
                                    </ul>
                                    
                                </div>
                                )}
                                {/* <span className="text-sm text-gray-700 dark:text-gray-300 mr-3">
                                    {user.email}
                                </span> */}
                               
                            </>
                        )
                        }      
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

