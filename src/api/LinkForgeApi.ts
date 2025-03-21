import api from "../lib/axios";
import { isAxiosError } from "axios";
import { User } from "../types";

export const getUser = async () => {
    try {
        //this request send the token via interceptor in axios config
        const {data} = await api.get(`/api/user`)

        return data;

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
        }
    }
}


export const updateUser = async (formData:User) => {
    try {
        //this request send the token via interceptor in axios config
        const {data} = await api.patch(`/api/user`, formData);
        return data;

    } catch (error) {
        console.error(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
        }
    }
}

export const uploadUserImage = async (file:File) => {
    try {
        let formData = new FormData();
        formData.append('file', file);

        const { data } = await api.post('/api/user/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Especificar el tipo de contenido adecuado
            },
        });

        return data;//return data to show it in the mutation (on success)

    } catch (error) {
        console.error(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
        }
    }
}

export const getUserByHandle = async (handle:string) => {
    try {
        const {data} = await api.get(`/api/user/${handle}`)

        return data;

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
        }
    }
}

export const searchByHandle = async (handle:string) => {
    try {
        const {data} = await api.post(`/api/user/search`, {handle});

        return data.msg;//return repsonse msg

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
        }
    }
}