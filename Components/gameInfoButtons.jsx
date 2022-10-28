import GlobalStyles from "../styles";
import { useState, useEffect} from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Keyboard
} from "react-native";
import { putRequest } from "../apiConnection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from "react-native-vector-icons/Entypo";

import Participants from "./Participants";

const GameInfoButtons = ({ participants, mainInformation}) => {

    const [seeParticipants, setSeeParticipants] = useState(false);
    const [elementVisible, setElementVisible] = useState(true);

    const setReady = async () => {
        const key = await AsyncStorage.getItem("RoomKey");
        console.log(key);
        putRequest("rooms/ready?id=" + mainInformation.id + "&key=" + key);
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setElementVisible(false);
          }
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setElementVisible(true);
          }
        );
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);
    

    if (!elementVisible){
        return null;
    }

    return (
        <View style={GlobalStyles.container}>
            <View style={{ ...GlobalStyles.flexDirectionRow, ...styles.gameInfoButtons }}>
                <TouchableOpacity
                    style={{ ...GlobalStyles.button, ...styles.roundButton }}
                    onPress={() => setSeeParticipants(true)}
                >
                    <MaterialCommunityIcons name="account-group" size={40} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...GlobalStyles.button, ...styles.roundButton }}
                    onPress={setReady}
                >
                    <Entypo name="check" size={40}  color="white"/>
                </TouchableOpacity>
            </View>

            {
                seeParticipants && <Participants modalVisible={seeParticipants}
                    setModalVisible={setSeeParticipants}
                    participants={participants} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    gameInfoButtons: {
        width: "100%",
        position: "absolute",
        bottom: 7,
        justifyContent: "space-around",
    },
    roundButton: {
        borderRadius: 50,
        width: 60,
        height: 60,
    },
})

export default GameInfoButtons;