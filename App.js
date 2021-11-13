import React, {useState, createContext, useContext, useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard,SafeAreaView, ScrollView, Platform } from 'react-native';
import Task from './components/Task';
import CreateTask from './components/newTask';
import ViewTask from './components/ViewTask';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { doc, setDoc } from "firebase/firestore"; 
import {firebase } from './firebase/config'

const Stack = createNativeStackNavigator();

const taskClicked = (index, navigation) => {
  navigation.navigate('ViewTask', {
    index: index,
  });
}

const ViewTaskScreen = ({ navigation, route }) => {
  const { taskItems } = useContext(TaskContext);
  const { index} = route.params;  
  const task = taskItems[index]
  return <ViewTask task={task} navigation={navigation}/>
};

const NewTaskScreen = ({ navigation, route }) => {
  const { taskItems, addTask } = useContext(TaskContext);
  if(route?.params?.task){
    navigation.setOptions({ title: 'Edit Task' })
  }
  const onSubmit = data => {
    const task= {
      title: data?.title, description: data?.description
    }
    addTask([...taskItems,task])
    navigation.push('Task')
  };
  // return <Text>This is {route.params.name}'s profile</Text>;
  return <CreateTask onSubmit={onSubmit} edit={!!route.params.task} task={route.params.task}/>
};

function HomeScreen({ navigation }) {
  const { taskItems } = useContext(TaskContext);

  firebase.database().ref('users/').push({
  email:'ssssssssqqqq',
  fname:'adsasd',
  lname:'adsasd'
}).then((data)=>{
  //success callback
  console.log('data ' , data)
}).catch((error)=>{
  //error callback
  console.log('error ' , error)
})

//   firebase
//   .auth()
//   .createUserWithEmailAndPassword('abdulkhader4123@gmail.com', 'asdasdasd')
//   .then((response) => {
//     console.log(response)
//   })
//   .catch((error) => {
//     console.log(error)
// });

// var db = firebase.firestore().collection('tasks');
// db.add({
//   title: 'this.state.name',
//   description: 'this.state.email',
// }).then((res) => {
//   console.log(res)
// })
// firebase.firestore()
//     .collection('user')
//     .where('email', '==', 'abdul')
//     .get()
//     .then(querySnapshot => {
//       console.log(querySnapshot.empty)

//       if(!querySnapshot.empty) {
//         const user = querySnapshot.docs[0].data()
//         console.log(user)
//       }
//     })
// Add a new document in collection "cities"

  //   firebase.database().ref('users/')
  // .get({source:"cache"})
  // .then(querySnapshot => {
  //   console.log('querySnapshot')

  //   console.log(querySnapshot)
  // })

    const userAgeRef = firebase.database().ref('users/');
    userAgeRef.on('value', snapshot => {

      console.log('Users age: ', snapshot.val());
    console.log('ssssss')

    });


  return (
   <SafeAreaView style={styles.container}>
        <View style={styles.jc_between}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          <TouchableOpacity onPress={() =>
        navigation.navigate('NewTask', { name: 'Jane' })
      }>
            <Icon name="md-add-circle-sharp" size={40} color="green" style={styles.addIcon}/>
          </TouchableOpacity>
        </View>
        <ScrollView
      contentContainerStyle={{
        flexGrow: 1
      }}
      keyboardShouldPersistTaps='handled'
    >
      <View style={styles.tasksWrapper}>
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                  <Task title={item.title} index={index} key={index} taskClicked={taskClicked} navigation={navigation}/> 
              )
            })
          }
        </View>
      </View>

    </ScrollView>
      </SafeAreaView>
  );
}

const TaskContext = createContext(null);

export default function App() {
  const [taskItems, setTaskItems] = useState([]);

  function addTask(taskItems) {
    setTaskItems([...taskItems]);
  }

  return (
    <TaskContext.Provider value={{ taskItems, addTask}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Task" options={{headerShown: false}} component={HomeScreen}/>
        <Stack.Screen name="NewTask"  options={{ title: 'Add New Task' }} component={NewTaskScreen} />
        <Stack.Screen name="ViewTask" options={{title: 'Task Details' }} component={ViewTaskScreen} />
      </Stack.Navigator>   
    </NavigationContainer>
    </TaskContext.Provider>

  );

}

const styles = StyleSheet.create({
  addIcon:{
    top:-5
  },
  container: {
    flex: 1,
    margin: 20,
  },
  jc_between:{
    paddingTop:20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tasksWrapper: {
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    flex:1,
    marginRight:20
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  }
});