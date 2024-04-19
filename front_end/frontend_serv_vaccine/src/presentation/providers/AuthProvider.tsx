import { PropsWithChildren, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../navigator/Navigator';
import { useDispatch, useSelector } from 'react-redux';
import { authCheckStatusThunks, store } from '../../store'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { status, user  } = useSelector( (state: store ) => state.useAuthStore)
  //const { checkStatus, status } = useAuthStore();

  const onCheckStatus = async() => {
    console.log('-----1-B-------------'+status);
    const wasSuccessful =  await dispatch(authCheckStatusThunks(user) );
    console.log('-----2A-------------');
  }
  useEffect(() => {
    onCheckStatus();
  }, [])

  useEffect(() => {
    if ( status !== 'checking' ) {
      if ( status === 'authenticated' ) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeFigmaTabRootScreen' }],
        })
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        })
      }
    }
  
    
  }, [status])
  
  


  return (
    <>{ children }</>
  )
}