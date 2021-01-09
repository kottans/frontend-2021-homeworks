export async function getUsers() {
    const peopleCount = 100;

    const API_URL = new URL('https://randomuser.me/api/');
    API_URL.searchParams.set('inc', 'gender,name,location,email,registered,dob,picture,phone');
    API_URL.searchParams.set('noinfo', '');
    API_URL.searchParams.set('results', peopleCount);
    API_URL.searchParams.set('seed', 'msfa');

    return await fetch(API_URL);
}
