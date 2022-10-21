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
import GlobalStyles from "../styles";


const JoinRoom = () => {

    const [roomKey, setRoomKey] = useState("");
    const [username, setUsername] = useState("");

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.Title}>Join Room</Text>
            <View style={GlobalStyles.form}>
                <TextInput style={GlobalStyles.input}
                    value={roomKey}
                    onChange={setRoomKey}
                    placeholder={"Room Key"}
                    keyboardType="number-pad" />
                <TextInput style={GlobalStyles.input}
                    value={username}
                    onChange={setUsername}
                    placeholder={"Username"} />
            </View>
            <TouchableOpacity
                style={GlobalStyles.button}
                onPress={() => { }}
            >
                <Text style={GlobalStyles.button.text}>Join</Text>
            </TouchableOpacity>

        </View>
    );
}


export default JoinRoom;