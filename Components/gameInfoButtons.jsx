import GlobalStyles from "../styles";
import { useState, useEffect } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    Text
} from "react-native";
import { putRequest } from "../apiConnection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from "react-native-vector-icons/Entypo";
import Participants from "./Participants";
import RoomKey from "./roomKey";

const GameInfoButtons = ({ participants, mainInformation, isReady, setIsReady }) => {

    const [seeParticipants, setSeeParticipants] = useState(false);
    const [elementVisible, setElementVisible] = useState(true);
    const [seeRoomKey, setSeeRoomKey] = useState(false);

    const setReady = async () => {
        const key = await AsyncStorage.getItem("RoomKey");
        putRequest("rooms/ready?id=" + mainInformation.id + "&key=" + key).then(() => {
            setIsReady(true);
        });
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


    if (!elementVisible) {
        return null;
    }

    return (
        <View style={GlobalStyles.container}>
            <View style={{ ...GlobalStyles.flexDirectionRow, ...styles.gameInfoButtons }}>
                <TouchableOpacity
                    style={{ ...GlobalStyles.button, ...styles.roundButton }}
                    onPress={() => setSeeParticipants(true)}
                >
                    <MaterialCommunityIcons name="account-group" size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...GlobalStyles.button, ...styles.roundButton }}
                    onPress={() => setSeeRoomKey(true)}
                >
                    <MaterialCommunityIcons name="shield-key" size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...GlobalStyles.button,
                        ...styles.roundButton,
                        backgroundColor: isReady ? "#808080" : "#1976d2",
                    }}
                    onPress={setReady}
                    disabled={isReady}
                >
                    <Entypo name="check" size={40} color="white" />
                </TouchableOpacity>
            </View>

            {
                seeParticipants && <Participants modalVisible={seeParticipants}
                    setModalVisible={setSeeParticipants}
                    participants={participants} />
            }
            {
                seeRoomKey && <RoomKey modalVisible={seeRoomKey}
                    setModalVisible={setSeeRoomKey} />
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
        text: {
            fontSize: 25,
        }
    },
})

export default GameInfoButtons;