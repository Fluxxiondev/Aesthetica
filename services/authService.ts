import supabase from '../lib/supabaseClient';

export async function signInService(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return data;
}

export async function signUpService(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    return data;

}

export async function signOutService() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    return true;
}

export async function getSessionService() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw new Error(error.message);
    return data;
}
