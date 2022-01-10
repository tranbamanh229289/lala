import axiosClient from "./axiosClient";
import tokenStorage from "../storage/tokenStorage";

export const login = async (data) => {
    try {
        const res = await axiosClient('post', 'api/login', data);
        tokenStorage.setAccessToken(res.data.access_token);
        return res;
    } catch (error){
        throw(error);
    }
}
export const logout = ()=>{
    tokenStorage.deleteAccessToken();
}

export const getUser = async ()=>{
    try {
        const res = await axiosClient('post', 'api/me', data);
        return res;
    } catch (error){
        throw(error);
    }
}

