import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"

const axiosParams = {
    baseURL: 'http://localhost:8000',
    // baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": true,
    },
}


const axiosInstance = axios.create(axiosParams)

const api = (axios: AxiosInstance) => {
    return {
        get: <T>(url: string, config: AxiosRequestConfig) =>
            axios.get<T>(url, config),

        delete: <T>(url: string, config: AxiosRequestConfig) =>
            axios.delete<T>(url, config),

        post: <T>(url: string, body: unknown, config: AxiosRequestConfig) =>
            axios.post<T>(url, body, config),

        put: <T>(url: string, body: unknown, config: AxiosRequestConfig) =>
            axios.put<T>(url, body, config),

        patch: <T>(url: string, body: unknown, config: AxiosRequestConfig) =>
            axios.patch<T>(url, body, config),

    };
}

axiosInstance.defaults.xsrfCookieName = "XSRF-TOKEN"
axiosInstance.defaults.xsrfHeaderName = "X-XSRF-TOKEN"
export default api(axiosInstance)