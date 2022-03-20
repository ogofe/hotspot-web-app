import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/HomePage';
import ItemDetailPage from '../pages/ItemDetailPage';
import ProfileScreen from './ProfileScreen';
import NotificationsPage from '../pages/NotificationsPage';


const {Navigator, Screen} = createStackNavigator();

export default function HomeScreen(props:any){
  return(
  <Navigator
    initialRouteName="HomePage"
    screenOptions={{
      headerShown: false,
      animationEnabled: true,
      unmountOnBlur: true,
      cardStyle: {backgroundColor: '#fcfcfc'}
    }}
    detachInactiveScreens={true}
  >
      <Screen name="HomePage" component={HomePage} />
      <Screen name="Notifications" component={NotificationsPage} />
      <Screen name="ItemDetail" component={ItemDetailPage} />
      <Screen name="Profile" component={ProfileScreen} />
    </Navigator>
  )
}