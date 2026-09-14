async function testSupabase() {
    const { data, error } = await window.appSupabase.auth.getSession();

    if (error) {
        console.error("Supabase connection failed:", error);
        return;
    }

    console.log("Supabase connected!");
    console.log("Current session:", data.session);
}

testSupabase();
