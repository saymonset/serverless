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
    newUserContainer: {
        alignItems: 'flex-end',
        marginTop: 10
    },
    buttonTextNewAaccount: {
        marginRight:30
    },
    
    

})
