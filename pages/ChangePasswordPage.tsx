import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {PasswordInput, Header} from '../components/index';
import styling from '../constants/Styling';
import {GlobalStore} from '../App';


export default function ChangePasswordPage({navigation, ...props}){
  const commonPasswords = [
    'password',
    'idontknow',
    '12345678',
  ]
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const {notify} = useContext(GlobalStore);
  const [confirmPassword, setConfirmPassword] = useState('');

  function checkPasswords(){
    if (currentPassword === ""){
      notify("Please enter your current password")
      return false
    }
    if (newPassword === ""){
      notify("Enter a new password")
      return false
    }
    if (!newPassword === confirmPassword || confirmPassword !== newPassword){
      notify("Passwords do not match")      
      return false
    }    
    if (newPassword.length < 8){
      notify("Passwords must be at least 8 characters long")
      return false
    }
    if (commonPasswords.includes(newPassword)){
      notify(`Your password cannot be "${newPassword}", please choose another password`)
      return false
    }
    return true
  }
  
  function savePassword(){
    let pass = checkPasswords()
    if (pass){
      notify("Password has been changed")
    }else{
      return
    }
  }

  return(
    <View style={{flex: 1}}>
      <Header back={true} title="Change Password" nav={() => navigation.navigate('Account')} />

      <View style={{flex: 1, backgroundColor:'#f8f9fb', paddingVertical: 20, paddingHorizontal: 10}}>          
        <View style={{marginVertical: 15}}>
          <Text style={{marginVertical:5, fontWeight: '600', fontSize: 16}}> Current Password </Text>
          <PasswordInput onChangeText={(text) => setCurrentPassword(text)} />
        </View>

        <View style={{marginVertical: 15}}>
          <Text style={{marginVertical:5, fontWeight: '600', fontSize: 16}}> New Password </Text>
          <PasswordInput onChangeText={(text) => setNewPassword(text)} />
        </View>

        <View style={{marginVertical: 15}}>
          <Text style={{marginVertical:5, fontWeight: '600', fontSize: 16}}> Confirm New Password </Text>
          <PasswordInput onChangeText={(text) => setConfirmPassword(text)} />
        </View>

        <View style={{ marginTop: 30}}>
          <TouchableOpacity onPress={savePassword} style={{paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, backgroundColor: 'orange'}}>
           <Text style={{textAlign: 'center', fontWeight: '600', fontSize: 17, color: '#fff'}}> Save new password </Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  )
}
