import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export const LoadingScreen = () => {
    return (
        <View style={ styles.activityContainer}>
            <ActivityIndicator
            size={ 50 }
            color='grey'
            ></ActivityIndicator>
            <Text>Cargando...</Text>
        </View>
        // <View style={{ 
        //     flex: 1,
        //     justifyContent: 'center',
        //     alignItems: 'center'
        // }}>
        //     <ActivityIndicator 
        //         size={ 50 }
        //         color="black"
        //     />
        // </View>
    )
}


const styles = StyleSheet.create({
    activityContainer :{
        flex:1,
       // backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    }
    
});