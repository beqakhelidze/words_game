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
import Checkbox from 'expo-checkbox';
import GlobalStyles from "../styles";


const CreateRoom = () => {

    const [Players, setPlayers] = useState("");
    const [Duration, setDuration] = useState("");
    const [isHintsChecked, setHintsChecked] = useState(false);
    const [isCustomWordsChecked, setCustomWordsChecked] = useState(false);

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.Title}>Create new room</Text>
            <View style={GlobalStyles.form}>
                <TextInput style={GlobalStyles.input}
                    value={Players}
                    onChange={setPlayers}
                    placeholder={"Max Players"}
                    keyboardType="number-pad" />
                <TextInput style={GlobalStyles.input}
                    value={Duration}
                    onChange={setDuration}
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
                onPress={() => {}}
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