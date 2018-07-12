// json
const item_data = require('./custom_json.json');
const topping_data = require('./topping_json.json');

// calculate price for item
export function calculatePrice(item){
    console.log('calculating price...');
    var total = 0;
    total += item.price;
    // add on section
    if (item.addon != null){
        total += item.addon.price;
    }
    // check size
    if (item.size == 'Medium'){
        total += 100;
    }
    return total;
}

// name, category, custom, price

// format desc for item 
export function formatDesc(item){
    /*
    var name = this.props.navigation.state.params.name;
    var category = this.props.navigation.state.params.category;
    var cat = category;
    for(var i = 0; i < item_data[category].length; i++){
        if (item_data[category][i].name == this.name){
            // found item
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
    */

    console.log('grabbing toppings for ' + item.name + '...');
    var desc = [];
    desc.push(item.name + "\n");
    desc.push("ITEM PRICE: $" + item.price + "\n");

    // toppings
    desc.push("TOPPINGS: ")
    for (var i = 0; i < item.default_toppings.length; i++){
        desc.push(item.default_toppings[i]);
        if(i < (item.default_toppings.length - 1)){
            desc.push(' | ');
        }
    }
    // addons
    if (item.addon != null){
        desc.push("\nADD-ONS: " + item.addon.name + " $" + item.addon.price);
    }

    // extras, maybe try mapping
    desc.push("\nWings: " + item.extras.Wings + "\nPop: " + item.extras.Pop + "\nDip: " + item.extras.Dip + "\nChips: " + item.extras.Chips + "\nGarlic bread with cheese: " + item.extras['Garlic bread with cheese']);

    desc.push("\n");
    desc.push("_____________________________\n");
    return desc;    
}