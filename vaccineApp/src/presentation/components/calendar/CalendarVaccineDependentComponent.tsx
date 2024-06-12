import { Card, Text } from '@ui-kitten/components'
import React from 'react'
import { CalendarVaccineByDependentResponse, CalendarVaccineDependent } from '../../../infrastructure/interfaces/calendar-vaccinebydependents'
import { stylesFigma } from '../../screens/theme/appFigmaTheme'

interface Props {
    item: CalendarVaccineDependent
}

export const CalendarVaccineDependentComponent = ( { item }:Props) => {
  return (
    <>
      <Card 
                                      style={{flex:1}}
                                          onPress = { ( item ) => console.log()}
                                      >
                                          <Text
                                              numberOfLines={ 2 }
                                              style ={{ textAlign:'left'}}
                                          >{ item.datevaccine  }</Text>
                                          <Text
                                              numberOfLines={ 2 }
                                              style ={{ textAlign:'left'}}
                                          >{ item.name  }</Text>
                                          <Text
                                              numberOfLines={ 2 }
                                              style ={{ textAlign:'left'}}
                                          >{ item.dosisMissingandAplied  }</Text>
                                           
                                      </Card>
    </>
  )
}
