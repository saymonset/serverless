import React from 'react'
import { View, Platform } from 'react-native'

export const BackgroundSendPhoneFigma = () => {
    return (
        <View 
            style={{
                position: 'absolute',
                backgroundColor: 'white',
              //  top: Platform.OS==='ios'? -450: -250,
                width: 1000,
                height: 1200,
                // transform: [
                //     { rotate: '-70deg' }
                // ]
            }}
        />
    )
}
