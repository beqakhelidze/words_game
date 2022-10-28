import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text, View,
    TouchableOpacity,
} from "react-native";
import * as Clipboard from 'expo-clipboard';
import GlobalStyles from "../styles";


const RoomKey = ({ modalVisible, setModalVisible, }) => {

    const [key, setKey] = useState("");

    const onLoad = async () => {
        const storage = await AsyncStorage.getItem("RoomKey")
        setKey(storage);
    }

    const copyToClipboard = () => {
        console.log(key);
        Clipboard.setStringAsync(key);
    };

    useEffect(() => {
        onLoad();
    }, [])

    return (
        <View style={GlobalStyles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={GlobalStyles.centeredView}>
                    <View style={GlobalStyles.modalView}>

                        <Text style={GlobalStyles.Title}>
                            Room Key
                        </Text>
                        <TouchableOpacity onPress={copyToClipboard}>
                            <Text style={styles.key}>{key}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={GlobalStyles.button}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={GlobalStyles.button.text}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    key: {
        fontSize: 16,
        marginBottom: 13,
    }
});

export default RoomKey;