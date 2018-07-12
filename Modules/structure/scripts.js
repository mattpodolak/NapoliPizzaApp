// json
const item_data = require('./custom_json.json');
const topping_data = require('./topping_json.json');

// calculate price for item
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

// format desc for item
export function formatDesc(item){
    /*
    var name = this.props.navigation.state.params.name;
    var category = this.props.navigation.state.params.category;
    var cat = category;
    for(var i = 0; i < item_data[category].length; i++){
        if (item_data[category][i].name == this.name){
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
    var topp_list = [];
    desc.push(item.name + "\n");
    desc.push("ITEM PRICE: $" + item.price + "\n");
    desc.push("TOPPINGS: ")
    for (var i = 0; i < item.toppings.length; i++){
        desc.push(item.toppings[i]);
        if(i < (item.toppings.length - 1)){
            desc.push(' | ');
        }
    }
    desc.push("\n")
    desc.push("_____________________________\n")
    return desc;    
}