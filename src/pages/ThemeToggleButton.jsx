import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../store/themeSlice'
import modeLight from '../assets/mode-light.svg'
import modeDark from '../assets/mode-dark.svg'

const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="bg-[#040929] dark:bg-yellow-400 text-white dark:text-[#000] rounded-[50%] w-[30px] h-[30px] md:w-[40px] md:h-[40px] p-[8px] dark:p-[5px] m-0"
    > 
      {darkMode ? (<img src={modeLight} alt="라이트 모드" className='w-full h-full' /> ): <img src={modeDark} alt="라이트 모드" className='w-full h-full' />}
    </button>
  );
}

export default ThemeToggleButton;
