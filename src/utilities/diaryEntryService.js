import axios from "axios";

// set up the base URL for the API
const LOCAL_URL = 'http://localhost:3030';
const API_URL = '/api/diary-entries';
const URL = LOCAL_URL + API_URL;

// export the function to get all diary entries from the API
export async function getAllDiaryEntries() {
    const response = await fetch(URL, {
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

export default { addDiaryEntry };

// export the function to delete a diary entry from the API
export async function deleteDiaryEntry(id) {
    const response = await fetch(URL + `/${id}`, {
        method: 'DELETE',
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

// export the function to update a diary entry in the API
export async function updateDiaryEntry(id, updatedEntry) {
    const response = await fetch(URL + `/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEntry) // convert the updated entry data to JSON
    })
    // check if the response is OK
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('An error occurred. Please try again');
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

