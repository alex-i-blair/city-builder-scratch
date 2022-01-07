
const SUPABASE_URL = 'https://urgffuilfqckxcanvbmm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTMzNzIzNCwiZXhwIjoxOTU2OTEzMjM0fQ.ZXxkHGBNaPqEZyyF7RWhQVWK3scU6-7P89-EaoUAqPQ';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function updateWaterfront(id) {
    // const user = await getUser();

    const response = await client
        .from('cities')
        .update({ waterfront_id: id })
        // .match({ user_id: user.user.id })
        .single();
    // console.log(response);
    return checkError(response);
}
export async function updateCastle(id) {
    // const user = await getUser();

    const response = await client
        .from('cities')
        .update({ castle_id: id })
        // .match({ user_id: user.user.id })
        .single();

    return checkError(response);
}
export async function updateSkyline(id) {
    // const user = await getUser();

    const response = await client
        .from('cities')
        .update({ skyline_id: id })
        // .match({ user_id: user.user.id })
        .single();

    return checkError(response);
}

export async function createDefaultCity() {
    const response = await client
        .from('cities')
        .insert([
            {
                name: 'Portland',
                waterfront_id: 1,
                skyline_id: 1,
                castle_id: 1,
                slogans: []
            }
        ])
        .single();
        
    return checkError(response);

}

export async function getCity() {
    const response = await client
        .from('cities')
        .select()
        .single();
    return checkError(response);

}

export async function updateSlogans(id) {
    // const user = await getUser();

    const response = await client
        .from('cities')
        .update({ slogans: id })
        // .match({ user_id: user.user.id })
        .single();

        
    return checkError(response);
}

export async function updateName(id) {
    const response = await client
        .from('cities')
        .update({ name: id })
        .single();
    
    return checkError(response);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

export async function getUser() {
    return client.auth.session();
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./city');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}