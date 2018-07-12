import React from 'react';
import { Alert, View, Text, Button, StyleSheet, ScrollView } from 'react-native';
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
  'Mozzarella',
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
  'Sun Dried Tomatoes', 
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
  'Caesar',
  'Chicken Caesar',
  'Greek'
]

var all_sandwich = [
  'Pizza Sub',
  'Meatballs',
  'Chicken',
  'Veggie'
]

var all_pasta = [
  'Penne',
  'Lasagna'
]

var pasta_special = [
  'Penne',
  'Lasagna',
  'Spaghetti'
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
const PastaSpecial = t.enums.of(pasta_special, 'PastaSpecial');

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
      panzoToppings:{
        label: 'Panzo 1 Toppings',
      },
      panzoToppings2:{
        label: 'Panzo 2 Toppings',
      },
      pops:{
        label: 'Add Pops',
      },
      dips:{
        label: 'Add Dips',
      },
      chips:{
        label: 'Pick Type of Chips',
      },
      wings:{
        label: 'Pick Wing Flavour',
      },
      pasta:{
        label: 'Pick Penne or Lasagna',
      },
      pastaSpecial:{
        label: 'Pick a Pasta',
      },
      sandwich:{
        label: 'Pick Sandwich 1',
      },
      sandwich2:{
        label: 'Pick Sandwich 2',
      },
      salad:{
        label: 'Pick a Salad',
      }
  }
};

class MainModal extends React.Component {
    handleSubmit = () => {
      var value = this._form.getValue(); // use that ref to get the form value
      console.log('value: ', value);  
      if(value != null){
        var randInt = Math.floor(Math.random() * Math.floor(100000));
        // goes to cart
        var { navigate } = this.props.navigation;
        navigate('Cart', { id: randInt, name: this.name, category: this.cat, form: value });
      }
      else{
        Alert.alert(
          'Required fields missing'
        )
      }
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
      //Add default toppings
      this.defaultToppings = {
        "addOns": null,
        "dips": null,
        "pops": null,
        "specialNotes": null,
        "toppings": this.default_toppings,
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
      if(this.extras.Chips == 'True'){
        this.desc = this.desc + ', Chips'
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
      console.log('num ', this.name);     
    }
    generateContent= () => {
      if(parseInt(this.num_pizzas) > 0){
        //CALZONE
        if(this.name == "Calzone"){
          this.PizzaForm = t.struct({
            specialNotes: t.maybe(t.String),
            addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
            calzoneToppings: t.maybe(t.list(Toppings)), 
            pops: t.maybe(t.list(Pops)),
            dips: t.maybe(t.list(Dips)),
          });
        }
        //1 Panzo 1 Pop
        else if(this.name == "1 Panzo, 1 Pop"){
          this.PizzaForm = t.struct({
            specialNotes: t.maybe(t.String),
            addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
            panzoToppings: t.maybe(t.list(Toppings)), 
            pops: t.maybe(t.list(Pops)),
            dips: t.maybe(t.list(Dips)),
          });
        }
        //2 Panzo 2 Pop
        else if(this.name == "2 Panzo, 2 Pop"){
          this.PizzaForm = t.struct({
            specialNotes: t.maybe(t.String),
            addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
            panzoToppings: t.maybe(t.list(Toppings)),
            panzoToppings2: t.maybe(t.list(Toppings)), 
            pops: t.maybe(t.list(Pops)),
            dips: t.maybe(t.list(Dips)),
          });
        }
        //ONE PIZZA
        else if(parseInt(this.num_pizzas) == 1){
          //Free delivery medium and large pizza
          if(this.name == 'Medium Pizza' || this.name == 'Large Pizza'){
            //Pizza with no extras
            this.PizzaForm = t.struct({
              specialNotes: t.maybe(t.String),
              addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
              toppings: t.maybe(t.list(Toppings)), 
              toppings2: t.maybe(t.list(Toppings)), //Incase they select a second pizza
              pops: t.maybe(t.list(Pops)),
              dips: t.maybe(t.list(Dips)),
            });
          }
          else if(parseInt(this.extras.Wings) > 0){
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
            else if(this.name == 'Pizza & Wings Party'){
              //Pizza with wings
              this.PizzaForm = t.struct({
                specialNotes: t.maybe(t.String),
                addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
                toppings: t.maybe(t.list(Toppings)), 
                toppings2: t.maybe(t.list(Toppings)), //Incase they select a second pizza
                pops: t.maybe(t.list(Pops)),
                dips: t.maybe(t.list(Dips)),
                wings:Wings
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
      //Light Snack Deal #1
      else if(this.name == 'Light Snack Deal #1'){
        this.PizzaForm = t.struct({
          specialNotes: t.maybe(t.String),
          addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
          salad: Salads,
          pops: t.maybe(t.list(Pops)),
        });
      }
      //Light Snack Deal #2
      else if(this.name == 'Light Snack Deal #2'){
        this.PizzaForm = t.struct({
          specialNotes: t.maybe(t.String),
          addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
          salad: Salads,
          wings: Wings,
          pops: t.maybe(t.list(Pops)),
        });
      }
      //Wings
      else if(parseInt(this.extras.Wings) > 0){
        this.PizzaForm = t.struct({
          specialNotes: t.maybe(t.String),
          addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
          wings: Wings,
          pops: t.maybe(t.list(Pops)),
          dips: t.maybe(t.list(Dips)),
        });
      }
      //Pitas
      else if(this.extras.Chips == 'True'){
        this.PizzaForm = t.struct({
          specialNotes: t.maybe(t.String),
          addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
          chips: t.maybe(t.list(Chips)),
          pops: t.maybe(t.list(Pops)),
          dips: t.maybe(t.list(Dips)),
        });
      }
      //Pasta Special
      else if (this.name == 'Pasta Special'){
        this.PizzaForm = t.struct({
          specialNotes: t.maybe(t.String),
          addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
          pastaSpecial: PastaSpecial,
          pops: t.maybe(t.list(Pops)),
          dips: t.maybe(t.list(Dips)),
        });
      }
      else{
        this.PizzaForm = t.struct({
          specialNotes: t.maybe(t.String),
          addOns: t.maybe(t.enums.of(this.addonArr, 'Add Ons')),
          pops: t.maybe(t.list(Pops)),
          dips: t.maybe(t.list(Dips)),
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
              value={this.defaultToppings}
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