const SUPABASE_URL = "https://zfdgkeqqdhbjibrbsqir.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_g_2yqsARIYRXZ3OAUxpfig_N0jwy0Wg";

window.appSupabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
