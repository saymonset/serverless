import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Alert, useWindowDimensions } from 'react-native'
import { MyIcon } from '../../components/ui/MyIcon'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../../navigator/Navigator'
import { loginCiThunks } from '../../../store'
import { AnyAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

interface Props extends StackScreenProps<RootStackParams,'LoginScreen'>{}

export const LoginScreen = ({ navigation }: Props) => {

    const [isPosting, setIsPosting] = useState(false)
    const [form, setForm] = useState({
      ci: '',
      password: '',
    });
    const { height } = useWindowDimensions();

    const dispatch = useDispatch();

  const onLogin = async() => {
  
    if ( form.ci.length === 0 || form.password.length === 0 ) {
      return;
    }
    setIsPosting(true);
    const wasSuccessful =  await dispatch(loginCiThunks(form.ci, form.password));
    setIsPosting(false);

    if ( wasSuccessful ) return;
    
    Alert.alert('Error', 'Usuario o contraseña incorrectos');

  }
  return (
     <Layout style={{flex:1}}>
        <ScrollView style = {{ marginHorizontal:40}}>
            <Layout style = {{ paddingTop: height * 0.35}}>
                <Text category='h1'>Ingresar</Text>
                <Text category='p2'>Por favor, ingrese para continuar</Text>
            </Layout>

            { /* Inputs */}
            <Layout style={{marginTop:20}}>
                   <Input
                      placeholder='CI'
                      //keyboardType='email-address'
                      autoCapitalize='none'
                      value={ form.ci }
                      onChangeText={ (ci) => setForm({ ...form, ci })}
                     // accessoryLeft={<MyIcon name="email-outline"/>}
                      style={{marginBottom: 10}}
                   ></Input>
                   <Input
                      placeholder='Contraseña'
                      autoCapitalize='none'
                      secureTextEntry
                      accessoryLeft={<MyIcon name="lock-outline"/>}
                      value={ form.password }
                      onChangeText={ (password) => setForm({ ...form, password })}
                      style={{marginBottom: 10}}
                   ></Input>
            </Layout>

            {/* Space */}
            <Layout style={{height:20}}/>
            <Layout>
                {/** button */}
                <Button 
                  disabled={isPosting}
                   onPress={ onLogin }
                   //appearance="ghost"
                   accessoryRight={<MyIcon name="arrow-forward-outline" white/>}
                   >
                     Ingresar
                </Button>
            </Layout>

            {/**Informacion para guardar cuenta */}
                {/* Space */}
            <Layout style={{height:20}}/>
            
            <Layout style={{
                alignItems:'flex-end',
                flexDirection:'row',
                justifyContent:'center'
            }}>
                <Text>  No tienes cuenta?</Text>
                <Text status='primary'
                      category='s1'
                      onPress={ ()=> navigation.navigate('RegisterScreen')}
                      >  crea una</Text>

            </Layout>


        </ScrollView>
     </Layout>
  )
}
 
