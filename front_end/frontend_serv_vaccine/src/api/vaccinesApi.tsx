import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://77sw5iql30.execute-api.us-east-1.amazonaws.com/api';

const vaccinesApi = axios.create({ baseURL });

vaccinesApi.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
              config.headers['X-Token'] = `Bearer ${token}`;
              config.headers['Content-Type'] = 'application/json';
              config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log('Desde api axios;')
        console.log(error);
        return Promise.reject(error);
    }
);

export default vaccinesApi;
