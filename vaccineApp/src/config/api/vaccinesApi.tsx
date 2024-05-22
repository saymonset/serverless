import axios from 'axios';
 
// import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { STAGE, API_URL as PROD_URL, API_URL_IOS as API_URL_IOS, API_URL_ANDROID as API_URL_ANDROID} from '@env';
import { Platform } from 'react-native';
import { StorageAdapter } from '../adapters/storage-adapter';
//import { logoutThunks } from '../../presentation/store';



export const API_URL = 
  (STAGE === 'prod')
   ? PROD_URL
   : Platform.OS === 'ios'
      ? API_URL_IOS
      : API_URL_ANDROID;

//const vaccinesApi = axios.create({ baseURL });

const vaccinesApi = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    }
  })
 

vaccinesApi.interceptors.request.use(
    async (config) => {
        const token = await StorageAdapter.getItem('token');
        if (token) {
              config.headers['X-Token'] = `Bearer ${token}`;
              config.headers['Authorization'] = `Bearer ${token}`;
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
