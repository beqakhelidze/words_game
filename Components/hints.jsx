import {
    View,
    Text,
    StyleSheet
} from "react-native";

const Hints = ({ hints }) => {

    return (
        <View style={styles.hints}>
            {hints.map((char, index) => {
                return (
                    <Text key={index}  style={styles.hints.char}>
                        {char ? char : "_"}
                    </Text>
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    hints: {
        flexDirection: "row",
        flexWrap: "wrap",
        char:{
            fontSize:23,
            margin:2,
            padding:4,
            fontWeight:"bold",
            backgroundColor:"rgb(189, 195, 199)"
        }
    }
})

export default Hints;