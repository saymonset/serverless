import React from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View, Platform, ViewStyle } from 'react-native';

{/** Function action Button */}
interface Props {
    title: string;
    position?:  'br' | 'bl'
    onPress: () => void; 
    
}

export const FabButton = ({ title, onPress, position = 'br'}:Props) => {

    const ios  = ()  => {
            return (
                <TouchableOpacity
                    activeOpacity={ 0.8}
                    style={ [{...styles.fabLocation, ...styles.top},
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
            style={ [{...styles.fabLocationAndroid, ...styles.top},
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
        position:'absolute'
    },
    fabLocationAndroid:{
        position:'absolute'
    },
    right:{
         right:10,
    },
    left:{
      left: 10,
    },
    top:{
        top: 40,
      },
    fab :{
        borderWidth: 1,
        borderColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 100
    },
    fabText :{
    //   fontWeight:'bold',
    //   alignSelf:'center',
      fontSize: 18,
      color: 'white',

    }
  });