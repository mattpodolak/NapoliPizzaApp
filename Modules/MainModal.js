import React from 'react';
import { View, Text, Button } from 'react-native';
import t from 'tcomb-form-native';

const custom_data = require('./structure/custom_json.json');
const Form = t.form.Form;

class MainModal extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30 }}>This is a modal!</Text>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Dismiss"
          />
        </View>
      );
    }
  }

  export default MainModal;