// this file will contain all the functions that will be used to sign up, log in, log out and get the user object from the token

import * as usersAPI from './users-api';

export async function signUpUser(userData) {
    // call the signUpUser function from the users-api file
    // this will make a POST request to the API to sign up the user
    const token = await usersAPI.signUpUser(userData);
    console.log(token);
    localStorage.setItem('token', token);
    return (getUser());
}

export function getToken() {
    // get the token from local storage
    const token = localStorage.getItem('token');
    // if there is no token, return null
   if(!token) return null;
   // Obtain the user object from the token
   const payload = JSON.parse(atob(token.split('.')[1]));
   // check if the token is valid and not expired
    if(payload.exp < Date.now() / 1000) {
        // if the token is expired, remove the token from local storage
         localStorage.removeItem('token');
         return null;
    }
    return token;
}


export function getUser() {
    const token = getToken();
    // if there is a token, return the user object from the token otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function logOut() {
    // remove the token from local storage
    localStorage.removeItem('token');
}

// this function will return the user object from the token
export async function login(credentials) {
    // call the logInUser function from the users-api file
    // this will make a POST request to the API to log in the user
    const token = await usersAPI.logInUser(credentials);
    localStorage.setItem('token', token);
    console.log(token);
    return getUser();
}


// this function will update the user's information
export async function updateUserInfo(userData) {
    // call the updateUserInfo function from the users-api file
    // this will make a PUT request to the API to update the user's information
    const updatedUser = await usersAPI.updateUserInfo(userData);
    return updatedUser;
}



export default {login};