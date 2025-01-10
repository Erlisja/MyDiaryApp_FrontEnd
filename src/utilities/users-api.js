//users-api.js

// set up the base URL for the API
const LOCAL_URL = 'http://localhost:3030';
const API_URL = '/api/users';
const URL = LOCAL_URL + API_URL;

// export the function to sign up a user to the API
export async function signUpUser(userData) {
    // make a POST request to the API
    // include the user data in the request body as JSON data
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData) // convert the user data to JSON
    })
    // check if the response is OK 
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Invalid Sign Up. Please try again!');
    }
}


// export the function to log in a user to the API
export async function logInUser(credentials) {
    const response = await fetch(URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials) // convert the user data to JSON
    })
    // check if the response is OK 
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('An error occurred. Please try again');
    }
}