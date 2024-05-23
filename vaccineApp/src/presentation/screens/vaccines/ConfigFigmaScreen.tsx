import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Layout, Text } from '@ui-kitten/components';
import { Image, Pressable, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { stylesFigma } from '../theme/appFigmaTheme';
import { useDispatch } from 'react-redux';
import { useLogin } from '../../hooks/useLogin';
import { VaccinesModal } from '../../components/VaccinesModal';
import { Vaccine } from '../../../domain/entities/VaccineDependent';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useVaccines } from '../../hooks/useVaccines';
import { LoadingScreen } from '../loading/LoadingScreen';
//import { Vaccine } from '../../../../domain/entities/VaccineDependent';
import { useInfiniteQuery } from '@tanstack/react-query';
 

interface CardProps {
  title: string;
  color: string;
  iconName: string;
}
export const ConfigFigmaScreen = () => {
   
  const [alignItems, setAlignItems] = useState('Consultas');
  const { vaccines, isLoading, getVaccinesAll} = useVaccines();

 
    
    const loadVaccines = async ()=>{
      let term:string = "''";
         await   getVaccinesAll(term);
    }

    useEffect(() => {
      if (!vaccines || vaccines.length==0){
        loadVaccines();
      }
    }, []);

 

  return (
    <>
     {  isLoading && (  <LoadingScreen />  )}
      <PreviewLayout
        label="Servicios"
        selectedValue={alignItems}
        values={[ {title:'Vacunas', color:'rgb(180, 210, 255)', iconName:"eyedrop-outline"}, 
                  {title:'Dosis', color:'oldlace', iconName:"brush-outline"},]}
        setSelectedValue={setAlignItems}>
      </PreviewLayout>
    </>
    
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
  
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { logoutThunks } = useLogin();
  const [chooseVaccine, setChooseVaccine] = useState(false);
  const [idVaccine, setIdVaccine] = useState('');

  //Vamos a cargar dosis por el tipo de vacuna
  useEffect(() => {
    if (idVaccine!=''){
       navigation.navigate( 'DosisFigmaScreen' ,{ vaccineId: idVaccine})
    }
    setIdVaccine('')
  }, [idVaccine])

 

    const onVaccine = (value:Vaccine) =>{
      setIdVaccine(value._id.$oid);
      setChooseVaccine(false);
    }

    const handleClose = (isClose: boolean) =>{
       
        setChooseVaccine(false);
       
    }

    
    

  
 
 
  const goPage = (selectedValue: string) => {
        switch (selectedValue) {
          case 'Vacunas':
            // Este metodo: Segun la bandera que se coloca en el store me condiciona este componentre: ApplyVaccinesvaccinesScreen, ApplyVaccinesComponent
            navigation.navigate( 'VaccineFigmaScreen' as never)
            break;
          case 'Dosis':
            // Este metodo: Segun la bandera que se coloca en el store me condiciona este componentre: ApplyVaccinesvaccinesScreen, ApplyVaccinesComponent
            setChooseVaccine(true)
             //
            break;
          default:
            break;
        }
  }
  
  const logout = () => {
    
    logoutThunks();
}

  return (
    <>
       
          <Layout style={{padding: 5, flex: 1, backgroundColor:'white'}}>
              <Layout style={{flexDirection:'column'}}>

                     
                    
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

          {/* Vaccines */}
          { chooseVaccine && <VaccinesModal 
                                  isVisible
                                  title='Seleccione la vacuna'
                                  onClose = { ( value ) => handleClose( value )}
                                  onData={(value) =>{
                                    
                                    onVaccine(value);
                              }}></VaccinesModal> }
    </>
 
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

 
