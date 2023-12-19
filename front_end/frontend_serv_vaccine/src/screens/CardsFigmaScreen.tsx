import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type {PropsWithChildren} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Row } from 'react-native-reanimated-table';


interface CardProps {
    title: string;
    color: string;
    iconName: string;
  }
  
export const CardsFigmaScreen = () => {
  const [alignItems, setAlignItems] = useState('Consultas');

  return (
    <PreviewLayout
      label="Servicios"
      selectedValue={alignItems}
      values={[ {title:'Consultas', color:'rgb(180, 210, 255)', iconName:"medkit-outline"}, 
                {title:'Patologías', color:'oldlace', iconName:"pulse-outline"},
                {title:'Vacunación', color:'rgb(180, 230, 200)', iconName:"eyedrop-outline"},
                {title:'Embarazo', color:'rgb(230, 210, 255)', iconName:"woman-outline"}]}
      setSelectedValue={setAlignItems}>
    </PreviewLayout>
  );
};

type PreviewLayoutProps = PropsWithChildren<{
  label: string;
  values: CardProps[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}>;

const PreviewLayout = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
}: PreviewLayoutProps) => (
  <View style={{padding: 10, flex: 1, backgroundColor:'white'}}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.row}>
      {values.map(value => (
        <TouchableOpacity
          key={value.title}
          onPress={() => setSelectedValue(value.title)}
          style={[{...styles.button,
            backgroundColor:value.color}, selectedValue === value.title && {...styles.selected, backgroundColor:value.color}]}>
           <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
               <Icon name={ value.iconName } size = { 20 } color = { "black" }/>
                <Text
                    style={[
                    {...styles.buttonLabel,
                        marginLeft:20,
                    },
                    selectedValue === value.title && styles.selectedLabel,
                    ]}>
                    {value.title}
                </Text>
            </View>
        </TouchableOpacity>
      ))}
    </View>
    {/* <View style={[styles.container, {[label]: selectedValue}]}>{children}</View> */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'aliceblue',
    minHeight: 200,
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    height:50,
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'gray',
  },
  selectedLabel: {
    color: 'black',
  },
  label: {
    textAlign: 'left',
    marginBottom: 10,
    fontSize: 24,
  },
});