import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import type {PropsWithChildren} from 'react';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { comunStylesFigma } from '../theme/comunFigmaTheme';
import { useNavigation } from '@react-navigation/native';
import { logoutThunks } from '../store/slices/login/loginThunks'
import {  onIsConsultVaccine, onIsAddApplyVaccine  } from '../store/slices/applyvaccines/applyVaccinesSlice';

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
}: PreviewLayoutProps) => {
  
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const onConsultVaccine =  ()  => {
    const payload =  {};
    dispatch( onIsConsultVaccine(payload))
  }
 
  const onAddApplyVaccine =  ()  => {
    const payload =  {};
    dispatch( onIsAddApplyVaccine(payload))
  }
  const goPage = (selectedValue: string) => {
        switch (selectedValue) {
          case 'Consultas':
            // Este metodo: Segun la bandera que se coloca en el store me condiciona este componentre: ApplyVaccinesDependentsScreen, ApplyVaccinesComponent
            onConsultVaccine();
            navigation.navigate( 'ConsultVaccinesDependentsScreen' as never)
            break;

          case 'Patologías':
             
            break;
          case 'Vacunación':
            // Este metodo: Segun la bandera que se coloca en el store me condiciona este componentre: ApplyVaccinesDependentsScreen, ApplyVaccinesComponent
            onAddApplyVaccine();
            navigation.navigate( 'ApplyVaccinesDependentsScreen' as never)
            break;
          case 'Embarazo':
            break;
          default:
            break;
        }
  }
  
  const logout =async () => {
    
    await dispatch(logoutThunks());
}

  return (
  <View style={{padding: 5, flex: 1, backgroundColor:'white'}}>
    <View style={{flexDirection:'column'}}>

    <TouchableOpacity
              
                onPress={() =>logout()}
              >
                <View style={{alignItems:'flex-end'}}>
                        <View>
                          <Icon name='arrow-back-circle-outline' size = { 20 } color = { "black" }/>
                        </View>
                </View>
              </TouchableOpacity>
     
      <View  style={{flexDirection:'row', 
                     alignItems:'center',
                     }}>
              <Text style={comunStylesFigma.hola}>Hola!</Text>  
        <Image 
              source={ require('../assets/hola.png') }
              style={{
                  width: 50,
                  height: 50,
                  marginLeft:10,
              }}
          />
        </View>
      <View style={{flex:1}}>
         <Text style={styles.label}>{label}</Text>
          <View style={styles.row}>
            {values.map(value => (
              <TouchableOpacity
                key={value.title}
                onPress={() => {
                          setSelectedValue(value.title)
                          goPage( value.title )
                        
                        }}
                style={[{...styles.button,
                  backgroundColor:value.color}, selectedValue === value.title && {...styles.selected, backgroundColor:value.color}]}>
                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Icon name={ value.iconName } size = { 40 } color = { "black" }/>
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

      </View>

    </View>
  </View>
) };

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
    color:'black'
  },

});