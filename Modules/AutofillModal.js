import React, { Component } from 'react';
import {
	Alert,
	Image,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
    Platform,
    Button,
    ScrollView,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';


import t from 'tcomb-form-native';

const Form = t.form.Form;

const Phone = t.struct({
    phone: t.String,
});


var cart = []

export var phoneNum = {
    phone: null
};

//testing purposes
phoneNum = {
    phone: "1234567890"
};

const phoneOptions = {
    fields: {
        phone: {
            label: 'Phone number (ie 7057654321)',
        }
    }
}

// require the module
const Frisbee = require('frisbee');

// create a new instance of Frisbee
const api = new Frisbee({
  baseURI: 'https://pizza-admin.herokuapp.com/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default class AutofillModal extends Component {
    autofill = () => {
        var value = this._form2.getValue(); // use that ref to get the form value
        //replace white spaces
        phone = value.phone.replace(/\s/g,'');
        phone = phone.replace("-", "");
        console.log('phone num: ', phone); 
        if(phone.length != 10){
            Alert.alert(
                'Please enter a 10 digit phone number'
            );
        }
        else{
            //If here is a valid phone number
            // function invoked immediately with async/await
            (async () => {
                // log in to our API with a user/pass
                try {
                // make the request
                let res = await api.post('/login', {
                    body:{ 
                    username: 'Napoli', 
                    password: 'pizzapizza'
                    }
                });
                console.log('response', res.body);
            
                // handle HTTP or API errors
                if (res.body.status == "error"){
                    //throw res.body.message;
                    Alert.alert(
                        res.body.message
                    );
                } 
                else if (res.body.status == "success"){
                    // set basic auth headers for all
                    var authToken = res.body.data.authToken
                    var userId = res.body.data.userId
                    console.log('auth ', authToken)
                    console.log('id ', userId)
                }

                //Check if phone number is in database
                res = await api.get('/check/Napoli/'+phone, {
                    headers: {
                        'X-Auth-Token': authToken, 
                        'X-User-Id': userId
                    }
                });
                console.log('response', res.body);

                // handle HTTP or API errors
                if (res.body.status == "error"){
                    //throw res.body.message;
                    Alert.alert(
                        res.body.message
                    );
                }
                else if (res.body.status == "success"){
                    Alert.alert(
                        'Autofilled'
                    )
                    phoneNum = phone
                    var customerInfo = {
                        firstName: res.body.data.first_name,
                        lastName: res.body.data.last_name,
                        addressOne: res.body.data.address_one,
                        addressTwo: res.body.data.address_two,
                        postalCode: res.body.data.postal_code,
                        city: res.body.data.city,
                    };
                    const { navigate } = this.props.navigation;
                    navigate('Info', { customer: customerInfo, phone: phoneNum, order: res.body.recent });
                    
                }
            
                } catch (err) {
                throw err;
                }
            })();    
        }
    }
    navInfo = () => {
        this.props.navigation.navigate('Info')
    }
    render() {
        return (
        <ScrollView>
            <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.dispatch(DrawerActions.toggleDrawer());
						}}
					>
						<Icon name="md-menu" size={30} />
					</TouchableOpacity>
				</View>
                <Text style={{ fontSize: 25 }}>Autofill Customer Info</Text>
                <Form
                    ref={c => this._form2 = c} // assign a ref
                    type={Phone} 
                    value={phoneNum}
                />
                <Button
                    title="Autofill (Existing Customer)"
                    onPress={this.autofill}
                />
                <View style={{marginBottom: 15}} />
                <Button
                    title="Skip (New Customer)"
                    onPress={this.navInfo}
                />
                <View style={{marginBottom: 15}} />
            </View>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: 150,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: { paddingTop: Platform.OS === 'ios' ? 13 : 7 },
});