 
 import React from 'react'
import { useGender } from '../hooks/useGender';
 
 interface Props {
    onPress: (value:string)=> void;
    gender_id?: string;
  }
 export const UseGenderComponent = ({ onPress, gender_id}:Props) => {

    const { genders } = useGender();

   return (
     <div>UseGenderComponent</div>
   )
 }
 