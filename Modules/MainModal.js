import React from 'react';
import { View, Text, Button } from 'react-native';
import t from 'tcomb-form-native';

const custom_data = require('./structure/custom_json.json');
const Form = t.form.Form;


class MainModal extends React.Component {
    findItem= () => {
      this.name = this.props.navigation.state.params.name;
      this.display_name = this.props.navigation.state.params.name;
      var category = this.props.navigation.state.params.category;
      for(var i = 0; i < custom_data[category].length; i++)
      {
        if (custom_data[category][i].name == this.name){
          this.desc = custom_data[category][i].desc;
          this.price = custom_data[category][i].price;
          this.num_pizzas = custom_data[category][i].pizzas;
          this.size = custom_data[category][i].size;
          this.free_toppings = custom_data[category][i].toppings
          this.default_toppings = custom_data[category][i].default_toppings
          this.addon = custom_data[category][i].addon
          this.extras = custom_data[category][i].extras
          break;
        }
      }
        
      console.log('Test search: ', this.desc);
      console.log('Name: ', this.price);
    }
    render() {
      this.findItem()
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30 }}>{this.display_name}</Text>
          <Text style={{ fontSize: 30 }}></Text>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Dismiss"
          />
        </View>
      );
    }
  }

  export default MainModal;