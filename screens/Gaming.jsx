import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import GlobalStyles from "../styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

let socket;

const setSocket = async(value) => {
    socket = io('http://192.168.100.99:3000/rooms?key='+value+'&username=givi123',
        {
            transports: ["websocket", "polling"],
        },
    );
}

const Gaming = () => {

    const [gameInfo, setGameInfo] = useState({});

    const setEvents = async () => {
        const value = await AsyncStorage.getItem('RoomKey');
        await setSocket(value);
        socket.on("game.data.received", (data) =>{
            console.log(data);
            setGameInfo(data);
        })
    }

    useEffect(() => {
        setEvents();
    }, []);


    return (
        <View style={GlobalStyles.container}>
            <View style={styles.gameInfo}>
                <Text>Max Players:{gameInfo.maxPlayers}</Text>
                <Text>Duration:{gameInfo.gameDurationSeconds}</Text>
                <Text>Duration:{gameInfo.gameDurationSeconds}</Text>
                <Text>Duration:{gameInfo.hintsEnabled}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    gameInfo:{

    }
})

export default Gaming;