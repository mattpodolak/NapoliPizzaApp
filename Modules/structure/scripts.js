import {cartArr as cart} from '../SecondActivity'

// json
const item_data = require('./custom_json.json');
const topping_data = require('./topping_json.json');

// calculate price
export function calculatePrice(){
    console.log('calculating price...');
    var total = 0;
    for(var j = 0; j < cart.length; j++){
        var name = cart[j].name;
        var category = cart[j].category;
        var custom = cart[j].custom;
        //Find item data in custom json
        for(var i = 0; i < item_data[category].length; i++)
        {
          if (item_data[category][i].name == name){
            var desc = item_data[category][i].desc;
            var price = item_data[category][i].price;
            var num_pizzas = item_data[category][i].pizzas;
            var size = item_data[category][i].size;
            var free_toppings = item_data[category][i].toppings;
            var default_toppings = item_data[category][i].default_toppings;
            var addon = item_data[category][i].addon;
            var extras = item_data[category][i].extras;
            break;
          }
        }

        //Now calculate the price
    }

    total += item.price;
    console.log(total);
    // add on section
    if (item.addon.price){
        total += item.addon.price;
        console.log(total);
    }
    // check size
    if (item.size == 'Medium'){
        total += 100;
    }
    console.log(total);
    return total;
}

// format description
export function formatDesc(item){
    console.log('grabbing toppings...');
    var topping_list = [];
    if(item.toppings){
        topping_list.append('Pizza 1: ' + item.toppings + '\n');
        if(item.toppings2){
            topping_list.append('Pizza 2: ' + item.toppings2 + '\n');
            if(item.toppings3){
                topping_list.append('Pizza 3: ' + item.toppings3);
            }  
        }
    }  
    return topping_list.toString();
}

// emailer