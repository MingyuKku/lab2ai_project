export const requestInterceptor = (option?: RequestInit): RequestInit => {
    const interceptor: RequestInit = {
        ...option
    }

    return interceptor;
}


export const responseInterceptor = async <T>(response: Response): Promise<T | null> => {
    if (!response.ok) {
        const errorData = await response.json();
        console.error('응답 에러 인터셉터', errorData);
        
        throw new Error(errorData.message || 'Something went wrong');
    }
    
    
    // 응답 본문이 비어있다면 null 반환
    const text = await response.text();
    if (!text) {
        return null
    }

    
    const responseData = JSON.parse(text) as T;
    return responseData;
}




// export const csrfResponseInterceptor = async <T>(response: Response): Promise<T | null> => {
export const csrfResponseInterceptor = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        const errorData = await response.json();
        console.error('응답 에러 인터셉터', errorData);

        throw new Error(errorData.message || 'Something went wrong');
    }

    const responseData = await response.json() as T;
    return responseData;
    // const token = response.headers.get('x-csrf-token') as T;
    // return token;
}