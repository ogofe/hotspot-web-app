import React, {useState, useContext} from 'react';
import {Animated, View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {Input, PasswordInput, Separator} from '../components';
import {GlobalStore} from '../App';
import background_image from '../assets/images/food/fries-restaurant.jpg';



export default function LoginPage({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {notify, onLoginSuccess, BASE_URL} = useContext(GlobalStore);

  function performLogin(){
    if(!email || !password){
      notify("Please fill all fields!")
    }else{
      try{
        fetch(BASE_URL + 'login/', {
          method: 'post',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: email,
            password: password
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.error){
            notify(data.error_text);
          }else{
            notify("Successful login")
            localStorage.setItem('profile', JSON.stringify({...data.user, 'token': data.token}))
            setTimeout(() => onLoginSuccess(), 2000)
          }
        })
      }catch(err){
        notify("Something went wrong!")
      }
    }     

  }

  return (
    <View style={{flex: 1}}>
    <ImageBackground resizeMode="cover" source={{uri: background_image}} style={{
      flex: 1, width: '100%', paddingHorizontal: 15, backgroundColor:"#ffa50033",
      backgroundBlendMode: 'overlay'
    }}>

      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 25, textAlign: 'center', marginBottom: 20, fontWeight: '900', color: '#881500'}}> Welcome Back </Text>

        <View style={{marginVertical: 5}}>
          <Text style={{fontSize: 15, fontWeight: '900', color: '#fff'}}> Email </Text>
          <Input style={{marginVertical: 10}} placeholder="Email" onChangeText={(text) => setEmail(text)} />
        </View>

        <View style={{marginVertical: 5}}>
          <Text style={{fontSize: 15, fontWeight: '900', color: '#fff'}}> Password </Text>
          <PasswordInput style={{marginVertical: 10}} placeholder="Password" onChangeText={(text) => setPassword(text)} />
        </View>
        
        <View style={{marginVertical: 10,}}>
          <TouchableOpacity style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: 'orange', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 5,
          }} onPress={performLogin}>
            <AntDesign name="login" size={20} />
            <Text style={{flex: 1, fontWeight: '600', fontSize: 15, textAlign: 'center',}}> Login </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginTop: 10,}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Separator style={{width: '40%', height: 1}} />
          <Text style={{fontWeight: '600', fontSize: '20', textAlign: 'center', flex: 1, color:'#fff'}}> OR </Text>
          <Separator style={{width: '40%', height: 1}} />
        </View>

        <TouchableOpacity style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 5,
         }} onPress={() => navigation.navigate('Register')}>
          <AntDesign name="user" size={20} />
          <Text style={{flex: 1, fontWeight: '600', fontSize: 15, textAlign: 'center',}}> Create an account </Text>
        </TouchableOpacity>
      </View>

    </ImageBackground>
    </View>
  );
}
