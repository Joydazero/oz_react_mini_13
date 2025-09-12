import React, { useState } from 'react'
import { supabase } from '../../supabase/supabaseClient';
import InputField from './InputField';

function Signup() {    
    const [userName , setUserName ] = useState();
    const [ email, setEmail ] = useState();
    const [password, setPassword] = useState();
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        const nameRegex = /^[가-힣a-zA-Z0-9]{2,8}$/;
        if (!nameRegex.test(userName)) {
            newErrors.userName = "이름은 2~8자의 한글, 영어, 숫자만 가능합니다.";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        newErrors.email = "올바른 이메일 주소를 입력해주세요.";
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
        newErrors.password =
            "비밀번호는 영어 대문자, 소문자, 숫자를 포함해 6자 이상이어야 합니다.";
        }
         if (password !== confirmPassword) {
        newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
        }
        setErrors(newErrors);
         return Object.keys(newErrors).length === 0; 
    }

    const onSignupSubmit = async(e) => {
        e.preventDefault();
        if (!validate()) return;
        
         if (!email || !password || !userName) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        try {

            const { data,  error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { 
                        userName,
                        avatar_url
                    }  
                }
            })
            console.log(data);
            if (error) {
                alert(error.message)
            } else {
                alert("회원가입 성공! 이메일을 확인하세요.")
            }
            
        } catch (error) {
            console.error(error);
            alert("회원가입 중 오류가 발생했습니다.");
        }
    }

    const resetField = () => {
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});
    }; 

  return (
    <div className='flex flex-col gap-3 w-[300px] mx-auto mt-10'>
        <h2>회원가입</h2>
        <div className=''>
            <InputField id="userName" label="이름"  placeholder="2~8자, 숫자/한글/영문 사용 가능"  value={userName} onChange={(e) => setUserName(e.target.value)} required  />
            {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
        </div>
        <div className=''>
            <InputField id="email" label="이메일"  placeholder="이메일 형식으로 작성해주세요"  value={email} onChange={(e) => setEmail(e.target.value)} required  />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className=''>
            <InputField id="password"  type="password"   label="비밀번호"   placeholder="영어 대문자/소문자+숫자의 조합 사용"  value={password} onChange={(e) => setPassword(e.target.value)} required  />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div className=''>
            <InputField id="confirmPassword"  type="password"  label="비밀번호 확인"  placeholder="비밀번호랑 동일하게 작성해주세요"   value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required  />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>
        <button type="primary" onClick={ (e) => {onSignupSubmit(e);  resetField(e); }} className='bg-blue-500 text-[#fff] p-2 rounded'>회원가입</button>
    </div>
  )
}

export default Signup