import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import GlobalStyles from "../styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import Participants from "./Participants";
import { putRequest } from "../apiConnection/putRequest";

let socket;

const setSocket = async () => {

    const key = await AsyncStorage.getItem('RoomKey');
    const username = await AsyncStorage.getItem('Username');

    socket = io('http://10.127.3.71:3000/rooms?key=' + key + '&username=' + username,
        {
            transports: ["websocket", "polling"],
        },
    );
}

const Gaming = ({ navigation }) => {

    const [gameInfo, setGameInfo] = useState({});
    const [seeParticipants, setSeeParticipants] = useState(false);
    const [participants, setParticipants] = useState([]);

    const setEvents = async () => {
        await setSocket();

        socket.on("connection.error", (data) => {
            navigation.navigate("default");
        })

        socket.on("game.data.received", (data) => {
            console.log(data);
            setParticipants(data.participants);
            delete data.participants;
            setGameInfo(data);
        })

        socket.on("participant.ready", (data) =>{
            setParticipantReady(data.username);
        })
    }

    const setParticipantReady = (username) => {
        setParticipants((prev) =>{
            return prev.map(element => {
                return element.username == username ? {...element, isReady:true}: element;
            })
        })
    }

    const setReady = async () => {
        const key = await AsyncStorage.getItem('RoomKey');
        const response = putRequest("rooms/ready?id="+gameInfo.id+"&key="+key)
    }

    useEffect(() => {
        setEvents();
    }, []);


    return (
        <View style={GlobalStyles.container}>
            <View style={styles.gameInfo}>
                <View style={styles.gameInfo.section}>
                    <Text style={styles.gameInfo.section.text}>Max Players:{gameInfo.maxPlayers}</Text>
                    <Text style={styles.gameInfo.section.text}>Duration:{gameInfo.gameDurationSeconds}</Text>
                </View>
                <View style={styles.gameInfo.section}>
                    <Text style={styles.gameInfo.section.text}>
                        Custom Words mode:{gameInfo.customWords ? "on" : "off"}
                    </Text>
                    <Text style={styles.gameInfo.section.text}>
                        Hints enabled mode:{gameInfo.hintsEnabled ? "on" : "off"}
                    </Text>
                </View>
            </View>

            <View style={GlobalStyles.flexDirectionRow}>
                <TouchableOpacity
                    style={GlobalStyles.button}
                    onPress={() => setSeeParticipants(true)}
                >
                    <Text style={GlobalStyles.button.text}>See Participants</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={GlobalStyles.button}
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
    gameInfo: {
        flexDirection: "row",
        section: {
            flex: 1,
            alignItems: "center",
            text: {
                fontSize: 17,
            }
        }
    }
})

export default Gaming;