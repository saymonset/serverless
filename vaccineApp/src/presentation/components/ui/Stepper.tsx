import { Text } from '@ui-kitten/components';
import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { CalendarVaccineDependent } from '../../../infrastructure/interfaces/calendar-vaccinebydependents';
import { CalendarVaccineDependentComponent } from '../calendar/CalendarVaccineDependentComponent';
import dummyData from './data';

const stepIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: '#fe7013',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#aaaaaa',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 15,
    currentStepLabelColor: '#fe7013',
  };

  interface Props {
    titleVaccine: string,
    dosisApplied: number,
    ofCountDosis: number
    titleDosis : string[],
  }
 

  const labels = ["Primaria | Al nacer\n20/12/2024", "Primaria | Al nacer\n20/12/2024", "Primaria | Al nacer\n20/12/2024"];

export const Stepper = ( { titleVaccine  = 'BSG1', dosisApplied = 3,  ofCountDosis = 3, titleDosis = [] } : Props) => {
  const [currentPage, setCurrentPage] = React.useState<number>(dosisApplied);
  const [count, setCount] = React.useState<number>(ofCountDosis);
  const [labels, setLabels] = React.useState<string[]>([]);

  useEffect(() => {
    setCurrentPage(dosisApplied)
  }, [dosisApplied])

  useEffect(() => {
    setCount(ofCountDosis)
  }, [ofCountDosis])

  useEffect(() => {
    setLabels(titleDosis)
  }, [titleDosis])
  

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <Text
          category='h1'
        >
              {titleVaccine}
        </Text>
        <StepIndicator
          customStyles={{
            ...stepIndicatorStyles,
            stepIndicatorLabelCurrentColor: stepIndicatorStyles.stepIndicatorLabelFinishedColor,
          }}
          
          stepCount={ 3 }
          direction="vertical"
          currentPosition={3}
          labels={labels}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#ffffff',
    },
    stepIndicator: {
     marginVertical: 50,
      paddingHorizontal: 20,
    },
    rowItem: {
     // marginTop:120,
      flex: 3,
      paddingVertical: 0,
    },
    title: {
      flex: 1,
      fontSize: 20,
      color: '#333333',
      paddingVertical: 16,
      fontWeight: '600',
    },
    body: {
      flex: 1,
      fontSize: 15,
      color: '#606060',
      lineHeight: 24,
      marginRight: 8,
    },
  });