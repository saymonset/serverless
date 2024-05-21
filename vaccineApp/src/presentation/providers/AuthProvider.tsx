import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
 
import React, { PropsWithChildren, useEffect } from 'react'
import { Text } from 'react-native/types';
import { useSelector } from 'react-redux';
import { authCheckStatusAction } from '../../actions/auth/loginAction';
import { useLogin } from '../hooks/useLogin';
import { RootStackParams } from '../navigation/StackNavigator';
import { RootState } from '../store';

export const AuthProvider = ( { children }: PropsWithChildren) => {
    const { status, user,token, message, isLoading } = useSelector((state: RootState) => state.loginStore);
    const { authCheckStatus } = useLogin();
    
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    useEffect(() => {
        authCheckStatus(user?.usuario?.phone ?? '',user?.usuario?.last_code ?? 0); 
      }, []);

      //export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';
      useEffect(() => {
        if ( status !== 'checking' ) {
          if ( status === 'authenticated' ) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'MainScreen' }],
            })
          } else {
            if( message?.length === 0 ){
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'WelcomeScreen' }],
                })
            }else{
                 navigation.navigate('LoginScreen');
            }
          }
        }
      
        
      }, [status])

  return ( 
    <>{children}</>
  )
}

 