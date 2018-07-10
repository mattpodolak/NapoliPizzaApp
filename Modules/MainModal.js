import React from 'react';
import { View, Text, Button } from 'react-native';
import t from 'tcomb-form-native';

const custom_data = require('./structure/custom_json.json');
const Form = t.form.Form;

var name = this.props.navigation.state.params.name;
var category = this.props.navigation.state.params.category;

class MainModal extends React.Component {
    findItem(){
      console.log('Hello: ', name);
    }
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