import React, { Component } from 'react';
import { Button, View, StyleSheet } from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  firstName: t.String,
  lastName: t.String,
  email: t.String,
  addressLineOne: t.String,
  addressLineTwo: t.String,
  postalCode: t.String,
  city: t.String
});

export default class TestModal extends Component {
    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);  
    }
    render() {
        return (
        <View style={styles.container}>
            <Form 
            ref={c => this._form = c} // assign a ref
            type={User} />
            <Button
                title="Save Customer Info"
                onPress={this.handleSubmit}
            />
        </View>
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