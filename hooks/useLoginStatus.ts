import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useLoginStatus() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  // check login status prior to rendering the app
  React.useEffect(() => {
    async function checkLogin() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load User Data
        await function getUser(){
          let user = JSON.parse(localStorage.getItem('profile'))
          if (user === null || user == "undefined"){
            setLoggedIn(false)
          }else{
            setLoggedIn(true);
          }
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    }

    checkLogin();
  }, []);

  return isLoggedIn;
}
