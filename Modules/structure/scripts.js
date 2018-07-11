// json
const item_data = require('./custom_json.json');
const topping_data = require('./topping_json.json');

// calculate price
export function calculatePrice(item){
    console.log('calculating price...');
    var total = 0;
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