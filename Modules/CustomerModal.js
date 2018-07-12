import React, { Component } from 'react';
import { Alert, Button, View, StyleSheet, ScrollView, Text } from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  firstName: t.String,
  lastName: t.String,
  email: t.String,
  addressOne: t.String,
  addressTwo: t.maybe(t.String),
  postalCode: t.String,
  city: t.String,
  delivery: t.enums.of(['Pickup', 'Delivery'], 'Salads'),
  payment: t.enums.of(['Cash', 'Debit', 'Credit'], 'Salads'),
});

export var customerInfo = {
    firstName: null,
    lastName: null,
    email: null,
    addressOne: null,
    addressTwo: null,
    postalCode: null,
    city: null,
    delivery: null,
    payment: null
};

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
    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);  
        customerInfo = value
        if(value != null){
            this.props.navigation.goBack()
            Alert.alert(
                'Customer data saved'
            )
        }
        else{
            Alert.alert(
                'Required fields missing'
            ) 
        }
    }
    clearData = () => {
        customerInfo = {
            firstName: null,
            lastName: null,
            email: null,
            addressOne: null,
            addressTwo: null,
            postalCode: null,
            city: null,
            delivery: null,
            payment: null
        };
        this.forceUpdate()
    }
    render() {
        return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={{ fontSize: 25 }}>Customer Info Form</Text>
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
                    onPress={() => this.props.navigation.goBack()}
                    title="Go Back"
                />
                <View style={{marginBottom: 15}} />
                <Button 
                    title="Clear Data"
                    onPress={this.clearData}
                />
            </View>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 150,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});