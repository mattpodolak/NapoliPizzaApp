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
  'Fresh Garlic',
  'White Sauce',
  'Pesto Sauce',
  'Beef Salami'
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
  'BBQ',
  'Hot',
  'Medium',
  'Honey Garlic'
]

var all_pita = [

]

var all_salad = [

]

var all_sandwich = [

]

var all_pasta = [
  'Penne',
  'Lasagna'
]

const Toppings = t.enums.of(all_toppings, 'Toppings');
const Pops = t.enums.of(all_pops, 'Pops');
const Dips = t.enums.of(all_dips, 'Dips');
const Chips = t.enums.of(all_chips, 'Chips');
const Wings = t.enums.of(all_wings, 'Wings');
const Pitas = t.enums.of(all_pita, 'Pitas');
const Salads = t.enums.of(all_salad, 'Salads');
const Sandwiches = t.enums.of(all_sandwich, 'Sandwiches');
const Pasta = t.enums.of(all_pasta, 'Pasta');

var options = {
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
      calzoneToppings:{
        label: 'Calzone Toppings',
    },
      pops:{
        label: 'Add Pops',
      },
      dips:{
        label: 'Add Dips',
      },
      wings:{
        label: 'Pick Wing Flavour',
      },
      pasta:{
        label: 'Pick Penne or Lasagna',
      },
      sandwich:{
        label: 'Pick Sandwich 1',
      },
      sandwich:{
        label: 'Pick Sandwich 2',
      },
  }
};

class MainModal extends React.Component {
    handleSubmit = () => {
      const value = this._form.getValue(); // use that ref to get the form value
      console.log('value: ', value);  
    }
    findItem= () => {
      this.name = this.props.navigation.state.params.name;
      var category = this.props.navigation.state.params.category;
      this.cat = category;
      for(var i = 0; i < custom_data[category].length; i++)
      {
        if (custom_data[category][i].name == this.name){
          this.desc = custom_data[category][i].desc;
          this.price = custom_data[category][i].price;
          this.num_pizzas = custom_data[category][i].pizzas;
          this.size = custom_data[category][i].size;
          this.free_toppings = custom_data[category][i].toppings;
          this.default_toppings = custom_data[category][i].default_toppings;
          this.addon = custom_data[category][i].addon;
          this.extras = custom_data[category][i].extras;
          break;
        }
      }
      //Add extras to description
      if(this.extras.Wings != '0'){
        this.desc = this.desc + ', ' + this.extras.Wings + ' Wings'
      }
      if(this.extras.Pop != '0'){
        this.desc = this.desc + ', ' + this.extras.Pop + ' Pops'
      }
      if(this.extras.Dip != '0'){
        this.desc = this.desc + ', ' + this.extras.Dip + ' Dips'
      }
      if(this.extras.Pasta == 'True'){
        this.desc = this.desc + ', Penne or Lasagna'
      }
      if(this.extras["Garlic bread with cheese"] == 'True'){
        this.desc = this.desc + ', Garlic bread with cheese'
      }

      //Make addon array
      this.addonArr = [];
      if(this.addon != null){
        for(var i = 0; i < this.addon.length; i++){
          this.addonArr.push(this.addon[i].name + ' +$' + this.addon[i].price);
        }
      }
      console.log('num ');     
    }
    generateContent= () => {
      if(parseInt(this.num_pizzas) > 0){
        //CALZONE
        if(this.name == 'Calzone'){
          this.PizzaForm = t.struct({
            specialNotes: t.maybe(t.String),
            addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
            calzoneToppings: t.maybe(t.list(Toppings)), 
            pops: t.maybe(t.list(Pops)),
            dips: t.maybe(t.list(Dips)),
          });
        }
        //ONE PIZZA
        if(parseInt(this.num_pizzas) == 1){
          if(parseInt(this.extras.Wings) > 0){
            if(this.extras.Pasta == 'True'){
              //Pizza with wings and pasta
              this.PizzaForm = t.struct({
                specialNotes: t.maybe(t.String),
                addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
                toppings: t.maybe(t.list(Toppings)), 
                pops: t.maybe(t.list(Pops)),
                dips: t.maybe(t.list(Dips)),
                wings: Wings,
                pasta: Pasta
              });
            }
            else{
              //Pizza with wings
              this.PizzaForm = t.struct({
                specialNotes: t.maybe(t.String),
                addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
                toppings: t.maybe(t.list(Toppings)), 
                pops: t.maybe(t.list(Pops)),
                dips: t.maybe(t.list(Dips)),
                wings:Wings
              });
            }
          }
          else{
            //Pizza with no extras
            this.PizzaForm = t.struct({
              specialNotes: t.maybe(t.String),
              addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
              toppings: t.maybe(t.list(Toppings)), 
              pops: t.maybe(t.list(Pops)),
              dips: t.maybe(t.list(Dips)),
            });
          }
        }
        //TWO PIZZA
        else if(parseInt(this.num_pizzas) == 2){
          if(parseInt(this.extras.Wings) > 0){
            if(this.extras.Pasta == 'True'){
              //Pizza with wings and pasta
              this.PizzaForm = t.struct({
                specialNotes: t.maybe(t.String),
                addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
                toppings: t.maybe(t.list(Toppings)), 
                toppings2: t.maybe(t.list(Toppings)),
                pops: t.maybe(t.list(Pops)),
                dips: t.maybe(t.list(Dips)),
                wings: Wings,
                pasta: Pasta
              });
            }
            else{
              //Pizza with wings
              this.PizzaForm = t.struct({
                specialNotes: t.maybe(t.String),
                addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
                toppings: t.maybe(t.list(Toppings)), 
                toppings2: t.maybe(t.list(Toppings)),
                pops: t.maybe(t.list(Pops)),
                dips: t.maybe(t.list(Dips)),
                wings:Wings
              });
            }
          }
          else{
            //Pizza with no extras
            this.PizzaForm = t.struct({
              specialNotes: t.maybe(t.String),
              addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
              toppings: t.maybe(t.list(Toppings)), 
              toppings2: t.maybe(t.list(Toppings)),
              pops: t.maybe(t.list(Pops)),
              dips: t.maybe(t.list(Dips)),
            });
          }
        }
        //THREE PIZZA
        else if(parseInt(this.num_pizzas) == 3){
          this.PizzaForm = t.struct({
            specialNotes: t.maybe(t.String),
            addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
            toppings: t.maybe(t.list(Toppings)), 
            toppings2: t.maybe(t.list(Toppings)),
            toppings3: t.maybe(t.list(Toppings)),
            pops: t.maybe(t.list(Pops)),
            dips: t.maybe(t.list(Dips)),
          });
        }
      }
      //Two Oven Baked Sandwiches
      else if(this.name == 'Two Oven Baked Sandwiches'){
        this.PizzaForm = t.struct({
          specialNotes: t.maybe(t.String),
          addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
          sandwich: Sandwiches,
          sandwich1: Sandwiches,
          pops: t.maybe(t.list(Pops)),
        });
      }
      else{
        this.PizzaForm = t.struct({
          specialNotes: t.maybe(t.String),
          addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
        });
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
              options={options} // pass the options via props
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