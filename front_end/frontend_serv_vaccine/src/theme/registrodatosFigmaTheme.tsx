import { StyleSheet } from "react-native";

 

export const styles = StyleSheet.create({
 
    right:{
        right:10,
   },
   left:{
     left: 10,
   },
   top:{
       top: 40,
     },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign:'center',
      top:30
  
    },
      container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
      },
      column: {
        flex: 1,
        marginRight: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
      },
      buttonx: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        borderRadius:100,
        backgroundColor:'blue',
      },
      fabLocationBR:{
           position:'absolute',
           bottom: -10,
           right:200,
  
      },
      fabLocationBL:{
        position:'absolute',
        bottom: -10,
        left: 50,
  
   },
      fab :{
        backgroundColor:'#5856D6',
        width:60,
        height:60,
        borderRadius:100,
        justifyContent:'center'
      },
      fabText :{
        color:'white',
        fontSize:10,
        fontWeight:'bold',
        alignSelf:'center',
  
      }
    });