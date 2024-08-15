import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { useEffect, useState } from "react"

interface APIProps {
    url: string
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    data?: any
    params?: any
}

export type IAxiosResponse = {
    data: any,
    success: boolean,
    message: string,
    showPopUp: boolean,
    code: number,
    responseType: 'Error' | 'Information' | 'Question' | 'Warning' | 'Success',
} | null | any

export const useAxios = () => {
    const { getToken } = useAuth()

    const [response, setResponse] = useState<IAxiosResponse>(null);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const axiosInstance = axios.create({ baseURL })

    axiosInstance.interceptors.request.use(async (config) => {
        const token = await getToken();
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, err => Promise.reject(err))

    axiosInstance.interceptors.response.use(response => response, err => Promise.reject(err))

    let controller = new AbortController();

    useEffect(() => {
        return () => loading ? controller?.abort() : undefined;
    }, [])

    const fetchData = async ({
        url,
        method,
        data = {},
        params = {}
    }: APIProps) => {
        setLoading(true);
        
        controller.abort();
        controller = new AbortController();

        try {
            const result = await axiosInstance({
                url: baseURL + `/${url}`,
                method,
                data,
                params,
                signal: controller.signal
            });
            setResponse(result.data)
        } catch (err: any) {
            if(axios.isCancel(err)) {
                console.error("Request has been cancelled", err.message)
            } else {
                setError(err.response? err.response.data : err.message )
            }
        } finally {
            setLoading(false);
        }
    }

    return { response, error, loading, fetchData }
}