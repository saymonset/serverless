import React from 'react';
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

  const [selectionText, setSelectionText] = React.useState('')
 

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

  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <Select
            selectedIndex={selectedIndex}
            onSelect={handleSelect}
            label={selectionText}
            caption=''
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