import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    TouchableOpacity
} from "react-native";
import {
    useState
} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import GlobalStyles from "../styles";
import { postRequest } from "../apiConnection";


const CreateRoom = ({ navigation }) => {

    const [username, setUsername] = useState("");
    const [Players, setPlayers] = useState("");
    const [Duration, setDuration] = useState("");
    const [isHintsChecked, setHintsChecked] = useState(false);
    const [isCustomWordsChecked, setCustomWordsChecked] = useState(false);

    const createRoom = async () => {

        postRequest("rooms?maxPlayers=" + Players +
            "&gameDurationSeconds=" + Duration +
            "&disableHints=" + isHintsChecked +
            "&customWords=" + isCustomWordsChecked).then(async (data) => {
                await AsyncStorage.setItem('RoomKey', data.key);
                await AsyncStorage.setItem('Username', username);
                navigation.navigate("gaming");
            }).catch((error) => {
                console.log(error);
            })
    }

    console.log(isHintsChecked,isCustomWordsChecked);

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.Title}>Create new room</Text>
            <View style={GlobalStyles.form}>
                <TextInput style={GlobalStyles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder={"Username"} />
                <TextInput style={GlobalStyles.input}
                    value={Players}
                    onChangeText={setPlayers}
                    placeholder={"Max Players"}
                    keyboardType="number-pad" />
                <TextInput style={GlobalStyles.input}
                    value={Duration}
                    onChangeText={setDuration}
                    placeholder={"Game Guration (Seconds)"}
                    keyboardType="number-pad" />
                <View
                    style={GlobalStyles.checkBox}
                >
                    <Text style={GlobalStyles.checkBox.text}>
                        Disable Hints
                    </Text>
                    <Checkbox
                        value={isHintsChecked}
                        onValueChange={setHintsChecked}
                        color={isHintsChecked ? '#1976d2' : undefined}
                    />
                </View>
                <View
                    style={GlobalStyles.checkBox}
                >
                    <Text style={GlobalStyles.checkBox.text}>
                        Use Custom Words
                    </Text>
                    <Checkbox
                        value={isCustomWordsChecked}
                        onValueChange={setCustomWordsChecked}
                        color={isCustomWordsChecked ? '#1976d2' : undefined}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={GlobalStyles.button}
                onPress={createRoom}
            >
                <Text style={GlobalStyles.button.text}>Create</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        width: "80%",
    }
})


export default CreateRoom;