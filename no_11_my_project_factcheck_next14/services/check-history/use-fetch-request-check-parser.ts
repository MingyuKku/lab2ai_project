import { returnFetch } from "../_fetch"
import { ReturnSuccess } from "../_fetch/_types"

export const useFetchRequestCheckParser = () => {


    const requestTextParser = async (text: string): Promise<ReturnSuccess> => {
        
        try {
            await returnFetch<unknown>('text/parser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({
                    text
                })
            })

            return {
                isSuccess: 'success'
            }

        } catch (err) {
            return {
                isSuccess: 'fail'
            }
        }
    }


    const requestFileParser = async (formData: FormData): Promise<ReturnSuccess> => {
        
        try {
            await returnFetch<unknown>('file/text/parser', {
                method: 'POST',
                body: formData
            })

            return {
                isSuccess: 'success'
            }

        } catch (err) {
            return {
                isSuccess: 'fail'
            }
        }
    }


    const requestUrlParser = async (url: string): Promise<ReturnSuccess> => {
        
        try {
            await returnFetch<unknown>('url/parser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({
                    url: url
                })
            })

            return {
                isSuccess: 'success'
            }

        } catch (err) {
            return {
                isSuccess: 'fail'
            }
        }
    }
    
    
    return {
        requestTextParser,
        requestFileParser,
        requestUrlParser,
    }
}