import axios, { AxiosInstance } from 'axios';
import { getStoreItem } from '../services/localstorage.service'; // Update the path according to your project structure

const api = 'http://localhost:8100/api';

export const apiSearch = api;
export const loginUrl = '/login';

export const customHeader = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

const apiClient: AxiosInstance = axios.create({
    baseURL: apiSearch,
    headers: customHeader,
});

// Add request interceptor to set the Authorization header
apiClient.interceptors.request.use(
    (config) => {
        const jwt: string | undefined = getStoreItem<{ jwt: string }>('auth')?.jwt;

        if (jwt) {
            config.headers.Authorization = `Bearer ${jwt}`;
        } else {
            // config.headers.Authorization = `token ${applicationToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
export { api };
