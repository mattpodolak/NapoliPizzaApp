import React, { Component } from 'react';
import { Alert, Button, View, StyleSheet, ScrollView } from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  firstName: t.String,
  lastName: t.String,
  email: t.String,
  addressOne: t.String,
  addressTwo: t.maybe(t.String),
  postalCode: t.String,
  city: t.String
});

const customerInfo = {
    firstName: null,
    lastName: null,
    email: null,
    addressOne: null,
    addressTwo: null,
    postalCode: null,
    city: null
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
    },
};

export default class CustomerModal extends Component {
    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);  
        customerInfo = value
        Alert.alert(
            'Customer data saved'
        )
    }
    render() {
        return (
        <ScrollView>
            <View style={styles.container}>
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
    padding: 20,
    backgroundColor: '#ffffff',
  },
});