import {
    View,
    Text
} from "react-native";
import GlobalStyles from "../styles";

const GameNotStarted = () => {
    return (
        <View style={GlobalStyles.container}>
            <Text style={{ ...GlobalStyles.Title, marginTop: 150, }}>The game hasn't started!</Text>
        </View>
    );
}

export default GameNotStarted;