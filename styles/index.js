import { StyleSheet } from "react-native";

export default GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    mainColor: {
        color:"#1976d2",
    },
    flexDirectionRow:{
        flexDirection:"row"
    },
    Title: {
        fontSize: 30,
        marginVertical: 20,
    },
    form:{
        width:"80%",
    },
    input: {
        height: 40,
        marginVertical:12,
        borderWidth: 1,
        width: '100%',
        borderRadius:4,
        padding:9,
    },
    checkBox:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginVertical:6,
        text:{
            margin:5,
            fontSize:20,
        }
    },
    button: {
        fontSize:20,
        backgroundColor:"#1976d2",
        padding:8,
        borderRadius:6,
        margin:10,
        alignItems:"center",
        justifyContent:"center",
        height:40,
        text:{
            fontSize:18,
            color:"white",
        }
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        paddingBottom:15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
})