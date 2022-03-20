import React, {useState, useContext} from 'react';
import {Animated, ScrollView, View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {Input, PasswordInput, Header, Separator} from '../../components';
import {GlobalStore} from '../../App';



export default function ChangeDetailsPage({ navigation }){

	const {notify, onLoginSuccess, BASE_URL} = useContext(GlobalStore);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phone, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');

	function getDetails(){
		fetch(`${BASE_URL}me/`, {
			headers:{"Authorization": `Token ${TOKEN}`}
		})
		.then(res => res.json())
		.then(data => {
			if(data.error){
				notify(data.error_text)
			}else{
				setFirstName(data.profile.user.first_name)
				setLastName(data.profile.user.last_name)
				setEmail(data.profile.user.email)
				setPhoneNumber(data.profile.phone)
			}
		})
	}

	function saveChanges(){
		fetch(`${BASE_URL}me/`, {
			method: "post",
			headers:{
				"Authorization": `Token ${TOKEN}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				first_name:firstName,
				last_name:lastName,
				email: email,
				phone: phone,
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data.error){
				notify(data.error_text)
			}else{
				notify("Successfully changed info");
				setTimeout(() => navigation.navigate('Account'), 2300)
			}
		})
	}

  	return(
    <View style={{flex: 1}}>
      	<Header title="Edit your information" back={true} nav={navigation.navigate('Settings')} />
		<ScrollView
		 showsVerticalScrollIndicator={false}
		 style={{flex: 1, paddingVertical: 30, paddingHorizontal: 10, }}
		 >

			<View style={{
				marginVertical: 15, paddingHorizontal: 10, paddingVertical: 10,
				borderRadius: 5, boxShadow: '#f4f3f3 0px 1px 5px 0px'
			}}>
			<Text style={{fontSize: 15, fontWeight: '900', color: '#000'}}> First Name </Text>
			<Input defaultValue={firstName} style={{marginTop: 10, border: '1px solid gainsboro', fontSize: 14}} placeholder="First Name" onChangeText={(text) => setFirstName(text)} />
			</View>

			<View style={{
				marginVertical: 15, paddingHorizontal: 10, paddingVertical: 10,
				borderRadius: 5, boxShadow: '#f4f3f3 0px 1px 5px 0px'
			}}>
			<Text style={{fontSize: 15, fontWeight: '900', color: '#000'}}> Last Name </Text>
			<Input defaultValue={lastName} style={{marginTop: 10, border: '1px solid gainsboro', fontSize: 14}} placeholder="Last Name" onChangeText={(text) => setLastName(text)} />
			</View>

			<View style={{
				marginVertical: 15, paddingHorizontal: 10, paddingVertical: 10,
				borderRadius: 5, boxShadow: '#f4f3f3 0px 1px 5px 0px'
			}}>
			<Text style={{fontSize: 15, fontWeight: '900', color: '#000'}}> Email </Text>
			<Input defaultValue={email} style={{marginTop: 10, border: '1px solid gainsboro', fontSize: 14}} placeholder="Email" onChangeText={(text) => setEmail(text)} />
			</View>

			<View style={{
				marginVertical: 15, paddingHorizontal: 10, paddingVertical: 10,
				borderRadius: 5, boxShadow: '#f4f3f3 0px 1px 5px 0px'
			}}>
			<Text style={{fontSize: 15, fontWeight: '900', color: '#000'}}> Phone Number </Text>
			<Input defaultValue={phone} style={{marginTop: 10, border: '1px solid gainsboro', fontSize: 14}} placeholder="Phone Number" onChangeText={(text) => setPhoneNumber(text)} />
			</View>

			<View style={{marginVertical: 10,}}>
			<TouchableOpacity style={{
			  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
			  backgroundColor: 'orange', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 5,
			  }} onPress={saveChanges}>
			  <AntDesign name="save" size={23} />
			  <Text style={{flex: 1, fontWeight: '600', fontSize: 15, textAlign: 'center',}}> Save changes </Text>
			</TouchableOpacity>
			</View>
	    </ScrollView>
    </View>
  )  
}
