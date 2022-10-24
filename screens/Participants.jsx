import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import GlobalStyles from "../styles";

const ParticipantItem = ({ item }) => (
    <View style={{
        flexDirection:"row",
    }}>
        <Text style={{
            color: item.isReady ? "green" : "red",
            fontSize:18,
            marginRight:5,
        }}>{'\u2022'}</Text>
        <Text style={{
            color: item.isReady ? "green" : "red",
            fontSize:18,
        }}>{item.username}</Text>
    </View>
)


const Participants = ({ modalVisible, setModalVisible, participants }) => {

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {participants.map((item,index) => {
                            return (<ParticipantItem key={index} item={item} />)
                        })}
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});

export default Participants;