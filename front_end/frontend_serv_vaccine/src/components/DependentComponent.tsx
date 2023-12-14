import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, View, TextInput, TouchableOpacity, Keyboard, Alert, StyleSheet, SafeAreaView, ScrollView, Modal, TouchableWithoutFeedback, StyleProp, ViewStyle, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import { loginStyles } from '../theme/loginTheme'


import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack';
import { Register } from '../interfaces';
import { LoadingScreen } from '../screens/LoadingScreen';
import {   UseGenderComponent } from './GenderComponent';
import { styles } from '../theme/dependentTheme';
import { UseUserComponent } from './UserComponent';
import { CustomSwitch } from './CustomSwitch';
import { UseRelationShipComponent } from './RelationShipComponent';
import { useDependent } from '../hooks/useDependent';
import { stylesModal } from '../theme/modalTheme';
import { dependentThunks, removeErrorThunks} from '../store/slices/dependent/dependentThunks.js';
import { useNavigation } from '@react-navigation/native';
import { CalendarComponent } from './CalendarComponent'
import DatePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../context/AuthContext';
 

interface Props extends StackScreenProps<any,any>{}

interface Props1  {
    isVisible:boolean;
    onClose: () => void;
    width: number;
    height: number;
    onRegister: () => void;
}

export const DependentComponent = ( { onClose, onRegister, width, height }: Props1 ) => {
    
   

    
    const dispatch = useDispatch();
   

      {/** Estas variables vienen del store */}
        const { isLoading, name:nameUser,lastname:lastnameUser, phone:phoneUser, email:emailUser, birth:birthUser
        ,gender_id:gender_idUser, status:statusUser, edit, _id  } = useSelector( (state: store ) => state.dependentStore);
        const { token, loginResponse } = useSelector( (state: store ) => state.loginStore);


        {/** Estas variables son para inicializar el formulario */}
        const inic = {
                        name:nameUser,
                        lastname:lastnameUser,
                        phone:phoneUser,
                        email:emailUser,
                        birth:birthUser,
                        gender_id:gender_idUser,
                        status:statusUser
                        }
        const {name,  lastname,  phone, email,  birth, status, selectedGeneroId, selectedUserId, selecteRelationShipId, onChange,
            onGeneroSelectTrigger, onUserSelectTrigger, onRelationShipSelectTrigger, onDependent} = useDependent({...inic});

         
   
             const onRegister1 = async() => {
                let gender_id = selectedGeneroId;
                let user_id =  selectedUserId;
                let relationship_id =  selecteRelationShipId;
                let insertDependent = {
                    _id,
                    name,
                    lastname,
                    email,
                    phone,
                    gender_id,
                    birth,
                    user_id,
                    relationship_id,
                    status 
                  };
                await dispatch(dependentThunks( insertDependent, token, loginResponse));
                return onRegister();

             }
            

             
          
             const onDateSelection = (date:Date)=>{
                  onChange(date, 'birth')
              }
     


    return (
        <>
         <View
            style={{
                ...stylesModal.fatherFramework
            }}
        >
      <View
        style={{
                ...stylesModal.childFramework,
                width: width,
                height: height,
                
        }}
       >
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: '#585858' }}
                behavior={ ( Platform.OS === 'ios') ? 'padding': 'height' }>
                            <ScrollView>
                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                                    <View >                
                                                        <Text style={ loginStyles.title }>Dependents</Text>
                                                        <SafeAreaView 
                                                                style={[styles.container]}>
                                                                <View style={[styles.column]}>
                                                                                <View>
                                                                                    <Text style={ loginStyles.label }>Name:</Text>
                                                                                    <TextInput 
                                                                                        placeholder="Enter your name:"
                                                                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                                                                        underlineColorAndroid="white"
                                                                                        style={[ 
                                                                                            loginStyles.inputField,
                                                                                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                                                                        ]}
                                                                                        selectionColor="white"

                                                                                        onChangeText={ (value) => onChange(value, 'name') }
                                                                                        value={ name }
                                                                                        onSubmitEditing={ onDependent }

                                                                                        autoCapitalize="words"
                                                                                        autoCorrect={ false }
                                                                                    />
                                                                                </View> 
                                                                                <View>
                                                                                        <Text style={ loginStyles.label }>Email:</Text>
                                                                                        <TextInput 
                                                                                            placeholder="Enter your email:"
                                                                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                                                                            keyboardType="email-address"
                                                                                            underlineColorAndroid="white"
                                                                                            style={[ 
                                                                                                loginStyles.inputField,
                                                                                                ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                                                                            ]}
                                                                                            selectionColor="white"

                                                                                            onChangeText={ (value) => onChange(value, 'email') }
                                                                                            value={ email }
                                                                                            onSubmitEditing={ onDependent }


                                                                                            autoCapitalize="none"
                                                                                            autoCorrect={ false }
                                                                                        />
                                                                                </View>

                                                                                <View>
                                                                                    <Text style={ loginStyles.label }>Birth:</Text>
                                                                                    <CalendarComponent onDateSelection= {(value) => onDateSelection(value)}/>
                                                                                </View>
                                                                                <View>
                                                                                            <Text style={ loginStyles.label }>Gender:</Text>
                                                                                            < UseGenderComponent onPress={ (value) => onGeneroSelectTrigger(value) }/>
                                                                                </View>  
                                                                            
                                                                </View>
                                                                <View style={[styles.column]}>
                                                                        <View>
                                                                                <Text style={ loginStyles.label }>Lastname:</Text>
                                                                                <TextInput 
                                                                                    placeholder="Enter your lastname:"
                                                                                    placeholderTextColor="rgba(255,255,255,0.4)"
                                                                                    underlineColorAndroid="white"
                                                                                    style={[ 
                                                                                        loginStyles.inputField,
                                                                                        ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                                                                    ]}
                                                                                    selectionColor="white"

                                                                                    onChangeText={ (value) => onChange(value, 'lastname') }
                                                                                    value={ lastname }
                                                                                    onSubmitEditing={ onDependent }

                                                                                    autoCapitalize="words"
                                                                                    autoCorrect={ false }
                                                                                />
                                                                            </View> 
                                                                            <View>
                                                                                <Text style={ loginStyles.label }>Phone:</Text>
                                                                                <TextInput 
                                                                                    placeholder="+112223333344"
                                                                                    placeholderTextColor="rgba(255,255,255,0.4)"
                                                                                    underlineColorAndroid="white"
                                                                                    style={[ 
                                                                                        loginStyles.inputField,
                                                                                        ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                                                                    ]}
                                                                                    selectionColor="white"

                                                                                    onChangeText={ (value) => onChange(value, 'phone') }
                                                                                    value={ phone }
                                                                                    onSubmitEditing={ onDependent }

                                                                                    autoCapitalize="words"
                                                                                    autoCorrect={ false }
                                                                                />
                                                                            </View>
                                                                    <View>
                                                                                <Text style={ loginStyles.label }>Status:</Text>
                                                                                <CustomSwitch isOn= { true } onChange={ ( status ) =>  onChange(status, 'status') }></CustomSwitch>
                                                                    </View>  
                                                                    <View>
                                                                                            <Text style={ loginStyles.label }>Relationship</Text>
                                                                                            <UseRelationShipComponent onPress={ onRelationShipSelectTrigger }/>
                                                                    </View>  
                                                                
                                                                    {/* <View>
                                                                            <Text style={ loginStyles.label }>User:</Text>
                                                                            <UseUserComponent onPress={ onUserSelectTrigger }/>
                                                                    </View>   */}
                                                                </View>
                                                           
                                                                
                                                </SafeAreaView>
                                                {   ( isLoading ) && <LoadingScreen /> }          
                                    </View>
                                </TouchableWithoutFeedback>
                        </ScrollView>
            </KeyboardAvoidingView>

              {/** Botones */}
                 <View style={{ flexDirection: 'row',justifyContent:'space-between', marginBottom:0, marginHorizontal:1, bottom:5 }}>
                                            <TouchableOpacity onPress={onClose} style={{ marginTop: 0 }}>
                                                 <Ionicons name="close" size={40} color="red" />
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={  onRegister1  } style={{ marginTop: 0 }}>
                                                <Ionicons name="save" size={40} color="green" />
                                            </TouchableOpacity>
                 </View>
                </View>
          </View>
        </>
    )
}



