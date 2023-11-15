import React, { useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderTitle } from '../components/HeaderTitle';
import { styles } from '../theme/appTheme';
import { useForm } from '../hooks/useForm';
import { CustomSwitch } from '../components/CustomSwitch';

export const TextInputScreen = () => {

 const { form, onChange, isSubscribed} = useForm({
                      name:'',
                      email:'',
                      phone:'',
                      isSubscribed: false
                    });

  // const onChange = ( value: string, field: string) => {
  //       setForm({
  //         ...form,
  //         [field]: value
  //       })
  // }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={ styles.globalMargin }>
              <HeaderTitle title='Text input'></HeaderTitle>

              <TextInput
                  style={stylesScreen.inputStyle}
                  placeholder="Ingrese su nombre"
                  autoCorrect={false}
                  autoCapitalize="words"
                  onChangeText={ ( value ) => onChange( value, 'name') }
              /> 
              <TextInput
                  style = {stylesScreen.inputStyle}
                  placeholder="Ingrese su email"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={ ( value ) => onChange( value, 'email') }
                  keyboardType="email-address"
              /> 


              <View style = {stylesScreen.switchRow }>
                       <Text style = { stylesScreen.switchText}> isActive</Text>
                       <CustomSwitch isOn={ isSubscribed } onChange={ (value) => onChange( value,'isSubscribed')} />
              </View>

                  <HeaderTitle title={ JSON.stringify(form, null, 3)}></HeaderTitle>
                  <HeaderTitle title={ JSON.stringify(form, null, 3)}></HeaderTitle>
              <TextInput
                  style = {stylesScreen.inputStyle}
                  placeholder="Ingrese su teléfono"
                  onChangeText={ ( value ) => onChange( value, 'phone') }
                  keyboardType="phone-pad"
              /> 

              <View style={{ height: 100}}/>
            </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const stylesScreen = StyleSheet.create ({
  inputStyle : {
    borderWidth: 1,
    borderColor:'rgba(0,0,0,0.3)',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10

  },
  switchRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginVertical: 18
  },
  switchText: {
     fontSize: 25
  }
});
