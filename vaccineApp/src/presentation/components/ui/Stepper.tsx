import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native';
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

  let calendarVaccineDependent: CalendarVaccineDependent ={
    datevaccine:'20/12/2024',
    name: ` Simon Alberto rodriguez`,
    dosisMissingandAplied:`  dosis apliccada`
  }

  const labels = ["uno", "dos", "saymon"];

export const Stepper = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const viewabilityConfig = React.useRef({ itemVisiblePercentThreshold: 40 })
    .current;

  const renderPage = (rowData: any) => {
    const item = rowData.item;
    return (
      <View style={styles.rowItem}>
        <CalendarVaccineDependentComponent item={item.title} />
      </View>
    );
  };

  const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
    const visibleItemsCount = viewableItems.length;
    if (visibleItemsCount !== 0) {
      setCurrentPage(viewableItems[visibleItemsCount - 1].index);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={{
            ...stepIndicatorStyles,
            stepIndicatorLabelCurrentColor: stepIndicatorStyles.stepIndicatorLabelFinishedColor,
          }}
          
          stepCount={3}
          direction="vertical"
          currentPosition={currentPage}
          labels={labels}
          stepIndicatorLabelAlign="flex-start"
        />
      </View>
      <FlatList
        style={{ flexGrow: 1 }}
        data={dummyData.data}
        renderItem={renderPage}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
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
      marginVertical: 250,
      paddingHorizontal: 20,
    },
    rowItem: {
      marginTop:120,
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