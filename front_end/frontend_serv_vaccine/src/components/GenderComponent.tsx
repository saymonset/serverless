import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useSelector } from 'react-redux';
import vaccinesApi from '../api/vaccinesApi';
import { AuthContext } from '../context/AuthContext';
 
 

interface Props {
    onPress: (value:string)=> void;
  }

export const UseGenderComponent = ({ onPress}:Props) => {

  const { authState:{genders} } = useContext(AuthContext)
  const { gender_id } = useSelector( (state: store ) => state.dependentStore);

  



  const [selected, setSelected] = React.useState('');
  const [data,setData] = React.useState([]);
  const [ selectedByDefault, setSelectedByDefault] = React.useState({
                                            key:'',
                                            value: ''
                                          });


  const getGenders = async () => {
    try {
      setData( genders as never);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data && data.length>0){
       let obj = data.filter((value)=>{
        let { key } = value;
        if ( key === gender_id)
        return value;
       });
       if (obj && obj.length > 0){
        setSelectedByDefault(obj[0]);
       }
    }
  }, [gender_id]);


  useEffect(() => {
    getGenders();
  }, []);
//defaultOption
  return  (
         <SelectList
               //  boxStyles={{...styles.container2, ...styles.text}} 
                 inputStyles={styles.text} 
                 dropdownItemStyles={{backgroundColor:'gray'}} 
                 dropdownTextStyles={{color:'white'}} 
                 setSelected={setSelected}
                 data={data} 
                 search={true}
                 placeholder="select gender"
                 defaultOption={selectedByDefault} // Set the default value
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
    color: 'black',
    fontSize: 12,
  },
});

 