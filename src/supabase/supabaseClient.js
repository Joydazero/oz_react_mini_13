import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gpuragkeinfbighfzkgi.supabase.co" // Supabase Project Settings > API
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwdXJhZ2tlaW5mYmlnaGZ6a2dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczODU1NjAsImV4cCI6MjA3Mjk2MTU2MH0.2ewrX3Ms9qkFpwYGy5JxMVtPLO94oWuKJ6WzPYxRINM" // Supabase Project Settings > API

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
