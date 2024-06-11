import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, MenuItem, OverflowMenu , Text} from '@ui-kitten/components';


const data = [
    'Developer',
    'Designer',
    'Product Manager',
  ];
  
  const groupedData = {
    'UI/UX': [
      'Frontend Developer',
      'Designer',
    ],
    'Management': [
      'Product Manager',
      'Business Analyst',
    ],
  };

export const SelectLenguage = (): React.ReactElement => {
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [visible, setVisible] = React.useState(false);
  
    const onItemSelect = (index): void => {
      setSelectedIndex(index);
      setVisible(false);
    };
  
    const renderToggleButton = (): React.ReactElement => (
      
        <Text 
        status="primary" 
        category="s1"
          style={{ backgroundColor: '#80BFFF', color:'#FFFFFF',marginTop:(Platform.OS==='ios')?0:0 }}
          onPress={() => setVisible(true)}
         >
        Idioma
     </Text>
    );
  
    return (
      <Layout
        style={styles.container}
        level='1'
      >
        <OverflowMenu
          style={{  backgroundColor: '#80BFFF'  }}
          anchor={renderToggleButton}
          visible={visible}
          selectedIndex={selectedIndex}
          onSelect={onItemSelect}
          onBackdropPress={() => setVisible(false)}
        >
          <MenuItem title='Users' />
          <MenuItem title='Orders' />
          <MenuItem title='Transactions' />
        </OverflowMenu>
      </Layout>
    );
  };

  const styles = StyleSheet.create({
    container: {
      minHeight: 144,
      backgroundColor: '#80BFFF'
    },
  });
  