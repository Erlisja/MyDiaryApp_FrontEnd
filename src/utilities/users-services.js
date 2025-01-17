// this file will contain all the functions that will be used to sign up, log in, log out, and get the user object from the token

import * as usersAPI from './users-api';

export async function signUpUser(userData) {
    // call the signUpUser function from the users-api file
    // this will make a POST request to the API to sign up the user
    const token = await usersAPI.signUpUser(userData);
    console.log('Sign Up Token:', token);
    localStorage.setItem('token', token);
    return getUser();  // Get user info after sign up
}

export function logOut() {
    // remove the token from local storage
    localStorage.removeItem('token');
}

// this function will return the user object from the token
export async function login(credentials) {
    // call the logInUser function from the users-api file
    // this will make a POST request to the API to log in the user
    const response = await usersAPI.logInUser(credentials);
    console.log('Full response:', response);
    const token = response.token;  // Extract the token
    if (token) {
        localStorage.setItem('token', token);  // Save the token if available
    } else {
        console.error('Token is missing in the response');
    }

    console.log('Token in localStorage:', localStorage.getItem('token'));
    console.log('Login Token:', token);
    return getUser();  // Get user info after login
}

export function getToken() {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    console.log('The token:', token);  // Log the token to check if it's correct

    // If there is no token, return null
    if (!token) {
        console.error('Token is not found in localStorage');
        return null;
    }

    // Decode the token and check for expiration
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the payload of the JWT
        // Check if the token is expired
        if (payload.exp < Date.now() / 1000) {
            // If the token is expired, remove it from local storage
            localStorage.removeItem('token');
            return null;
        }
        return token;  // Return the token if it's valid
    } catch (error) {
        console.error('Error decoding the token:', error);
        return null;
    }
}



export function getUser() {
    const token = getToken();
    // if there is a token, return the user object from the token otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}



export default { login, signUpUser, logOut, getUser, getToken };
