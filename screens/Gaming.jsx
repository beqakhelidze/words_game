import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

const socket = io('http://192.168.100.99:3000/rooms?key=bcbb7262-5154-4ca2-b5cb-4ea1d9379a6a&username=givi',
    {
        transports: ["websocket", "polling"],
    },
);


const Gaming = () => {

    const setEvents = async () => {
        const value = await AsyncStorage.getItem('RoomKey');
    }

    useEffect(() => {
        setEvents();
    }, []);

    console.log(socket);

    return (
        <View>
            <Text>Gaming</Text>
        </View>
    );
}

export default Gaming;