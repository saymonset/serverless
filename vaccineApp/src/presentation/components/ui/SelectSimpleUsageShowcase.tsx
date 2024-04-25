import React from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

export const SelectSimpleUsageShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0));

  const [options, setOptions] = React.useState([
    { id: '1', title: 'Option 1' },
    { id: '2', title: 'Option 2' },
  ]);

  const handleSelect = (index: IndexPath | IndexPath[]) => {
    setSelectedIndex(index);
    const selectedOptions = Array.isArray(index) ? index.map(i => options[i.row]) : [options[index.row]];
    selectedOptions.forEach(option => {
      console.log('id:', option.id);
      console.log('title:', option.title);
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
            >
            {options.map(option => (
                <SelectItem key={option.id} title={option.title} />
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