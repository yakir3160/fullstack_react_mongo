

import axios from "axios";

const apiUrl = import.meta.env.VITE_SERVER_API_URL || 'http://localhost:5002/api';




const api = axios.create({
    baseURL:apiUrl,
    timeout:2000,
    headers:{
        'Content-Type': 'application/json',
    }
})


export const authApi = {
    login:async (email,password) =>{
        console.log(apiUrl);
        const response = await api.post('/auth/login',{email,password})
        return response
    },
    register: async (userData) =>{
        console.log('Registering user with data:', userData);
        console.log('API URL:', apiUrl);
        
        const response = await api.post('/auth/register',userData)
        return response
    },
}
export const userApi = {
        updateUser:async (id,userData) =>{
        const response = await api.put(`/users/${id}`,userData)
        return response
    },
}


