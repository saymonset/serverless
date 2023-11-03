import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://4p1bw1ybo5.execute-api.us-east-1.amazonaws.com/docs';

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
        return Promise.reject(error);
    }
);

export default vaccinesApi;
