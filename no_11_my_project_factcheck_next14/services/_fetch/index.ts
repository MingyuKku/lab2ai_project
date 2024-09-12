import { requestInterceptor, responseInterceptor } from './interceptors';


export const returnFetch = async <T>(endpoint: string, option?: RequestInit): Promise<T | null> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://223.130.159.9:10154/api/';
    const url = `${baseUrl}${endpoint}`;

    const spreadOption: RequestInit = {
        credentials: 'include',
        ...requestInterceptor(option),
    }
    
    try {
        const response = await fetch(url, spreadOption);
        return responseInterceptor<T>(response);
    } catch (err) {
        return null;
    }
}