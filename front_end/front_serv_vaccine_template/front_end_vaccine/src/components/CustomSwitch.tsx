import React from 'react'
import { Switch } from 'react-native-gesture-handler'
import { Platform } from 'react-native'; 
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import { useState } from 'react';

interface Props {
    isOn: boolean;
}

export const CustomSwitch = ({ isOn } : Props) => {

    const [ isEnabled, setIsEnabled ] = useState( isOn );

    const toggleSwitch = () => setIsEnabled( !isEnabled );

  return (
    <Switch
        trackColor={{ false: '#D9D9DB', true: '#5856d6'}}
        thumbColor= { (Platform.OS === 'android') ? '#5856d6' : '' }
        onValueChange={ toggleSwitch }
        value = { isEnabled} 
        />
  )
}
