import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ViewTask = (props) => {

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.item}>
          <View style={styles.editIcon}>
          <TouchableOpacity  onPress={() => props.navigation.navigate('NewTask', {task: props.task })}>
            <Icon name="create-outline" size={30} color="#055C9D"/>
          </TouchableOpacity>
          </View>
            <Text style={styles.label}>Title</Text>
            <Text style={styles.textContent}>{props.task.title}</Text>
             <Text style={[styles.label, styles.marginTop_20]}>Description</Text>
            <Text style={styles.textContent} >{props.task.description}</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      margin: 20,
  },
  textContent:{
    paddingLeft: 20
  },
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,

    marginBottom: 20,
  },
  editIcon:{
    flexDirection: 'row-reverse',
  },
  label:{
    marginBottom: 5,
    fontSize:16,
    fontWeight: "bold"
  },
  marginTop_20:{
      marginTop: 20
  },

});

export default ViewTask;