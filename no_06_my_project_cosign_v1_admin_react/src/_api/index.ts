import axios from "axios";
import { ProductionType } from "constants/_types";
import { LOCAL_STORAGE_KEY } from 'constants/local-storage';


const getMode = () => {
    const mode = localStorage.getItem(LOCAL_STORAGE_KEY) as ProductionType | null;
    return mode ?? 'dev';
}


export function createAxios(url?: string) {
    const API_URL = getMode() === 'dev' ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_MAIN;
    const baseUrl:string = url ? `${API_URL}/${url}` : `${API_URL}/`;


    const instance = axios.create({
        baseURL: baseUrl,
        withCredentials: true,
    })


    return instance;
}