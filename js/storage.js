async function saveNewItem(key, payload) {
    handleServerRequest('POST', key, payload);
}

async function updateItem(key, payload) {
    handleServerRequest('PATCH', key, payload);
}

async function deleteItem(key, payload) {
    handleServerRequest('DELETE', key, payload);
}

async function handleServerRequest(method, key, payload) {
    try {
        const response = await fetch(API + `/${key}/`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(payload)
        });
        const data = response.status === 204 ? {} : await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}


async function getItem(key) {
    try {
        const response = await fetch(API + `/${key}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}