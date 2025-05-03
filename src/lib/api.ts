import axios, { AxiosError, AxiosRequestConfig } from 'axios'

const instance  = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/auth',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance .interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Funciones centralizadas
export async function apiGet<T = any>(url: string, config?: AxiosRequestConfig) {
    const response = await instance.get<T>(url, config)
    return response.data
  }
  
  export async function apiPost<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    console.log('URL:', url)
    console.log('Data:', data)
    const response = await instance.post<T>(url, data, config)
    return response.data
  }
  
  export async function apiPut<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await instance.put<T>(url, data, config)
    return response.data
  }
  
  export async function apiDelete<T = any>(url: string, config?: AxiosRequestConfig) {
    const response = await instance.delete<T>(url, config)
    return response.data
  }

  export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>
      return axiosError.response?.data?.message || 'Error desconocido del servidor.'
    }
    if (error instanceof Error) {
      return error.message
    }
    return 'Ocurrió un error desconocido.'
  }
export default instance;
