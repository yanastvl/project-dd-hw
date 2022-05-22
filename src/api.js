const url = 'http://93.95.97.34/api'

const request = async (url, method = 'GET', body) => {
    const response = await fetch(url,{
        method,
        body:JSON.stringify(body),
        headers:new Headers({
            'Content-Type': 'application/json'
        })
    });
    return response.json();
}

/*Users*/

export const login = (data) => {
    return request(`${url}/users/login`, 'POST', data);
}

export const getUser = (id) => {
    return request(`${url}/users/${id}`);
}

export const editUser = (data) => {
    return request(`${url}/users/edit`, 'PUT', data);
}

export const getUsers = (data) => {
    return request(`${url}/users`, 'POST', data);
}

/*Tasks*/

export const getTasks = (data) => {
    return request(`${url}/tasks`, 'POST', data);
}

export const getTask = (id) => {
    return request(`${url}/tasks/${id}`);
}

export const createOrEditTask = (data) => {
    return request(`${url}/tasks/createOrEdit`, 'PUT', data);
}

export const updateTaskStatus = (id, status) => {
    return request(`${url}/tasks/${id}/status/${status}`, 'PATCH');
}

export const deleteTask = (id) => {
    return request(`${url}/tasks/${id}`, 'DELETE');
}

export const patchTask = (id, data) => {
    return request(`${url}/tasks/${id}/worktime`, 'PATCH', data)
}

/*Comments*/

export const addComment = (data) => {
    return request(`${url}/comments/createOrEdit`, 'PUT', data);
}

export const getComments = (id) => {
    return request(`${url}/comments/${id}`);
}

export const deleteComment = (id) => {
    return request(`${url}/comments/${id}`, 'DELETE');
}

// export const getEvents = () => {
//     return request(`${url}`);
// }

// export const addEvent = (data) => {
//     const eventData = {
//         ...data,
//         favorite:false,
//         archive:false
//     }
//     return request(`${url}`, 'POST', eventData);
// }

// export const deleteEvent = (id) => {
//     return request(`${url}/${id}`, 'DELETE');
// }

// export const editEvent = (data) => {
//     return request(`${url}`, 'PUT', data);
// }

// export const deleteArchiveEvents = () => {
//     return request(`${url}/archive/delete`, 'DELETE');
// }