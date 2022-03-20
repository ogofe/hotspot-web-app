import React, {useState, useContext, useEffect} from 'react';
import {Animated, View, Text, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {Input, PasswordInput, Separator} from '../components';
import {GlobalStore} from '../App';
import background_image from '../assets/images/food/fries-restaurant.jpg';
import head_image from '../assets/images/food/burger-restaurant.jpg';
import burger_image from '../assets/images/icons/hamburger.png';
import welcome_image_2 from '../assets/images/welcome-1.png';



export default function WelcomePage({ navigation }) {

  return (
    <View style={{flex: 1}}>
      <ImageBackground resizeMode="cover" source={{uri: background_image}} style={{flex: 1, backgroundColor: '#babbbb', width: '100%'}}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <Text style={{fontSize: 45, fontWeight: '900', color: '#fff'}}> Hotspot </Text>
          <Text style={{fontSize: 20, marginTop: 15, fontWeight: '900', color: '#fff'}}> From Restaurants Near You </Text>
        </View>

        <View style={{ position: 'absolute', width: '100%', bottom: '5vh', paddingHorizontal: 10}}>
          <TouchableOpacity style={{
            backgroundColor: 'orange', paddingVertical: 13, 
            paddingHorizontal: 10, borderRadius: 10,
          }} onPress={() => navigation.navigate('Register')}>            
            <Text style={{flex: 1, color: '#ffe', fontWeight: '600', fontSize: 15, textAlign: 'center',}}> Get Started </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: 'white', paddingVertical: 13, 
            paddingHorizontal: 10, borderRadius: 10, marginTop: 15,
          }} onPress={() => navigation.navigate('Login')}>            
            <Text style={{flex: 1, color: '#000', fontWeight: '600', fontSize: 15, textAlign: 'center',}}> Login </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
