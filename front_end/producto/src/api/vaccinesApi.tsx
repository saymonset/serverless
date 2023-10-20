import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://85ateqskl0.execute-api.us-east-1.amazonaws.com/docs';

const vaccinesApi = axios.create({ baseURL });

vaccinesApi.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('Authorization');
        if ( token ) {
            config.headers['Authorization'] = token;
        }
        return config;
    }
);



export default vaccinesApi;
