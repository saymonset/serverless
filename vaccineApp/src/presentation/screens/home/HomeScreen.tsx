import React from 'react'
import { Icon, Layout, Text, Button } from '@ui-kitten/components';

function HomeScreen() {
  return (
    <Layout style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      
      <Text>HomeScreen</Text>
    
      
       <Button
        accessoryLeft={  <Icon name="facebook" /> }
       >
          cerrar session
       </Button>
    </Layout>
  )
}

export default HomeScreen