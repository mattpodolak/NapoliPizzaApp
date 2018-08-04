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
})

const User = t.struct({
  firstName: t.String,
  lastName: t.String,
  addressOne: t.String,
  addressTwo: t.maybe(t.String),
  postalCode: t.String,
  city: t.String,
  delivery: t.enums.of(['Pickup', 'Local Delivery: $7', 'Non-local Delivery: $10'], 'Salads'),
  payment: t.enums.of(['Cash', 'Debit', 'Credit'], 'Salads'),
});

export var customerInfo = {
    firstName: null,
    lastName: null,
    addressOne: null,
    addressTwo: null,
    postalCode: null,
    city: null,
    delivery: null,
    payment: null
};

export var phoneNum = {
    phone: null
};

customerInfo = {
    firstName: "John",
    lastName: "Smith",
    addressOne: "123 Fake St",
    addressTwo: null,
    postalCode: "A1B2C3",
    city: "Wonderland",
    delivery: "Pickup",
    payment: "Credit"
};

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

const options = {
    fields: {
        firstName: {
            label: 'First Name',
        },
        lastName: {
            label: 'Last Name',
        },
        addressOne: {
            label: 'Address Line One',
        },
        addressTwo: {
            label: 'Address Line Two',
        },
        postalCode: {
            label: 'Postal Code',
        },
        delivery: {
            label: 'Delivery or Pickup',
        },
        payment: {
            label: 'Pick a payment option'
        }
    },
};

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

export default class CustomerModal extends Component {
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
                    customerInfo = {
                        firstName: res.body.data.first_name,
                        lastName: res.body.data.last_name,
                        addressOne: res.body.data.address_one,
                        addressTwo: res.body.data.address_two,
                        postalCode: res.body.data.postal_code,
                        city: res.body.data.city,
                    };
                }
            
                } catch (err) {
                throw err;
                }
            })();    
        }
    }
    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        var value2 = this._form2.getValue();
        if(value2 == null){
            Alert.alert(
                'Please enter a phone number'
            )
        }
        else{
            phone = value2.phone
            phone = phone.replace(/\s/g,'');
            phone = phone.replace("-", "");
            if(phone.length != 10){
                Alert.alert(
                    'Please enter a 10 digit phone number'
                )
            }
            else{
                console.log('value: ', value);  
                customerInfo = value
                phoneNum = phone
                if(customerInfo.addressTwo == null){
                    customerInfo.addressTwo = ''
                }
                if(value != null){
                    //send data to database
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

                        //Send customer info to database
                        res = await api.post('/add', {
                            headers: {
                                'X-Auth-Token': authToken, 
                                'X-User-Id': userId
                            },
                            body: { 
                                'first_name': 'John',
                                'last_name': 'Smith',
                                'phone': '1234567890',
                                'address_one': '123 Fake St',
                                'address_two': '',
                                'postal_code': 'A1B2C3',
                                'city': 'Pizzaville',
                                'user': 'Napoli',
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
                            this.navBack
                            Alert.alert(
                                'Saved Customer Data Successfully'
                            )
                        }
                    
                        } catch (err) {
                        throw err;
                        }
                    })();  
                }
                else{
                    Alert.alert(
                        'Required fields missing'
                    ) 
                }
            }
        }
        
    }
    clearData = () => {
        customerInfo = {
            firstName: null,
            lastName: null,
            addressOne: null,
            addressTwo: null,
            postalCode: null,
            city: null,
            delivery: null,
            payment: null
        };
        phoneNum = {
            phone: null
        };
        this.forceUpdate()
    }
    navBack = () => {
        this.props.navigation.navigate('Home')
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
                <Text style={{ fontSize: 25 }}>Customer Info Form</Text>
                <Form
                    ref={c => this._form2 = c} // assign a ref
                    type={Phone} 
                    value={phoneNum}
                />
                <Button
                    title="Autofill"
                    onPress={this.autofill}
                />
                <View style={{marginBottom: 15}} />
                <Button 
                    title="Clear Data"
                    onPress={this.clearData}
                />
                <View style={{marginBottom: 15}} />
                <Form 
                ref={c => this._form = c} // assign a ref
                type={User} 
                options={options} // pass the options via props
                value={customerInfo}
                />
                <Button
                    title="Save Customer Info"
                    onPress={this.handleSubmit}
                />
                <View style={{marginBottom: 15}} />
                <Button 
                    onPress={this.navBack}
                    title="Go Back"
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