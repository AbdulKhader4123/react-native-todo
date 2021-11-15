import {firebase } from '../firebase/config'
import * as Google from 'expo-auth-session/providers/google';
import React from 'react';
import {useNetInfo} from "@react-native-community/netinfo";

export default function auth(){
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
          clientId: '309571005017-hc4uqphujpnporiegf3rd4kcju38g4et.apps.googleusercontent.com',
          },
      );

    const netInfo = useNetInfo();
    
      React.useEffect(() => {
        if (response?.type === 'success') {
          const { id_token } = response.params;
          const auth = firebase.auth();
          const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
          console.log("cred::::",credential)
          auth.signInWithCredential(credential).then(u => {
            console.log(u)
          })
        }
      }, [response]);

      if(netInfo.isConnected){
        promptAsync()
      }
}