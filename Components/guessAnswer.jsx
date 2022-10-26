import { useState } from "react";
import{
    View,
    TextInput,
    TouchableOpacity,
    Text
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postRequest } from "../apiConnection";

const GuessAnswer = ({id}) => {

    const [answer, setAnswer] = useState("");


    const guessAnswer = async () =>{
        const key = await AsyncStorage.getItem('RoomKey');
        console.log(answer)
        console.log("rooms/guess?id="+ id+ "&key=" + key+ "&word=" + answer)
        await postRequest("rooms/guess?id="+ id
            + "&key=" + key
            + "&word=" + answer).then((data) =>{
                console.log(data);
            }).catch((error) => {
                console.log(error)
            });
    }


    return (
        <View style={{ ...GlobalStyles.container, marginTop: 40, width: "100%" }}>
            <TextInput style={{ ...GlobalStyles.input, width: "90%", }}
                value={answer}
                onChangeText={setAnswer}
                placeholder={"Guess Word"} />
            <TouchableOpacity
                style={{ ...GlobalStyles.button, width: "40%" }}
                onPress={guessAnswer}
            >
                <Text style={GlobalStyles.button.text}>Guess</Text>
            </TouchableOpacity>
        </View>

    );
}

export default GuessAnswer;