import { useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Image
} from "react-native";
import GlobalStyles from "../styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import GameInformation from "../Components/GameInformation";
import Images from "../Components/images";
import { postRequest } from "../apiConnection/postRequest";
import GuessAnswer from "../Components/guessAnswer";
import CustomWord from "../Components/customWord";

let socket;

const stringReplaceAt = (str, index, replacement) => {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}

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

    const [mainInformation, setMainInformation] = useState(undefined);
    const [participants, setParticipants] = useState([]);
    const [customWords, setCustomWords] = useState("");
    const [hintString, setHintString] = useState("______");
    const [images, setImages] = useState([]);

    const setEvents = async () => {
        await setSocket();

        socket.on("connection.error", (data) => {
            navigation.navigate("Join room", {
                errorMessage: data.reason,
            });
        })
        socket.on("game.data.received", (data) => {
            setParticipants(data.participants);
            setCustomWords(data.customWords);
            delete data.participants;
            delete data.customWords;
            setMainInformation(data);
        })
        socket.on("participant.ready", (data) => {
            setParticipantReady(data.username);
        })
        socket.on("participant.joined", (data) => {
            addNewParticipant(data);
        })
        socket.on("participant.left", (data) => {
            removeParticipant(data.username);
        })
        socket.on("game.started", (data) => {
            console.log(data);
            setImages(data.imageUrls);
        })
        socket.on("word.added", (data) => {
            setCustomWords(data.wordCount);
        })
        socket.on("game.ended", (data) =>{
            console.log("game ended",data);
        })
    }

    const addNewParticipant = (value) => {
        setParticipants((prev) => {
            if (prev.find(user => user.username === value.username)) {
                return prev;
            } else {
                return [...prev, value];
            }
        })
    }

    const removeParticipant = (value) => {
        setParticipants((prev) => {
            return prev.filter((user) => {
                return user.username !== value
            })
        })
    }

    const setParticipantReady = (username) => {
        setParticipants((prev) => {
            return prev.map(element => {
                return element.username == username ? { ...element, isReady: true } : element;
            })
        })
    }

    useEffect(() => {
        setEvents();
        return () => {
            socket.disconnect();
        }
    }, []);


    if (!mainInformation) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#1976d2" />
            </View>
        )
    }

    return (
        <View style={GlobalStyles.container}>
            <GameInformation mainInformation={mainInformation} 
                participants={participants}
                customWords={customWords}
            />

            {typeof (customWords === "number") && <CustomWord  id={mainInformation.id}/>}

            {images.length!=0 && <Images images={images} />}
            {images.length!=0 && <GuessAnswer id={mainInformation.id}/>}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
});

export default Gaming;