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
import {auth, userId} from './Login';

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

export var cart = []

export var phoneNum = {
    phone: null
};

// for testing purposes
// customerInfo = {
//     firstName: "John",
//     lastName: "Smith",
//     addressOne: "123 Fake St",
//     addressTwo: null,
//     postalCode: "A1B2C3",
//     city: "Wonderland",
//     delivery: "Pickup",
//     payment: "Credit"
// };

// phoneNum = {
//     phone: "1234567890"
// };

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
    navBack = () => {
        this.props.navigation.navigate('Home');
    }
    next = () => {
        this.props.navigation.navigate('PastOrderModal');
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
                try{
                    console.log('value: ', value);  
                    customerInfo = value
                    phoneNum = value2
                    var phoneNum2 = String(phone)
                    var first_name = String(customerInfo.firstName)
                    var last_name = String(customerInfo.lastName)
                    var address_one = String(customerInfo.addressOne)
                    var postal_code = String(customerInfo.postalCode)
                    var city = String(customerInfo.city)
                }catch (err) {
                    Alert.alert(
                        'Please all customer info required'
                    );   
                }
                
                if(customerInfo.addressTwo == null){
                    var address_two = ''
                }
                else{
                    var address_two = String(customerInfo.addressTwo)
                }
                if(value != null){
                    //send data to database
                    // function invoked immediately with async/await
                    (async () => {
                        // log in to our API with a user/pass
                        try {
                        //Send customer info to database
                        res = await api.post('/add', {
                            headers: {
                                'X-Auth-Token': auth, 
                                'X-User-Id': userId
                            },
                            body: { 
                                'first_name': first_name,
                                'last_name': last_name,
                                'phone': phoneNum2,
                                'address_one': address_one,
                                'address_two': address_two,
                                'postal_code': postal_code,
                                'city': city,
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
                            Alert.alert(
                                'IMPORTANT',
                                'Saved Customer Data Successfully',
                                [
                                    {text: 'Continue', onPress: ()=> this.next()},
                                    {text: 'Home', onPress: ()=> this.navBack()}
                                ],
                                {cancelable: false}
                            ); 
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
    navAuto = () => {
        this.props.navigation.navigate('AutofillModal')
    }
    loadData = () => {
        if(this.props.navigation.state.params !=null){
            try{
                customerInfo = this.props.navigation.state.params.customer
                customerInfo.delivery = 'Local Delivery: $7'
                customerInfo.payment = 'Credit'
                phoneNum = this.props.navigation.state.params.phone
                if(this.props.navigation.state.params.order == "nothing"){
                    cart = []
                }
                else{
                    cart = this.props.navigation.state.params.order
                }
            } catch (err) {
                this.props.navigation.state.params = null
            }
            this.props.navigation.state.params = null
        }
    }
    render() {
        this.loadData();
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
                <Button 
                    onPress={this.navAuto}
                    title="Autofill Data"
                />
                <View style={{marginBottom: 15}} />
                <Form
                    ref={c => this._form2 = c} // assign a ref
                    type={Phone} 
                    value={phoneNum}
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
                    title="Save Changes"
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