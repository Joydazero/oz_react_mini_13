import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase/supabaseClient';

function Mypage() {
   const [user, setUser] = useState(null);
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
  return (
    <div>
        {user ? (
                <section>
                    <h2 className='text-center text-[#000] text-3xl font-bold py-20'>마이페이지</h2>
                    <div className='flex justify-center flex-col items-center'>
                        <div className='flex flex-row mb-5'>
                            <p className='font-medium text-[#000] text-lg'>사용자 이메일:</p>
                            <div className='ml-5 font-normal text-[#3a3a3a] text-md'>{user.email}</div>
                        </div>
                        <div className='flex flex-row mb-5'>
                            <p className='font-medium text-[#000] text-lg'>사용자 이름:</p>
                            <div className='ml-5 font-normal text-[#3a3a3a] text-md'>{user.user_metadata?.userName}</div>
                        </div>
                    </div>
                </section>
            ) : (
                <p>로그인된 사용자가 없습니다.</p>
            )}
        
{/* created_at */}
    </div>
  )
}

export default Mypage