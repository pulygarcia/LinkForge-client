import api from "../lib/axios";
import { isAxiosError } from "axios";

export const getUser = async () => {
    try {
        const token = localStorage.getItem('USER_TOKEN');

        const {data} = await api.get(`/api/auth/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return data;

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
        }
    }
}