 import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
 
 export const NeedHelpContact = () => {
   return (
     <View style={ {
                  marginTop:0,
                  paddingBottom:30,
                  justifyContent:'flex-start',
                  alignItems:'center',
                  flex:1}}>
                                    <View style ={{flex:1}}/>
                                    <View style={{marginTop:0}}>
                                            <TouchableOpacity onPress={() => {}}>
                                                <View style={{flexDirection:'row'}}>
                                                    <Text style={{ color: 'black' }}>¿Neceitas ayuda?
                                                            
                                                    </Text>
                                                    <Text style={{ color: 'skyblue',paddingLeft:10 }}>Contactanos</Text>
                                                </View>
                                            </TouchableOpacity>
                                    </View>
     </View>
   )
 }
 
