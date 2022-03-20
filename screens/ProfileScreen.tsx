import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import ProfilePage from '../pages/ProfilePage';
import MyOrdersPage from '../pages/MyOrdersPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import ChangeDetailsPage from '../pages/settings/ChangeDetailsPage';
import SettingsScreen from '../screens/SettingsScreen';
import styling from '../constants/Styling';


const ProfileScreenNavigator = createStackNavigator();


export default function ProfileScreen() {
  return (
    <ProfileScreenNavigator.Navigator
      initialRouteName="Account"
      screenOptions={{
        animationEnabled: true,
        cardStyle: {backgroundColor: "#fcfcfc"},
        headerShown: false,
        unmountOnBlur: true
      }}
    >
      <ProfileScreenNavigator.Screen
        name="Account"
        component={ProfilePage}
      />
      <ProfileScreenNavigator.Screen
        name="MyOrders"
        component={MyOrdersPage}
      />
      <ProfileScreenNavigator.Screen
        name="ChangePassword"
        component={ChangePasswordPage}
      />      
      <ProfileScreenNavigator.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </ProfileScreenNavigator.Navigator>
  );
}

