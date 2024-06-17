import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import moment from 'moment';
import { useSelector } from "react-redux";
import { stylesFigma } from "../../screens/theme/appFigmaTheme";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface IProps  {
    date:Date;
    onDateSelection: (date: Date) => void;
    placeholder: string;
}
 
export const CalendarFigmaComponent : React.FC<IProps> = ({ date, placeholder, onDateSelection }) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(date ? new Date(date) : undefined);
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);

  
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


  
    return (
      <View>
           <TouchableOpacity onPress={showDatePicker} style={{ marginTop: 0 }}>
                                             <Text
                                                style={[ 
                                                    stylesFigma.inputField,
                                                    ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS,{marginTop:0}
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