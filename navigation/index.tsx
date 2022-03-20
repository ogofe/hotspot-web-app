import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import styling from '../constants/Styling';
import SearchPage from '../pages/SearchPage';
import {AuthLinking, BaseLinking} from "./LinkingConfiguration";
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import WelcomePage from '../pages/WelcomePage';
import {
  View,
} from 'react-native';
  



const AuthNavigation = createStackNavigator();

export function AuthNavigator(){
  return (
    <NavigationContainer linking={AuthLinking}>
      <AuthNavigation.Navigator
        initialRouteName="Welcome"
        detachInactiveScreens={true}
        screenOptions={{
          unmountOnBlur: true,
          headerShown: false,
          cardStyle: {backgroundColor: "#fafbfb"}
        }}
      >
        <AuthNavigation.Screen name="Login" component={LoginPage} />
        <AuthNavigation.Screen name="Register" component={RegistrationPage} />        
        <AuthNavigation.Screen name="Welcome" component={WelcomePage} />        
      </AuthNavigation.Navigator>
    </NavigationContainer>
  );
}


const {Navigator, Screen} = createBottomTabNavigator();
export function BaseNavigator({ has_unread_messages, ...props }:any){
  return (
    <NavigationContainer linking={BaseLinking}>
      <Navigator
        sceneContainerStyle={{backgroundColor: "#fcfcfc"}}
        initialRouteName="Home"
        tabBarOptions={{
          keyboardHidesTabBar: true,
          isVisible: !false,
          showLabel: false,
        }}
        screenOptions={{
          unmountOnBlur: true
        }}
      >
        <Screen options={{
          tabBarIcon: ({focused}) => <TabBarIcon name="storefront" focused={focused} />,
        }} name="Home" component={HomeScreen} />
        
        <Screen options={{
          tabBarIcon: ({focused}) => <TabBarIcon name="cart" focused={focused} />,
        }} name="Order" component={OrderScreen} />

        <Screen options={{
          tabBarIcon: ({focused}) => <TabBarIcon name="text-search" outline={false} focused={focused} />,
        }} name="Search" component={SearchPage} />
        
      </Navigator>
    </NavigationContainer>
  );
}


function TabBarIcon({ name, focused, ...props } : any ) {
  return <MaterialCommunityIcons name={name} size={25} color={focused ? "orange" : "grey"} style={{ marginBottom: -3 }} {...props} />;
}

export default {AuthNavigator, BaseNavigator};