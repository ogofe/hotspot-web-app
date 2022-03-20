import React, {useState, useContext} from 'react';
import {Animated, ScrollView, View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {Input, PasswordInput, Separator} from '../components';
import {GlobalStore} from '../App';
import background_image from '../assets/images/food/fries-restaurant.jpg';



const StartRegistration = ({ changeTab, setEmail, setPassword }) => {
  return(
    <View style={{marginTop: 30}}>
      <Text style={{fontSize: 25, textAlign: 'center', fontWeight: '900', color: '#881500'}}> Get Started </Text>

      <View style={{marginVertical: 20}}>
        <Text style={{fontSize: 15, fontWeight: '900', color: '#fff'}}> Email </Text>
        <Input style={{marginVertical: 10}} placeholder="Email" onChangeText={(text) => setEmail(text)} />
      </View>

      <View style={{marginVertical: 10}}>
        <Text style={{fontSize: 15, fontWeight: '900', color: '#fff'}}> Password </Text>
        <PasswordInput style={{marginVertical: 10}} placeholder="Password" onChangeText={(text) => setPassword(text)} />
      </View>
      
      <View style={{marginVertical: 10,}}>
        <TouchableOpacity style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          backgroundColor: 'orange', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 5,
        }} onPress={() => changeTab('finish')}>
          <AntDesign name="login" size={23} />
          <Text style={{flex: 1, fontWeight: '600', fontSize: 15, textAlign: 'center',}}> Continue </Text>
        </TouchableOpacity>
      </View>
    </View>
  )  
}


const FinishRegistration = ({ onSubmit, changeTab, setPhoneNumber, setFirstName, setLastName }) => {
  return(
    <View style={{marginTop: 30}}>
      <Text style={{fontSize: 25, textAlign: 'center', fontWeight: '900', color: '#881500'}}> Join Us </Text>

      <View style={{marginVertical: 5}}>
        <Text style={{fontSize: 15, fontWeight: '900', color: '#fff'}}> First Name </Text>
        <Input style={{marginVertical: 10}} placeholder="First Name" onChangeText={(text) => setFirstName(text)} />
      </View>

      <View style={{marginVertical: 5}}>
        <Text style={{fontSize: 15, fontWeight: '900', color: '#fff'}}> Last Name </Text>
        <Input style={{marginVertical: 10}} placeholder="Last Name" onChangeText={(text) => setLastName(text)} />
      </View>

      <View style={{marginVertical: 5}}>
        <Text style={{fontSize: 15, fontWeight: '900', color: '#fff'}}> Phone Number </Text>
        <Input style={{marginVertical: 10}} placeholder="Phone Number" onChangeText={(text) => setPhoneNumber(text)} />
      </View>

      <View style={{marginVertical: 10,}}>
        <TouchableOpacity style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          backgroundColor: 'orange', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 5,
        }} onPress={onSubmit}>
          <AntDesign name="login" size={23} />
          <Text style={{flex: 1, fontWeight: '600', fontSize: 15, textAlign: 'center',}}> Create account </Text>
        </TouchableOpacity>
      </View>
    </View>
  )  
}


export default function RegistrationPage({ navigation }) {
  const [tab, setTab] = useState('start');
  const [email, setEmail] = useState('');
  const {notify, onLoginSuccess, BASE_URL} = useContext(GlobalStore);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  function changeTab(_tab){
    if (_tab === 'start'){
      if(!firstName || !lastName || !phone){
        notify('Please fill all fields')
      }else{
        setTab(_tab)
      }
    }else{
      if(!email || !password){
        notify('Please fill all fields')
      }else{
        setTab(_tab)
      }
    }
  }


  function performLogin(profile){
    localStorage.setItem('profile', JSON.stringify(profile))
    setTimeout(
      () => {
        onLoginSuccess()
      }, 2000
    )
  }

  function createAccount(){
    fetch(BASE_URL + 'signup/', {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: email,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        password: password
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.error){
        notify(data.error_text)
        setTimeout(() => setTab('start'), 200)
      }else{
        notify("Successfully created your account")
        performLogin(data.profile)
      }
    })
  }

  return (
    <ImageBackground resizeMode="cover" source={{uri: background_image}} style={{
      flex: 1, width: '100%', paddingHorizontal: 15, backgroundColor:"#ffa50033",
      backgroundBlendMode: 'overlay'
      }}>

      <ScrollView showsVerticalScrollIndicator={false}>
        {tab === "start" ? 
          <StartRegistration
            setEmail={setEmail}
            setPassword={setPassword}
            changeTab={changeTab}
           /> 
        : 
          <FinishRegistration
           changeTab={changeTab}
           setPhoneNumber={setPhoneNumber}
           setLastName={setLastName}
           setFirstName={setFirstName}
           onSubmit={createAccount}
           />
        }

        <View style={{marginTop: 10, }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Separator style={{width: '40%', height: 1}} />
            <Text style={{fontWeight: '600', fontSize: '20', textAlign: 'center', flex: 1, color:'#fff'}}> OR </Text>
            <Separator style={{width: '40%', height: 1}} />
          </View>

          <TouchableOpacity style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 5,
           }} onPress={() => navigation.navigate('Login')}>
            <AntDesign name="user" size={23} />
            <Text style={{flex: 1, fontWeight: '600', fontSize: 15, textAlign: 'center',}}> Login to your account </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
