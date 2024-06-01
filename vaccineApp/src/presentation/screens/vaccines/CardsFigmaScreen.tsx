import React, { PropsWithChildren, useState } from 'react'
import { Layout, Text } from '@ui-kitten/components';
import { Dimensions, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { stylesFigma } from '../theme/appFigmaTheme';
import { useDispatch } from 'react-redux';
import { useLogin } from '../../hooks/useLogin';

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
  const { logoutThunks } = useLogin();
  const screenWidth = Dimensions.get("window").width;

  const dispatch = useDispatch();

  
 
 
  const goPage = (selectedValue: string) => {
        switch (selectedValue) {
          case 'Consultas':
            // Este metodo: Segun la bandera que se coloca en el store me condiciona este componentre: ApplyVaccinesDependentsScreen, ApplyVaccinesComponent
            
            navigation.navigate( 'ConsultVaccinesDependentsScreen' as never)
            break;

          case 'Patologías':
             
            break;
          case 'Vacunación':
            // Este metodo: Segun la bandera que se coloca en el store me condiciona este componentre: ApplyVaccinesDependentsScreen, ApplyVaccinesComponent
           
            navigation.navigate( 'ApplyVaccinesDependentsScreen' as never)
            break;
          case 'Embarazo':
            break;
          default:
            break;
        }
  }
  
  const logout = () => {
    
    logoutThunks();
}

  return (

  <Layout style={{padding: 5, flex: 1, backgroundColor:'white', width: screenWidth - 10,}}>
    <Layout style={{flexDirection:'column'}}>

    <Pressable
              
                onPress={() =>logout()}
              >
                <Layout style={{alignItems:'flex-end'}}>
                        <Layout>
                          <Icon name='arrow-back-circle-outline' size = { 20 } color = { "black" }/>
                        </Layout>
                </Layout>
      </Pressable>
     
      <Layout  style={{flexDirection:'row', 
                     alignItems:'center',
                     }}>
              <Text style={stylesFigma.hola}>Hola!</Text>  
        <Image 
              source={ require('../../../assets/hola.png') }
              style={{
                  width: 50,
                  height: 50,
                  marginLeft:10,
              }}
          />
        </Layout>
      <Layout style={{flex:1}}>
         <Text style={styles.label}>{label}</Text>
          <Layout style={styles.row}>
            {values.map(value => (
              <Pressable
                key={value.title}
                onPress={() => {
                          setSelectedValue(value.title)
                          goPage( value.title )
                        
                        }}
                style={[{...styles.button,
                  backgroundColor:value.color}, selectedValue === value.title && {...styles.selected, backgroundColor:value.color}]}>
                <Layout style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
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
                  </Layout>
              </Pressable>
            ))}
          </Layout>

      </Layout>

    </Layout>
  </Layout>
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

 
