import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useRef, createContext} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useLoginStatus from './hooks/useLoginStatus';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import {AuthNavigator, BaseNavigator} from './navigation';
import {Animated, View, Text,
 // NetInfo,
 Platform} from 'react-native';
import {Alert} from './components';


export const GlobalStore = createContext({});

export default function App() {
  const [auth_token, setToken] = useState("");
  const [auth_user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const alertPos = useRef(new Animated.Value(-100)).current;
  const [loggedIn, setLoggedIn] = useState(true);
  const [alertText, setAlert] = useState<any, string>(null);
  const [alertVisibilty, setAlertVisibilty] = useState<string>("none");

  const context = {
    notify: notify,
    onLoginSuccess: () => checkLoginStatus(),
    BASE_URL: 'http://localhost:8000/api/',
    TOKEN: auth_token,
    USER: auth_user,
    PAYSTACK_API_KEY: "",
    login: () => checkLoginStatus(),
    logout: logoutUser
  }

  function checkLoginStatus(){
    let user = localStorage.getItem('profile');
    setLoading(true)
    if(user === null || user === undefined){
      setLoggedIn(false);
    }else{
      user = JSON.parse(user)
      setUser(user.user)
      setToken(user.token)
      setLoggedIn(true);
    }
    setTimeout(() =>
      setLoading(false), 1200
      )
  }

  function checkNetworkStatus(){
    // android
    if (Platform.OS === "android"){
      NetInfo.isConnected.fetch()
      .then(isConnected => {
        if(isConnected){
          notify("Connected to the internet")
        }else{
          notify("You are not connected to the internet")          
        }
      })
    }else{
      // ios
      NetInfo.isConnected.addEventListener(
        'connectionChange', handleNetworkChange)
    }
  }

  function handleNetworkChange(isConnected){
    NetInfo.isConnected.addEventListener('connectionChange', handleNetworkChange)
    if(isConnected){
      notify("Connected to the internet")
    }else{
      notify("You are not connected to the internet")          
    }
  }

  useEffect(() => {
    // checkNetworkStatus();
    checkLoginStatus();
  }, [])

  const showAlertAnimation = Animated.timing(alertPos, {
    toValue: 60,
    duration: 300,
    easeIn: null,
  })
  const hideAlertAnimation = Animated.timing(alertPos, {
    toValue: -100,
    duration: 500,
    easeIn: null,
  })

  function notify(text){
    if (text === null || text === "" || text === undefined){
      return
    }
    setAlert(text)
    setTimeout(() => {
      setAlertVisibilty("block")
      showAlertAnimation.start()
    }, 300)

    setTimeout(() => {
        hideAlertAnimation.start()
      }, 4000
    )

    setTimeout(() => {
        setAlert(null)
        setAlertVisibilty("none")
      }, 4500
    )
  }

  function logoutUser(){
    localStorage.clear()
    setLoggedIn(false)
  }

  if (loading){
    return null
  }


  if (!loggedIn){
    return(
      <SafeAreaProvider>
        <GlobalStore.Provider value={context}>
          <AuthNavigator />
          <Alert position={alertPos} text={alertText} visibility={alertVisibilty} />
        </GlobalStore.Provider>
      </SafeAreaProvider>
    )
  }


  return (
    <SafeAreaProvider>
      <StatusBar />
      <GlobalStore.Provider value={context}>
        <BaseNavigator colorScheme={colorScheme} />
        <Alert position={alertPos} text={alertText} visibility={alertVisibilty} />
      </GlobalStore.Provider>
    </SafeAreaProvider>
  );
}
