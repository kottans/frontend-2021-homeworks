export async function getUsers() {
    const API_URL = new URL('https://randomuser.me/api/');
    API_URL.searchParams.set('inc', 'gender,name,location,email,registered,dob,picture,phone');
    API_URL.searchParams.set('noinfo', '');
    API_URL.searchParams.set('results', '100');
    API_URL.searchParams.set('seed', 'msfa');

    return await fetch(API_URL);
}
