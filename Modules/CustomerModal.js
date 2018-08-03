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
            Alert.alert(
                'Autofill'
            );    
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
                if(value != null){
                    this.navBack
                    Alert.alert(
                        'Customer data saved'
                    )
                    let storeData = {
                        'phone': phone,
                        'customer': customerInfo
                    }
                    //Add to data file here
                    try {
                        AsyncStorage.setItem(phoneNum, JSON.stringify(storeData));
                    } 
                    catch (error) {
                        // Error saving data
                        console.log('Error saving customer data to file, OH NO ', error)
                    }
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