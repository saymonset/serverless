import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import { selectOption } from '../../../infrastructure/interfaces/select-option';
import useState from 'react';

interface Props  {
  items:selectOption[];
  onPress: ( value: selectOption ) => void;
  idSelected?: string
}

export const SelectSimpleUsageShowcase = ({items, onPress, idSelected = ''}:Props): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0));

  const [selectionText, setSelectionText] = React.useState('');
  const [ selectedByDefault, setSelectedByDefault] = React.useState({
    key:'',
    value: ''
  });
 

  const handleSelect = (index: IndexPath | IndexPath[]) => {
    setSelectedIndex(index);
    const selectedOptions = Array.isArray(index) ? index.map(i => items[i.row]) : [items[index.row]];
    selectedOptions.forEach(item => {
     let selected : selectOption =  {
        key: item.key,
        value: item.value,
      }

      setSelectionText(selected.value);
      //Enviamos de retorno el valor
      onPress(selected);
    });
  };

 
 /** Buscamos el index ya seleccionado que trae el usuario  */
 const loadDefaultForIndex = () => {
  let indexPath = new IndexPath(0);
  if (items && items.length > 0) {
    let index = items.findIndex((value) => value.key === idSelected);
    if (index !== -1) {
     
      indexPath = new IndexPath(index);
      setSelectedIndex(indexPath);
    }
  }
  return indexPath;
};

  

  /** Buscamos el valor ya seleccionado que trae el usuario */
  const loadDefault = () => {
    if (items && items.length>0){
      let obj = items.filter((value)=>{
      let { key } = value;
        if ( key == idSelected){
          return value;
        }
      });
      if (obj && obj.length > 0){
        const { key, value } = obj[0];
        setSelectedByDefault({ key, value } );
        setSelectionText(value);
      }
  }
 }
 useEffect(() => {
  loadDefault();
  loadDefaultForIndex();
 }, [])
 

  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <Select
           selectedIndex={ selectedIndex}
            onSelect={handleSelect}
           
            caption={selectionText}
            >
              
            {items.map(option => (
                <SelectItem key={option.key} title={`${option.value}`} />
            ))}
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 0,
  },
});