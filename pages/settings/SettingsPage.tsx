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
import {CartItem, Separator, Header} from '../../components/index';
import styling from '../constants/Styling';
import {GlobalStore} from '../App';



export const SettingsPage = ({navigation, ...props }) =>{
  function parseTel(num){
      
    return 
  }


  return(
    <View style={{flex: 1}}>
    <Header back={true} nav={() => navigation.navigate('Account')} title="Account Settings" />
      
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1, paddingVertical: 30}}>

        <View style={{ paddingHorizontal: 10,}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
            <Ionicons color="grey" name="man" size={23} />
            <Text style={{color:'grey', flex:1, fontSize: 16, alignSelf: 'end', fontWeight: '600'}}> Personal Information </Text>
          </View>

          <View style={{ paddingVertical: 10, paddingHorizontal: 10}}>
            <Text style={{fontSize: 15, fontWeight: '600', marginTop: 10}}> {USER.user.first_name + ' ' + USER.user.last_name} </Text>
            <Text style={{fontSize: 15, fontWeight: '600', marginTop: 10}}> {USER.user.email} </Text>
            <Text style={{fontSize: 15, fontWeight: '600', marginTop: 10}}> {parseTel(USER.phone)} </Text>
          </View>

          <View style={{paddingHorizontal: 10}}>
            <TouchableOpacity style={{paddingVertical: 10, flexDirection: 'row', alignItems:'center', borderRadius: 10, backgroundColor: '#c0c0c0', paddingHorizontal: 10}}>
              <MaterialCommunityIcons size={20} name="pencil" />
              <Text style={{fontSize: 14, fontWeight: '600', alignSelf: 'end', flex: 1, textAlign: 'center'}}> Edit your info </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Separator />

        <View style={{ paddingHorizontal: 10,}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
            <Ionicons color="grey" name="globe" size={23} />
            <Text style={{color: 'grey', flex:1, fontSize: 16, fontWeight: '600'}}> Delivery Information </Text>
          </View>

          <View style={{paddingHorizontal: 10}}>
            <Text style={{fontSize: 16, marginTop: 7}}> No. 15 Angola close, Barnawa. 800181 </Text>
            <Text style={{fontSize: 16, marginTop: 7}}> Kaduna, Nigeria</Text>
          </View>

          <View style={{paddingHorizontal: 10, marginTop: 7}}>
            <TouchableOpacity style={{paddingVertical: 10, borderRadius: 10, flexDirection: 'row', alignItems:'center', backgroundColor: '#c0c0c0', paddingHorizontal: 10}}>
              <Ionicons size={20} name="location" />
              <Text style={{fontSize: 14, fontWeight: '600', alignSelf: 'end', flex: 1, textAlign: 'center'}}> Change this address </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScrollView>
    </View>
  )
}


export default SettingsPage;