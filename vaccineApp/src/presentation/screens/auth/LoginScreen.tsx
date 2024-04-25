import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler'
import { Alert, useWindowDimensions } from 'react-native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { MyIcon } from '../../components/ui/MyIcon';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store';
import { increment } from '../../store/slices/counter';
import { useLogin } from '../../hooks/useLogin';
import { loginCiThunks } from '../../store/slices/login/loginThunks';
import { loginSlice } from '../../store/slices/login/loginSlice';


interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen =  ({ navigation }:Props) => {
  {
   

    const { login, token, message, isLoading } =  useLogin();

    const { value } = useSelector((state: RootState) => state.counter)
    const dispatch= useDispatch();
      
    const onLogin = async() => {
      if ( form.email.length === 0 || form.password.length === 0 ) {
        return;
      }
     // const wasSuccessful = dispatch(loginCiThunks({ ci: form.email, password: form.password }));
      login( form.email, form.password);
      //if ( wasSuccessful ) return;
    }
    

    // const { login } = useAuthStore();
    
    const [form, setForm] = useState({
      email: '',
      password: '',
    });
  
    const {height} = useWindowDimensions();

     


       {/* Solo para sacar mensajes de error por pantalla */}
       useEffect(() => {
        if( message?.length === 0 ) return;
        Alert.alert('Error', message);
       }, [ message ])

    return (
      <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar { token ?? ' nada '}</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={ form.email }
            onChangeText={ (email) => setForm({ ...form, email })}
            accessoryLeft={ <MyIcon name="email-outline" />}
            style={{marginBottom: 10}}
          />

          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            value={ form.password }
            onChangeText={ (password) => setForm({ ...form, password })}
            accessoryLeft={ <MyIcon name="lock-outline" />}
            style={{marginBottom: 10}}
          />
        </Layout>


        {/* Space */}
        <Layout style={{height: 10}} />

        {/* Button */}
        <Layout>
          <Button 
            disabled={isLoading}
            accessoryRight={ <MyIcon name="arrow-forward-outline" white /> }
            onPress={onLogin}>Ingresar</Button>
        </Layout>

        {/* Información para crear cuenta */}
        <Layout style={{height: 50}} />

        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>¿No tienes cuenta?</Text>
          <Text 
            status="primary" 
            category="s1"
            // onPress={() => dispatch(increment())}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            {' '}
            crea una{' '}
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
    )
  }
}