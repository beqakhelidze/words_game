import { useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postRequest } from "../apiConnection";

const GuessAnswer = ({ id, setHints }) => {

    const [answer, setAnswer] = useState("");
    const [disabled, setDisabled] = useState(false);

    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: "You already guessed word.",
        });
        setDisabled(true);
    }

    const guessAnswer = async () => {
        const key = await AsyncStorage.getItem('RoomKey');
        await postRequest("rooms/guess?id=" + id
            + "&key=" + key
            + "&guess=" + answer).then((data) => {
                if (data.isCorrect){
                    setHints(answer.split(""));
                }
            }).catch((error) => {
                showToast();
            });
    }

    return (
        <View style={{ ...GlobalStyles.container, ...styles.guessContainer }}>
            <TextInput style={{ ...GlobalStyles.input, width: "80%", }}
                value={answer}
                onChangeText={setAnswer}
                placeholder={"Guess Word"} />
            <TouchableOpacity
                style={{ ...GlobalStyles.button, width: "20%" }}
                onPress={guessAnswer}
                disabled={disabled}
            >
                <Text style={GlobalStyles.button.text}>Guess</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    guessContainer: {
        marginTop: 25,
        width: "90%",
        flexDirection:"row",
    }
})

export default GuessAnswer;