import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ToastAndroid
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from "@react-navigation/native";
import {
    useEffect,
    useState
} from "react";
import GlobalStyles from "../styles";

const Toast = ({ visible, message }) => {
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


const JoinRoom = ({ navigation }) => {

    const [roomKey, setRoomKey] = useState("");
    const [username, setUsername] = useState("Guest");
    const [visibleToast, setVisibleToast] = useState({
        visibility: false,
        message: "",
    });
    const route = useRoute();

    const JoinRoom = async () => {
        await AsyncStorage.setItem('RoomKey', roomKey);
        await AsyncStorage.setItem('Username', username);
        navigation.navigate("gaming");
    }

    useEffect(() => {
        if (route.params){
            setVisibleToast({
                visibility:true,
                message:route.params.errorMessage
            })
        }
    },[route])

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.Title}>Join Room</Text>
            <View style={GlobalStyles.form}>
                <TextInput style={GlobalStyles.input}
                    value={roomKey}
                    onChangeText={setRoomKey}
                    placeholder={"Room Key"} />
                <TextInput style={GlobalStyles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder={"Username"} />
            </View>
            <TouchableOpacity
                style={GlobalStyles.button}
                onPress={JoinRoom}
            >
                <Text style={GlobalStyles.button.text}>Join</Text>
            </TouchableOpacity>

            <View >
                <Toast visible={visibleToast.visibility} message={visibleToast.message} />
            </View>

        </View>
    );
}


export default JoinRoom;