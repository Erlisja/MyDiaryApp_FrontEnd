import axios from "axios";

// set up the base URL for the API
const LOCAL_URL = 'https://memoire-rust.vercel.app/' || 'http://localhost:3030';
const API_URL = '/api/goal-entries';
const URL = LOCAL_URL + API_URL;

// export the function to get all goal entries from the API
export async function getAllGoals() {
    try {
        const token = localStorage.getItem('token');
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
            throw new Error('Failed to fetch goal entries: ' + response.statusText);
        }
    } catch (err) {
        console.error('Fetch Error:', err.message);
        throw err;
    }
}

// export the function to add a goal entry to the API
export async function addNewGoal(entryData) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found. Please log in.');
        }

        const response = await axios.post(`${URL}/newGoal`, entryData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        console.log('Response Status:', response.status);
        return response.data;
    } catch (err) {
        console.log('Error adding goal entry:', err.message);
        throw err;
    }
}

// export the function to delete a goal entry from the API
export async function deleteGoalEntry(id) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found. Please log in.');
        }
        const response = await fetch(URL + `/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        console.log('Response Status:', response.status);
        if (response.ok) {
            return await response.json();
        } else {
            const errorMessage = await response.text();
            console.error('API Error:', errorMessage);
            throw new Error('Failed to delete goal entry: ' + response.statusText);
        }
    } catch (err) {
        console.error('Fetch Error:', err.message);
        throw err;
    }
}

// export the function to update a goal entry in the API
export async function updateGoalEntry(id, entryData) {
   try{
         const token = localStorage.getItem('token');
         if (!token) {
              throw new Error('No token found. Please log in.');
         }
            const response = fetch (URL + `/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(entryData)
            });
            console.log('Response Status:', response.status);
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to update goal entry: ' + response.statusText);
            }
   }catch (err) {
        console.error('Fetch Error:', err.message);
        throw err;
   }
}

// export the function to get a single goal entry from the API
export async function getGoalEntry(id) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found. Please log in.');
        }

        const response = await fetch(URL + `/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log('Response Status:', response.status);
        const normalizedData = {
            ...data,
            deadline: new Date(data.deadline).toISOString().split('T')[0],
        };
        if (response.ok) {
            return normalizedData;

        } else {
            const errorMessage = await response.text();
            console.error('API Error:', errorMessage);
            throw new Error('Failed to fetch goal entry: ' + response.statusText);
        }
    } catch (err) {
        console.error('Fetch Error:', err.message);
        throw err;
    }
}

// export the function to get the total number of goals from the API
export async function getGoalCount() {
    try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
            throw new Error('No token found. Please log in.');
        }
        const response = await fetch(URL + '/total', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to fetch goal count: ' + response.statusText);
        }
    } catch (err) {
        console.error('Fetch Error:', err.message);
        throw err;
    }
}







export default {
    getAllGoals,
    addNewGoal,
    deleteGoalEntry,
    updateGoalEntry,
    getGoalEntry,

};