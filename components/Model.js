import React from 'react';
import { Modal, Pressable, StyleSheet, View, Text} from 'react-native';
import { Dimensions } from 'react-native';
const ModalPopUp = (props) => {

  return (
    <Modal
    transparent={true}
    visible={props.modalVisible}
    onRequestClose={() => {
      props.setModalVisible(!props.modalVisible);
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Hello World!</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() =>   props.setModalVisible(!props.modalVisible)}
        >
          <Text style={styles.textStyle}>Hide Modal</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
  )
}

export default ModalPopUp;

const styles = StyleSheet.create({
    modalView: {
      margin: 20,
      height: Dimensions.get('window').height - 40,
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
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });