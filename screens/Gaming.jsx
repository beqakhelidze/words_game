import { useCallback, useEffect, useState, } from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text
} from "react-native";
import BASE_URL from "../apiConnection/baseUrl";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import GlobalStyles from "../styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import GameInformation from "../Components/GameInformation";
import Images from "../Components/images";
import GuessAnswer from "../Components/guessAnswer";
import GameInfoButtons from "../Components/gameInfoButtons";
import CustomWord from "../Components/customWord";
import Hints from "../Components/hints";
import GameNotStarted from "../Components/gameNotStarted";

let socket;

const setSocket = async () => {
    const key = await AsyncStorage.getItem('RoomKey');
    const username = await AsyncStorage.getItem('Username');
    socket = io(BASE_URL + '/rooms?key=' + key + '&username=' + username,
        {
            transports: ["websocket", "polling"],
        },
    );
}

const Gaming = ({ navigation }) => {

    const [mainInformation, setMainInformation] = useState(undefined);
    const [participants, setParticipants] = useState([]);
    const [customWords, setCustomWords] = useState("");
    const [images, setImages] = useState([]);
    const [hints, setHints] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const showToast = (data) => {
        if (data.status == "wrong") {
            Toast.show({
                type: 'success',
                text1: data.username + " submitted " + data.status + " answer: " + data.guess,
            });
        } else {
            Toast.show({
                type: 'success',
                text1: data.username + " submitted " + data.status + " answer!",
            });
        }
    }

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
            setImages(data.imageUrls);
            setHints(data.hiddenWord)
        })
        socket.on("word.added", (data) => {
            setCustomWords(data.wordCount);
        })
        socket.on("letter.revealed", (data) => {
            hintsController(data.hiddenWord);
        })
        socket.on("guess.submitted", (data) => {
            data.status = "wrong";
            showToast(data);
        })
        socket.on("participant.guessed", (data) => {
            participantGuessed(data);
        })
        socket.on("game.ended", (data) => {
            setHints(data.revealedWord.split(""));
            gameEnded();
        })
    }

    const participantGuessed = (data) => {
        data.status = "correct";
        let result;
        setCorrectAnswers((prev) => {
            result = prev + 1;
            return prev + 1;
        })
        setParticipants((prev) => {
            return prev.map((item) => {
                return item.username == data.username ? { ...item, result: result } : item;
            })
        })
        showToast(data);
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

    const hintsController = (value) => {
        setHints((prev) => {
            const indicator = prev.findIndex((item) => {
                return item == null;
            });
            if (indicator >= 0) {
                return value;
            }
            return prev;
        })
    }

    const gameEnded = () => {
        setTimeout(() => {
            setImages([]);
            setHints([]);
            if (typeof (customWords) == "number") {
                setCustomWords(0);
            }
            setIsReady(false);
            setParticipants((prev) => {
                return prev.map((item) => {
                    return { ...item, isReady: false, result:undefined};
                })
            })
        }, 6000)
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
            {typeof (customWords) == "number" && <CustomWord id={mainInformation.id} />}
            {images.length == 0 &&  <GameNotStarted/> }
            {images.length != 0 && <Images images={images} />}
            {images.length != 0 && <GuessAnswer id={mainInformation.id} setHints={setHints} />}
            {mainInformation.hintsEnabled && <Hints hints={hints} />}
            <GameInfoButtons participants={participants}
                mainInformation={mainInformation}
                isReady={isReady}
                setIsReady={setIsReady}
            />
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