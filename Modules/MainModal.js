import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import t from 'tcomb-form-native';

var formStylesheet = require('./src/FormStyles.js');
const Form = t.form.Form;
const custom_data = require('./structure/custom_json.json');

var all_toppings = [
'Pepperoni', 
'Ham', 
'Bacon', 
'Chicken', 
'Italian Sausage', 
'Cheddar', 
'Parmesan', 
'X-Cheese', 
'Double Cheese', 
'Feta', 
'Mushrooms', 
'Green Peppers', 
'Green Olives', 
'Black Olives', 
'Hot Peppers', 
'Red Peppers', 
'Jalapenos', 
'Broccoli', 
'Onions', 
'Pineapple', 
'Tomatoes', 
'Sun Dried Tomoatoes', 
'Spinach', 
'Thin Crust', 
'Thick Crust', 
'Whole Wheat', 
'Extra Sauce', 
'Chili Pepper', 
'Fresh Garlic'
];

var all_pops = [
'Coke',
'Diet Coke',
'Coke Zero',
'Sprite',
'Nestea',
'Barqs Root Beer',
'Canada Dry',
'C-Plus',
'Fresca',
'Brio',
'Water'
];

var all_dips = [
  'Ranch',
  'Garlic',
  'Blue Cheese',
  'Marinara',
  'Cheddar Chipotle',
  'Spicy Buffalo'
]

var all_chips = [
    'Lays',
    'Doritos'
]

var all_wings = [

]

var all_pita = [

]

var all_salad = [

]

const Toppings = t.enums.of(all_toppings, 'Toppings');
const Pops = t.enums.of(all_pops, 'Pops');
const Dips = t.enums.of(all_dips, 'Dips');
const Chips = t.enums.of(all_chips, 'Chips');

class MainModal extends React.Component {
    handleSubmit = () => {
      const value = this._form.getValue(); // use that ref to get the form value
      console.log('value: ', value);  
    }
    findItem= () => {
      this.name = this.props.navigation.state.params.name;
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

      console.log('num ', this.num_pizzas)     
      console.log('Test search: ', this.desc);
      console.log('Name: ', this.price);
    }
    generateContent= () => {
      if(this.num_pizzas > 0){
        console.log('WTF')
        this.PizzaForm = t.struct({
          specialNotes: t.maybe(t.String),
          toppings: t.maybe(t.list(Toppings)), 
          toppings2: t.maybe(t.list(Toppings)),
          toppings3: t.maybe(t.list(Toppings)),
          pops: t.maybe(t.list(Pops)),
          dips: t.maybe(t.list(Dips)),
        });
      
        this.options = {
          stylesheet: formStylesheet,
          fields:{
              specialNotes: {
                  label: 'Special Notes (optional)',
              },
              toppings:{
                  label: 'Pizza 1 Toppings',
              },
              toppings2:{
                  label: 'Pizza 2 Toppings',
              },
              toppings3:{
                  label: 'Pizza 3 Toppings',
              },
          }
        };
      }
      else{
        this.PizzaForm = t.struct({
          specialNotes: t.maybe(t.String),
        });
        
        this.options = {
          stylesheet: formStylesheet,
          fields:{
              specialNotes: {
                  label: 'Special Notes (optional)',
              },
            }
          };
      }
    }
    render() {
      this.findItem()
      this.generateContent()
      return (
        <ScrollView>
          <View style={styles.container}>
            <Button
              onPress={() => this.props.navigation.goBack()}
              title="Go Back"
            />
            <Text style={{ fontSize: 30 }}>{this.name} ${this.price}</Text>
            <Text style={{ fontSize: 16 }}>{this.desc}</Text>
            <Form 
              ref={c => this._form = c} // assign a ref
              type={this.PizzaForm} 
              options={this.options} // pass the options via props
              //value={customerInfo}
            />
            <Button
              title="Add to Cart"
              onPress={this.handleSubmit}
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

  export default MainModal;