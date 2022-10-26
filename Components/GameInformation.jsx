import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity,} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { putRequest } from "../apiConnection";
import GlobalStyles from "../styles";
import Participants from "./Participants";

const GameInformation = ({ mainInformation, participants, customWords, }) => {

    if (!mainInformation) return null;

    const [seeParticipants, setSeeParticipants] = useState(false);

    const setReady = async () => {
        const key = await AsyncStorage.getItem("RoomKey");
        console.log(key);
        putRequest("rooms/ready?id=" + mainInformation.id + "&key=" + key);
    }

    return (
        <View style={styles.containerWithoutFlex}>
            <View style={styles.gameInfo}>
                <View style={styles.gameInfo.section}>
                    <Text style={styles.gameInfo.section.text}>Max Players:{mainInformation.maxPlayers}</Text>
                    <Text style={styles.gameInfo.section.text}>Duration:{mainInformation.gameDurationSeconds}</Text>
                </View>
                <View style={styles.gameInfo.section}>
                    <Text style={styles.gameInfo.section.text}>
                        Custom Words:{customWords}
                    </Text>
                    <Text style={styles.gameInfo.section.text}>
                        Hints enabled mode:{mainInformation.hintsEnabled ? "on" : "off"}
                    </Text>
                </View>
            </View>

            <View style={GlobalStyles.flexDirectionRow}>
                <TouchableOpacity
                    style={{ ...GlobalStyles.button, width: "38%" }}
                    onPress={() => setSeeParticipants(true)}
                >
                    <Text style={GlobalStyles.button.text}>See Participants</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ ...GlobalStyles.button, width: "38%" }}
                    onPress={setReady}
                >
                    <Text style={GlobalStyles.button.text}>Ready</Text>
                </TouchableOpacity>
            </View>

            {seeParticipants && <Participants modalVisible={seeParticipants}
                setModalVisible={setSeeParticipants}
                participants={participants} />}
        </View>
    );
}

const styles = StyleSheet.create({
    containerWithoutFlex:{
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center",
        alignItems:"center",
        marginTop:6,
    },
    gameInfo: {
        width:"90%",
        flexDirection: "row",
        justifyContent:"space-evenly",
        section: {
            marginHorizontal: 10,
            text: {
                fontSize: 17,
            }
        }
    }
})


export default GameInformation;