// json
const item_data = require('./custom_json.json');
const topping_data = require('./topping_json.json');

// calculate price
export function calculatePrice(item){
    console.log('calculating price...')
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
// format toppings list
export function formatToppings(item){

}

// format description
export function formatDesc(item){

}