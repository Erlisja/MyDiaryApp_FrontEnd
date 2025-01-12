// diaryEntryService.js is a utility file that contains functions to interact with the API to get, add, update, and delete diary entries.
import axios from "axios";

// set up the base URL for the API
const LOCAL_URL = 'http://localhost:3030';
const API_URL = '/api/diary-entries';
const URL = LOCAL_URL + API_URL;

// export the function to get all diary entries from the API
export async function getAllDiaryEntries() {
    try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
            throw new Error('No token found. Please log in.');
        }

        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('Response Status:', response.status);
        if (response.ok) {
            return await response.json();
        } else {
            const errorMessage = await response.text();
            console.error('API Error:', errorMessage);
            throw new Error('Failed to fetch diary entries: ' + response.statusText);
        }
    } catch (error) {
        console.error('Fetch Error:', error.message);
        throw error;
    }
}



// export the function to add a diary entry to the API
const addDiaryEntry = async (entryData) => {
    try {
        const response = await axios.post(`${URL}/diary-entries`, entryData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data; // Return the response
    } catch (error) {
        throw new Error('Error adding diary entry: ' + error.message);
    }
};



// export the function to delete a diary entry from the API
export async function deleteDiaryEntry(id) {
    try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
            throw new Error('No token found. Please log in.');
        }
        const response = await fetch(URL + `/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        // check if the response is OK
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('An error occurred. Please try again');
        }
    } catch (error) {
        console.error('Fetch Error:', error.message);
        throw new Error('Error deleting diary entry: ' + error.message);

    }
}

// export the function to update a diary entry in the API
export async function updateDiaryEntry(id, updatedData) {
    try {
        const response = await fetch(URL + `/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedData)
        })
        
        if (response.ok) {
            return response.json(); // Return the updated entry
        } else {
            throw new Error('An error occurred. Please try again');
        }
    } catch (error) {
        console.error('Fetch Error:', error.message);
        throw new Error('Error updating diary entry: ' + error.message);
    }
}





    // export the function to get a single diary entry from the API
    export async function getDiaryEntry(id) {
        const response = await fetch(URL + `/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // check if the response is OK
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('An error occurred. Please try again');
        }
    }


    export default { addDiaryEntry };