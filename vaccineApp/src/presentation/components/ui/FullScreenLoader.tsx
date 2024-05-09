import { Layout, Spinner, Text } from '@ui-kitten/components';


export const FullScreenLoader = () => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner 
        size="giant" 
      />
       <Text>Cargando...</Text>
    </Layout>
  )
}