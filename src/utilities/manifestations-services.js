import axios from "axios";
// set up the base URL for the API
const LOCAL_URL = 'https://Memoire-server.onrender.com';
//const LOCAL_URL = 'http://localhost:3030';
const API_URL = '/api/manifestations';
const URL = LOCAL_URL + API_URL;


// export the function to fetch all manifestation entries
export async function fetchAllManifestations() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("User not authenticated. Please login!")
        }
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Response status', response.status);
        if (response.ok) {
            return await response.json()
        } else {
            const errorMessage = await response.text();
            console.error('API Error:', errorMessage);
            throw new Error('Failed to fetch goal entries: ' + response.statusText);
        }
    } catch (error) {
        console.log("Error fetching the manifestations from backend", error);
        throw error
    }
}


// function to delete a manifestation entry from the database
export async function deleteManifestation(id) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("User not authenticated. Please login!")
        }
        const response = await fetch(URL + `/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Response Status:', response.status);
        if (response.ok) {
            return await response.json();
        } else {
            const errorMessage = await response.text();
            console.error('API Error:', errorMessage);
            throw new Error('Failed to delete manifestation entry: ' + response.statusText);
        }
    } catch (error) {
        console.log('Error deleting the manifestation', error);
        throw error
    }
}


// add a new manifestation entry from the user
export async function createManifestation(manifestation) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("User not authenticated. Please login!")
        }
        const response = await fetch(URL + '/new-manifestation', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(manifestation),
        });
        console.log('Response Status:', response.status);
        if (response.ok) {
            return await response.json();
        } else {
            const errorMessage = await response.text();
            console.error('API Error:', errorMessage);
            throw new Error('Failed to create manifestation entry: ' + response.statusText);
        }
    } catch (error) {
        console.log('Error creating the manifestation', error);
        throw error
    }
}

// add a new manifestation entry from the AI generator
export async function createGeneratedManifestation(category) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("User not authenticated. Please login!")
        }
        const response = await fetch(URL + '/generate-manifestation', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                { category }
            ),
        });
        console.log('Response Status:', response.status);
        if (response.ok) {
            return await response.json();
        } else {
            const errorMessage = await response.text();
            console.error('API Error:', errorMessage);
            throw new Error('Failed to create manifestation entry: ' + response.statusText);
        }
    } catch (error) {
        console.log('Error creating the manifestation', error);
        throw error
    }
}


export default { createManifestation, fetchAllManifestations, deleteManifestation, createGeneratedManifestation };