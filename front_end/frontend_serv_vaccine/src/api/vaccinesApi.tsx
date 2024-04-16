import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logoutThunks } from '../store/slices/login/loginThunks'
import { useNavigation } from '@react-navigation/native';
import { STAGE, API_URL as PROD_URL, API_URL_IOS as API_URL_IOS, API_URL_ANDROID as API_URL_ANDROID} from '@env';
import { Platform } from 'react-native';

export const baseURL = 'https://77sw5iql30.execute-api.us-east-1.amazonaws.com/api';


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

const logout =async () => {
    //Si el token ya no existe, lo sacamos
    console.log('Token vencido....');
    const dispatch = useDispatch();
    await dispatch(logoutThunks());
    const navigation = useNavigation();
    navigation.navigate( 'WelcomeScreen' as never)
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
