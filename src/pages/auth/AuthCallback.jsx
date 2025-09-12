// src/pages/AuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      if (code) {
        // PKCE code → 세션 교환
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error('세션 교환 실패:', error);
          navigate('/login');
          return;
        }
      }
      navigate('/'); // 원하는 페이지로 이동
    })();
  }, [navigate]);

  return <div className="p-4">로그인 처리 중...</div>;
}
