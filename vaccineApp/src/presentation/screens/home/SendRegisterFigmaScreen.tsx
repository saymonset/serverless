import { StackScreenProps } from '@react-navigation/stack'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useRef, useState } from 'react'
import { Platform, ScrollView } from 'react-native'
import { RootStackParams } from '../../../navigator/StackNavigator'
import { MainLayout } from '../../layouts/MainLayout'
import { stylesFigma } from '../theme/appFigmaTheme'


interface Props extends StackScreenProps<RootStackParams, 'SendRegisterFigmaScreen'> {}
export const SendRegisterFigmaScreen = () => {

    const [ inputValue, setInputValue ] = useState('');
    const [ codValue, setCodValue ] = useState('');
    const inputRef = useRef(null);

    const onSubmit = async( ) => {
        console.log('pasa');
        if( codValue.trim().length <= 1) return;
        if( inputValue.trim().length <= 1) return;
        let phone = codValue.trim()+inputValue.trim();
           {/* Una vez que mande el phone, se actualiza una bandera en el store isSendCode y 
                                  esta en true  te redirije a colocar el codigo envisdo 
                              en  la pantala SendPhoneFigmaScreen en cerrarModal */}
       // await dispatch(sendSmsThunks( phone ));
      //  await dispatch(sendSmsFirstPrimaryThunks( phone ));
        setInputValue('');
        setCodValue( '' );
    }

    const onInputChange = (value:string) => {
        setInputValue( value );
    }

    const onCodInputChange = (value:string) => {
        setCodValue( value );
        if (value.length === 3 && inputRef.current) {
             inputRef.current.focus(); // Salta al campo inputValue
          }
    }
    
  return (
    <>
 
        <Layout style={{ flex:1 }}>
        <ScrollView style={{marginHorizontal: 10}}>
        
               {/* Background */} 
          <Text style={[stylesFigma.title, {textAlign:'left', left:10}]} category="h1">Registrar</Text>
          
           

             {/* Inputs */}
            <Layout style={{flex:1, flexDirection:'row', justifyContent:'space-between',marginTop: 10}}>
                <Layout  style={{flex:1,  flexWrap:'wrap', left:30, marginRight:20}}>
                        <Input
                        placeholder="+58"
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        underlineColorAndroid="rgba(0,0,0,0.4)"
                        style={[ 
                            stylesFigma.inputField,
                            ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                        ]}
                        onChangeText={ (value) => onCodInputChange(value) }
                        value={ codValue }
                        onSubmitEditing={ onSubmit }
                        autoCapitalize="none"
                        autoCorrect={ false }
                        maxLength={3} // Limita la entrada a tres caracteres
                    />
                </Layout>
                <Layout   style={{flex:2, right: ( Platform.OS === 'ios' )?60:90, marginBottom:0}}>
                    <Input
                            ref={inputRef} // Referencia al campo inputValue
                            placeholder="Número de télefono"
                            placeholderTextColor="rgba(0,0,0,0.4)"
                            underlineColorAndroid="rgba(0,0,0,0.4)"
                            style={[ 
                                stylesFigma.inputField,
                                ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                            ]}
                            selectionColor="rgba(0,0,0,0.4)"
                            onChangeText={ (value) => onInputChange(value) }
                            value={ inputValue }
                            onSubmitEditing={ onSubmit }
                            autoCapitalize="none"
                            autoCorrect={ false }
                            maxLength={15} // Limita la entrada a tres caracteres
                    />
                </Layout>
            </Layout>

            <Layout style={{ flex:1 }}>
                        <Text style={[stylesFigma.titlesecund, {textAlign:'left', left:10, marginTop:20}]}>
                        Al continuar acepta nuestra Politica de Privacidad y
                                                acepta que ha leído nuestros Términos y condiciones de Uso.
                        </Text>
                        {/* Button */}
                        <Layout style={{marginTop:(Platform.OS === 'ios') ? 20: 20, marginHorizontal:80 }}>
                                <Button 
                                    disabled={false}
                                
                                    onPress={onSubmit}>Enviar código</Button>
                        </Layout>
            </Layout>

        </ScrollView>   
         </Layout>
     
    </>
  )
}
