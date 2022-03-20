import React, {useContext} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {Ionicons, AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {CartItem, Separator, Header} from '../components/index';
import styling from '../constants/Styling';
import {GlobalStore} from '../App';


export default function ProfilePage({navigation, ...props}){
  const {logout, USER, notify} = useContext(GlobalStore);
  const ACTIONS = [
    {
      key: '1',
      label: 'My Orders',
      icon: 'basket',
      onPress: null, 
    },
    {
      key: '2',
      label: 'Change Password',
      icon: 'security',
      onPress: null, 
    },
    {
      key: '3',
      label: 'Account Settings',
      icon: 'cogs',
      onPress: null, 
    },
    {
      key: '4',
      label: 'Logout',
      icon: 'exit-to-app',
      onPress: logoutUser, 
    },
  ]

  function logoutUser(){
    logout()
  }

  return(
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, backgroundColor:'#fff'}}>
      <Header back={true} nav={() => navigation.navigate('HomePage')} title="Account" />

      <View style={{
        paddingVertical: 10, borderRadius: 5, paddingHorizontal: 10,
        backgroundColor: '#80808021', marginHorizontal: 10, marginVertical: 10,
      }}>          
        <View style={{}}>
          <MaterialCommunityIcons size={50} name="account-circle" color="grey" />

          <View style={{flex: 1, color:'#000', paddingVertical: 2.5, textAlign: 'right'}}>
            <Text style={{fontSize:16, fontWeight: '600',}}> {USER?.first_name + ' ' + USER?.last_name} </Text>
            <Text style={{fontSize:13, marginTop: 10,}}> {USER?.email} </Text>
          </View>
        </View>
      </View>
      
      <View style={{paddingBottom: 30}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={ACTIONS}
          renderItem={({item}) => {
            return(
              <TouchableOpacity onPress={item.onPress} style={{flexDirection: "row", alignItems: "center", marginVertical: 5, padding: 10, borderRadius: 10, backgroundColor: "white"}}>
                <MaterialCommunityIcons color="grey" name={item.icon} size={23}  />
                <Text style={{fontWeight: '700', paddingLeft: 5, fontSize: 15, alignSelf:'end', marginLeft: 5, flex: 1}}>{ item.label }</Text>
              </TouchableOpacity>
            )
          }}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        />
      </View>
    </ScrollView>
  )
}
