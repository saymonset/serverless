import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logoutThunks } from '../store/slices/login/loginThunks'

export const baseURL = 'https://77sw5iql30.execute-api.us-east-1.amazonaws.com/api';

const vaccinesApi = axios.create({ baseURL });

const logout =async () => {
    const dispatch = useDispatch();
    await dispatch(logoutThunks());
}


vaccinesApi.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
              config.headers['X-Token'] = `Bearer ${token}`;
              config.headers['Content-Type'] = 'application/json';
              config.headers['Authorization'] = `Bearer ${token}`;
        }else{
            logout();
        }
        return config;
    },
    (error) => {
        console.error('Desde api axios;')
        console.error(error);
        return Promise.reject(error);
    }
);

export default vaccinesApi;
