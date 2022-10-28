import { useState } from "react";
import {
    TextInput,
    TouchableOpacity,
    Text,
    View
} from "react-native";
import GlobalStyles from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postRequest } from "../apiConnection";

const CustomWord = ({id}) => {

    const [customWord, setCustomWord] = useState("");

    const addCustomWord = async () => {
        const key = await AsyncStorage.getItem('RoomKey');
        await postRequest("rooms/word?id="
            + id
            + "&key=" + key
            + "&word=" + customWord).then(() =>{
                setCustomWord("");
            }).catch((error) => {
                console.log(error)
            });
    }

    return (
        <View style={{ flexDirection: "row" }}>
            <TextInput style={{ ...GlobalStyles.input, width: "60%" }}
                value={customWord}
                onChangeText={setCustomWord}
                placeholder={"Custom Word"} />
            <TouchableOpacity
                style={GlobalStyles.button}
                onPress={addCustomWord}
            >
                <Text style={GlobalStyles.button.text}>Add Word</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CustomWord;