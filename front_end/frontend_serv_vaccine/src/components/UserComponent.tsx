import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useEffect } from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import vaccinesApi from '../api/vaccinesApi';

interface Props {
    onPress: (value:string)=> void;
  }

export const UseUserComponent = ({onPress}:Props) => {

  const [selected, setSelected] = React.useState("");
  const [data,setData] = React.useState([]);

  const getObjects = async () => {
    try {
      
    
      let  {data:{users}} = await vaccinesApi.get(`/users/20/0`);


      
      
      
      setData( users.map((obj) => ({
        key: obj.user._id.$oid,
        value: obj.more.name + ' ' +obj.more.lastname,
        disabled: false
      })));
      //Set Data Variable
     

    } catch (error) {
      console.error(error);
    }
  };

 

  useEffect(() => {
   
    getObjects();
  }, []);

  return  (
         <SelectList
               //  boxStyles={{...styles.container2, ...styles.text}} 
                 inputStyles={styles.text} 
                 dropdownItemStyles={{backgroundColor:'gray'}} 
                 dropdownTextStyles={{color:'white'}} 
                 setSelected={setSelected}
                 data={data} 
                 search={false}
                 placeholder="select user"
                 onSelect={() => onPress(selected)} />
)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container2: {
    flex: 1,
   backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
});

 