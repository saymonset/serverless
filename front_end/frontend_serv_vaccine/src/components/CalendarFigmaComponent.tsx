import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { comunStylesFigma } from '../theme/comunFigmaTheme';
import { useSelector } from 'react-redux';


interface Props  {
    date:Date;
    onDateSelection: () => void;
    placeholder: string;
}
 
export const CalendarFigmaComponent : React.FC<IProps> = ({ date, placeholder, onDateSelection }) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(date ? new Date(date) : undefined);
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
    const { birth } = useSelector( (state: store ) => state.dependentStore);
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date: Date) => {
      setSelectedDate(date);
      onDateSelection(date);
      hideDatePicker();
    };

    useEffect(() => {
      if ( birth ){
        setSelectedDate(birth);
      }
    }, [birth]);
  
    return (
      <View>
           <TouchableOpacity onPress={showDatePicker} style={{ marginTop: 0 }}>
                                             <Text
                                                style={[ 
                                                    comunStylesFigma.inputField,
                                                    ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS,{marginTop:0}
                                                ]}
                                                >{selectedDate ? moment(selectedDate).format('DD-MM-YYYY') : placeholder}</Text>
                                                <Ionicons name="calendar-outline" size={40} color="black" />
          </TouchableOpacity>
        
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    );
  };
    

 