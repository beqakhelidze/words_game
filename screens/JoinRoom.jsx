import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    TouchableOpacity
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    useState
} from "react";
import GlobalStyles from "../styles";


const JoinRoom = ({navigation}) => {

    const [roomKey, setRoomKey] = useState("");
    const [username, setUsername] = useState("");

    const JoinRoom = async () => {
        await AsyncStorage.setItem('RoomKey', roomKey);
        await AsyncStorage.setItem('Username', username);
        navigation.navigate("gaming");
    }

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.Title}>Join Room</Text>
            <View style={GlobalStyles.form}>
                <TextInput style={GlobalStyles.input}
                    value={roomKey}
                    onChangeText={setRoomKey}
                    placeholder={"Room Key"}/>
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

        </View>
    );
}


export default JoinRoom;