import { StyleSheet } from "react-native";

export const stylesModal = StyleSheet.create({
    fatherFramework: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    childFramework: {
        width: 300,
        height: 690,
        bottom:0,
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        elevation: 10,
        borderRadius: 5,
    }
    

})
