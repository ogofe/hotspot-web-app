import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import ProfilePage from '../pages/ProfilePage';
import MyOrdersPage from '../pages/MyOrdersPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import ChangeDetailsPage from '../pages/settings/ChangeDetailsPage';
import SettingsPage from '../pages/settings/SettingsPage';
import styling from '../constants/Styling';


const SettingsScreenNavigator = createStackNavigator();


export default function SettingsScreen() {
  return (
    <SettingsScreenNavigator.Navigator
      initialRouteName="SettingsPage"
      screenOptions={{
        animationEnabled: true,
        cardStyle: {backgroundColor: "#fcfcfc"},
        headerShown: false,
        unmountOnBlur: true
      }}
    >
      <SettingsScreenNavigator.Screen
        name="ChangeDetailsPage"
        component={ChangeDetailsPage}
      />
      <SettingsScreenNavigator.Screen
        name="SettingsPage"
        component={SettingsPage}
      />
    </SettingsScreenNavigator.Navigator>
  );
}

