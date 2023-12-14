import React from 'react'
import { View, Platform } from 'react-native'

export const Background = () => {
    return (
        <View 
            style={{
                position: 'absolute',
                backgroundColor: '#585858',
                top: Platform.OS==='ios'? -450: -250,
                width: 1000,
                height: 1200,
                transform: [
                    { rotate: '-70deg' }
                ]
            }}
        />
    )
}
