import { supabase  } from "./supabaseClient"

export async function signUp({ email, password, name }) {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name } // 유저 metadata 저장 가능
    }
  });
}


export async function signIn({ email, password }) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

// 로그아웃
export async function signOut() {
  return await supabase.auth.signOut();
}
