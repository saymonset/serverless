import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView,Button, StyleSheet, Platform, Text, View, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native'


import { AuthContext } from '../context/AuthContext';
import { loginStyles } from '../theme/loginTheme'

import { WhiteLogo } from '../components/WhiteLogo'
import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack';
import { UserPart1 } from './UserPart1';


interface Props extends StackScreenProps<any,any>{}


export const UserPartTotal = ( { navigation }: Props ) => {

    const { signUp, errorMessage, removeError } = useContext( AuthContext );

    // const { email, password, name, lastname, ci, state, city, birth, gender_id, status, onChange } = useForm({
    //     name: '',
    //     lastname:'',
    //     password: '' ,
    //     ci:'',
    //     email: '',
    //     state:'',
    //     city:'',
    //     birth:'',
    //     gender_id:'',
    //     status: true

       
    //  });

     useEffect(() => {
        if( errorMessage.length === 0 ) return;

        Alert.alert( 'Registro incorrecto', errorMessage,[{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [ errorMessage ])
 
     const onRegister = () => {
       //  console.log({email, password, name, lastname, ci, state, city, birth, gender_id, status});
         Keyboard.dismiss();
     }

     {/**  iA */}
     const [name, setName] = useState('');
     const [lastName, setLastName] = useState('');
     const [birthday, setBirthday] = useState('');
     const [ci, setCI] = useState('');
     const [status, setStatus] = useState('');
     const [gender, setGender] = useState('');
     const [role, setRole] = useState('');
   
     const handleSubmit = () => {
       // Handle form submission here
       // You can access the form values using the state variables (name, lastName, etc.)
       // Perform any necessary validation or data processing before submitting
       // You can also make an API call to send the form data to a server
   
       // Example: Log the form values to the console
       console.log('Name:', name);
       console.log('Last Name:', lastName);
       console.log('Birthday:', birthday);
       console.log('CI:', ci);
       console.log('Status:', status);
       console.log('Gender:', gender);
       console.log('Role:', role);
     };

    return (
        <View style={styles.container}>
      <View style={styles.column}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Birthday"
          value={birthday}
          onChangeText={text => setBirthday(text)}
        />
      </View>
      <View style={styles.column}>
        <TextInput
          style={styles.input}
          placeholder="CI"
          value={ci}
          onChangeText={text => setCI(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Status"
          value={status}
          onChangeText={text => setStatus(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={gender}
          onChangeText={text => setGender(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Role"
          value={role}
          onChangeText={text => setRole(text)}
        />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
    )
}



const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginTop: 20,
    },
    column: {
      flex: 1,
      marginRight: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      marginBottom: 10,
    },
  });