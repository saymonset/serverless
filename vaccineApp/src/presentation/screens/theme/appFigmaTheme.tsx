import { StyleSheet } from "react-native";

export const stylesFigma = StyleSheet.create({
    formContainer: {
        flex: 1,
        flexDirection: 'column',
        // paddingHorizontal: 30,
        // flexDirection: 'row',
        // justifyContent:'center',
        // alignItems:'center',
        // height:0,
       // marginBottom: 100,
       //backgroundColor:'red'
    },
    globalMargin: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign:"center",
        color: 'black',
    }
    ,
    titlesecund: {
        fontSize: 15,
        textAlign:"left",
        color: 'black',
        marginHorizontal:30
    },
    titlesecundclear: {
        fontSize: 15,
        textAlign:"left",
        marginHorizontal:30
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    button: {
       // borderWidth: 2,
       // borderColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
        marginHorizontal: 10,
        width:170,
        backgroundColor: '#0077FF', // Replace with the desired stronger blue color
      },
    buttonText: {
        fontSize: 15,
        color: 'white',
        textAlign:'center'
    },
    buttonTextBlack: {
        fontSize: 12,
        color: 'black',
        textAlign: 'center',
       // fontWeight: 'bold', // Add this line to make the text bold
        },
    inputFieldIOS: {
        marginTop:5,
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        paddingBottom: 4,
    
    },
    inputField: {
        color:'black',
        fontSize: 20,
      
    },
    inputFieldPhoneCode: {
        color:'black',
        fontSize: 20,
        marginLeft:10,
      
    },
    inputFieldPhone: {
        color:'black',
        fontSize: 20,
        marginRight:200,
      
    },
    label: {
        color: 'black',
        fontWeight: 'bold',
    },
    newUserContainer: {
        alignItems: 'flex-end',
        marginTop: 10
    },
    buttonTextNewAaccount: {
        marginRight:30
    },
    
    container: {
        backgroundColor:'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 2,
      },
      card: {
        flex: 1,
        //backgroundColor: 'lightblue',
        borderRadius: 10,
      },
      cierrepopup: {
       marginLeft:290,
       marginTop:10
      },
     containerVaccine: {
        backgroundColor:'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 2,
    },
    hola: {
        fontWeight:'bold',
        fontSize: 24,
        color:'black'
      },
      datepicker: {
        marginVertical: 2,
      },

  

})
