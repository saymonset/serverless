import React from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View, Platform } from 'react-native';

{/** Function action Button */}
interface Props {
    title: string;
    position?:  'br' | 'bl'
    onPress: () => void; 
    
}

export const Fab = ({ title, onPress, position = 'br'}:Props) => {

    const ios  = ()  => {
            return (
                <TouchableOpacity
                    activeOpacity={ 0.8}
                    style={ [styles.fabLocation,
                            ( position === 'bl' ? styles.left : styles.right)
                            ]
                    }
                onPress={ () => onPress() }
            >
                <View style={styles.fab}>
                    <Text style={ styles.fabText } >{title}</Text> 
                </View>
        </TouchableOpacity>
            )
    }

    const android = () => {
        return (
            <View
            style={ [styles.fabLocationAndroid,
                ( position === 'bl' ? styles.left : styles.right)
                ]
            }
            >
                    <TouchableNativeFeedback
                            onPress={ () => onPress() }
                            background={TouchableNativeFeedback.Ripple(
                                'black', false,30
                            )}
                            >
                                <View style={styles.fab}>
                                    <Text style={ styles.fabText } >{title}</Text> 
                                </View>
                     </TouchableNativeFeedback>
            </View>
        )
        
    }
  return (
     Platform.OS === 'ios' ? android() : ios()

  )
}



const styles = StyleSheet.create({
    fabLocation:{
        position:'absolute',
        bottom: 10
    },
    fabLocationAndroid:{
        position:'absolute',
        bottom: 10,
    },
    right:{
         right:10,
    },
    left:{
      left: 10,

 },
    fab :{
      backgroundColor:'rgba(0,0,0,0.2)',
      width:60,
      height:60,
      borderRadius:100,
      justifyContent:'center',
      shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,

        elevation: 22,
    },
    fabText :{
      color:'white',
      fontSize:10,
      fontWeight:'bold',
      alignSelf:'center',

    }
  });