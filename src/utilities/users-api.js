//users-api.js

// set up the base URL for the API
const LOCAL_URL = 'https://Memoire-server.onrender.com' 
//const LOCAL_URL = 'http://localhost:3030';
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



export async function logInUser(credentials) {
    const response = await fetch(URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    if (response.ok) {
        const { token, user } = await response.json();
        localStorage.setItem('token', token);
        return user;  // Return the user object directly here
    } else {
        throw new Error('An error occurred. Please try again');
    }
}



export async function updateUserInfo(userData) {
    try {
        const response = await fetch(URL + '/update', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                throw new Error("Unauthorized or Forbidden: Token might be invalid or expired");
            }
            throw new Error("Failed to update user information");
        }

        const updatedUser = await response.json();
        return updatedUser;
    } catch (error) {
        console.error("Error updating user info:", error);
        throw error;
    }
}
