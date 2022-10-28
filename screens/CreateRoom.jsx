import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ToastAndroid
} from "react-native";
import {
    useState
} from "react";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import GlobalStyles from "../styles";
import { postRequest } from "../apiConnection";

const ToastVisible = ({ visible, message }) => {
    if (visible) {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
        return null;
    }
    return null;
};


const CreateRoom = ({ navigation }) => {

    const [username, setUsername] = useState("Guest");
    const [Players, setPlayers] = useState(5);
    const [Duration, setDuration] = useState(60);
    const [isHintsChecked, setHintsChecked] = useState(false);
    const [isCustomWordsChecked, setCustomWordsChecked] = useState(false);
    const [visibleToast, setVisibleToast] = useState({
        visibility: false,
        message: "",
    });


    const throwError = (value) => {
        setVisibleToast({
            visibility: true,
            message: value,
        });
    }

    const createRoom = async () => {

        if (!username) {
            throwError("Username is required!")
            return;
        }

        postRequest("rooms?maxPlayers=" + Players +
            "&gameDurationSeconds=" + Duration +
            "&disableHints=" + isHintsChecked +
            "&customWords=" + isCustomWordsChecked).then(async (data) => {
                console.log(data.key);
                await AsyncStorage.setItem('RoomKey', data.key);
                await AsyncStorage.setItem('Username', username);
                navigation.navigate("gaming");
            }).catch((error) => {
                throwError(error[0]);
            })
    }



    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.Title}>Create new room</Text>
            <View style={GlobalStyles.form}>
                <TextInput style={GlobalStyles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder={"Username"} />
                <TextInput style={GlobalStyles.input}
                    value={Players.toString()}
                    onChangeText={setPlayers}
                    placeholder={"Max Players"}
                    keyboardType="number-pad" />
                <TextInput style={GlobalStyles.input}
                    value={Duration.toString()}
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

            <View>
                <ToastVisible visible={visibleToast.visibility} message={visibleToast.message} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        width: "80%",
    }
})


export default CreateRoom;