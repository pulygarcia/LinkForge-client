import api from "../lib/axios";
import { isAxiosError } from "axios";
import { ProfileFormData } from "../types";

export const getUser = async () => {
    try {
        //this request send the token via interceptor in axios config
        const {data} = await api.get(`/api/auth/user`)

        return data;

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
        }
    }
}

export const updateUser = async (formData:ProfileFormData) => {
    try {
        //this request send the token via interceptor in axios config
        const {data} = await api.patch(`/api/auth/user`, formData);
        return data;

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
        }
    }
}