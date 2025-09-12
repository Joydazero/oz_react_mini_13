import React, { useState } from 'react'
import { supabase } from '../../supabase/supabaseClient';
import InputField from './InputField';
import { NavLink } from 'react-router-dom';


function Login() {
    const [ email, setEmail ] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [resetKey, setResetKey] = useState(false);

    const validate = () => {
        const newErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        newErrors.email = "올바른 이메일 주소를 입력해주세요.";
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
        newErrors.password =
            "비밀번호는 영어 대문자, 소문자, 숫자를 포함해 6자 이상이어야 합니다.";
        }
        setErrors(newErrors);
            return Object.keys(newErrors).length === 0; 
    }
    const onLoginSubmit = async(e) =>{
            e.preventDefault();
            if (!validate()) return;
            
            if (!email || !password ){
                alert("로그인 정보를 입력해주세요.");
                return;
            }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
            });

            if (error) {
            alert(error.message);
            } else {
            alert("로그인 성공!");
                resetField();  
                Navigate('/');
                const { data: userData, error: userError } = await supabase.auth.getUser();
                if (userError) {
                    console.error(userError.message);
                } else {
                    console.log("로그인한 사용자:", userData.user);
                }
                }
        };

        const resetField = () => {
            setEmail("");
            setPassword("");
            setErrors({});  
            setResetKey((prev) => !prev);  
        }; 


    const handleGoogleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
             queryParams: { access_type: 'offline', prompt: 'consent' },
            //redirectTo: `${window.location.origin}/auth/callback`,
        },
        });
        if (error) console.error(error);
        else console.log('Google OAuth 시작:', data);
    };
    const handleKaKaoLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'kakao',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
                // queryParams: { access_type: 'offline', prompt: 'consent' },
                //redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) console.error(error);
        else console.log('KaKao OAuth 시작:', data);
    };


    return (
        <section>
            <div className='flex flex-col gap-3 w-[300px] mx-auto mt-10'>
                 <h2 className='text-center text-[#000] dark:text-[#fff] text-3xl font-bold pb-10 pt-20'>로그인</h2>
                    <InputField id="email" label="이메일"  placeholder="이메일 형식으로 작성해주세요"  value={email} onChange={(e) => setEmail(e.target.value)} required reset={resetKey}    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    <InputField  type="password"  id="password" label="비밀번호"   placeholder="영어 대문자/소문자+숫자의 조합 사용"  value={password} onChange={(e) => setPassword(e.target.value)} required reset={resetKey}    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    {/* <button onClick={onSignupSubmit} className='bg-blue-500 text-[#fff] p-2 rounded'>회원가입</button> */}                    
                    <button onClick={ (e) => {onLoginSubmit(e); }} className='bg-[#000] text-[#fff] p-2 rounded'>로그인</button>
                    <button
                    onClick={handleGoogleLogin}
                    className='text-white p-2 rounded bg-gradient-to-r bg-[linear-gradient(90deg,#4285F4,#EA4336,#FABD05)]'
                    >
                    Google로 로그인
                    </button>
                    <button onClick={handleKaKaoLogin} className='bg-[#FAE100] text-black p-2 rounded border border-[#facc00]'
                    >kakao로 로그인</button>
                    <NavLink to="/signup" className='bg-[#3b3b3b] text-[#fff] p-2 rounded text-center block'>회원가입</NavLink>
            </div>
        </section>
    )
}


export default Login; 