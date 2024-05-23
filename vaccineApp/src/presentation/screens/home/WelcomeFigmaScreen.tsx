
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Layout , Text} from '@ui-kitten/components';
import React from 'react'
import {  Image, Platform, useWindowDimensions } from 'react-native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useSendSms } from '../../hooks/useSendSms';
import { stylesFigma } from '../theme/appFigmaTheme';
 
interface Props extends StackScreenProps<RootStackParams, 'WelcomeScreen'> {}

export const WelcomeScreen = ({ navigation }:Props) => {
      {/*  Cargamos data en el contexto */}
      const {height} = useWindowDimensions();


  const { sendSmsPhone  } =  useSendSms();


      const sendSms = ()  =>{
        sendSmsPhone();
        navigation.navigate('HomeScreen');
        
      }
  return (
    <>
    <Layout style={{flex:1, backgroundColor: '#80BFFF'}}>
        <Layout style={{ flex:1 , paddingTop: height * 0.05, backgroundColor: '#80BFFF',}}>
               {/* Background */} 
          <Text style={[stylesFigma.title, {textAlign:'left', left:10}]} category="h1">Bienvenido</Text>
          {/* Space */}
          <Layout style={{height: 10, backgroundColor: '#80BFFF'}} />
            <Text category="p2" style= {[stylesFigma.titlesecund,{left:10}]}
            >Registra tu información médica, accede a ella siempre que lo necesite</Text>
        
         {/* Space */}
          <Layout style={{  marginTop:(Platform.OS === 'ios') ? 180: 250, marginLeft:(Platform.OS === 'ios') ? 100: 180, backgroundColor: '#80BFFF'}}>
                <Image 
                      source={ require('../../../assets/hola.png') }
                      style={{
                      width: 110,
                      height: 100,
                      backgroundColor: '#80BFFF'
                                                }}
                                            />
          </Layout>

           {/* Button */}
        <Layout style={{marginTop:(Platform.OS === 'ios') ? 110: 110, marginHorizontal:100 }}>
          <Button 
            disabled={false}
           
            onPress={sendSms}>Comienza ahora</Button>
        </Layout>
        
          {/* Text */}
          <Layout style={{backgroundColor: '#80BFFF', flex:1, justifyContent:'center', alignItems:'center',
                  marginTop:(Platform.OS === 'ios') ? 130: 130 , marginHorizontal:0, marginVertical:0}}>
             <Text 
             status="primary" 
             category="s1"
               style={{ backgroundColor: '#80BFFF',marginTop:(Platform.OS==='ios')?-60:-180 }}
                onPress={() => navigation.navigate('LoginScreen')}
              >
             Inicia sessión
          </Text>
        </Layout>
         </Layout>
    </Layout>                                
       
    </>
  )
}
