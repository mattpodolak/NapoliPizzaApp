// json
const item_data = require('./custom_json.json');
const topping_data = require('./topping_json.json');

//calculate single item price
export function singlePrice(name, category, custom){
    var total = 0;
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

        //convert string to numbers
        num_pizzas = parseInt(num_pizzas);
        price = Number(price);
        break;
      }
    }

    //Calculate the price
    //Add base price
    total += price;
    console.log('New total ', total);
    //Check if any addons, and add price of selected
    if(custom.addOns != null){
        for(var h=0; h < addon.length; h++){
            if(custom.addOns.includes(addon[h].name)){
                var addPrice = Number(addon[h].price);
                total+= addPrice;
            }
        }
        console.log('Add on added to total ', total);
        //Increase size if is a size upgrade
        if(custom.addOns.includes("Large")){
            size = "Large";
        }
        else if(custom.addOns.includes("X-Large")){
            size = "X-Large";
        }
        else if(custom.addOns.includes("Party")){
            size = "Party";
        }
    }
    //Check if one of the items set to +1 num_pizzas
    else if(name == "Large Pizza" || name == "Medium Pizza" || name == "Pizza & Wings Party"){
        num_pizzas = num_pizzas - 1;
    }
    var all_toppings = [];
    //Check num pizzas
    if(num_pizzas > 0){
        if(num_pizzas == 1){
            var all_toppings = all_toppings.concat(custom.toppings);  
        }
        else if(num_pizzas == 2){
            var all_toppings = all_toppings.concat(custom.toppings, custom.toppings2); 
        }
        else if(num_pizzas == 3){
            var all_toppings = all_toppings.concat(custom.toppings, custom.toppings2, custom.toppings3);  
        }
        console.log(default_toppings);
        console.log(all_toppings);
        //Subtract default toppings from topping list
        if(default_toppings != null){
            for(var i = 0; i < default_toppings.length; i++){
                var index= all_toppings.indexOf(default_toppings[i])
                if(index >= 0){
                    all_toppings.splice(index, 1);
                    console.log('Splice!');
                }
            }
        }
        console.log('Toppings without default ', all_toppings);
        //add up topping values
        var topping_value = 0;
        for(var i = 0; i < all_toppings.length; i++){
            for(var k = 0; k < topping_data.Meat.length; k++){
                if(topping_data.Meat[k].name == all_toppings[i]){
                    topping_value += Number(topping_data.Meat[k].value);
                    break;
                }
            }
            for(var k = 0; k < topping_data.Cheese.length; k++){
                if(topping_data.Cheese[k].name == all_toppings[i]){
                    topping_value += Number(topping_data.Cheese[k].value)
                    break;
                }
            }
            for(var k = 0; k < topping_data.Vegetable.length; k++){
                if(topping_data.Vegetable[k].name == all_toppings[i]){
                    topping_value += Number(topping_data.Vegetable[k].value)
                    break;
                }
            }
        }
        console.log('Topping value ', topping_value);
        //multiply topping sum by price per topping depending on size
        for(var k = 0; k < topping_data.Price.length; k++){
            if(size == topping_data.Price[k].name){
                var topping_price = Number(topping_data.Price[k].value)
            }
        }
        console.log('Topping price ', topping_price);
        total+=(topping_value-free_toppings)*topping_price;
        console.log('New total ', total);
    }
    //Subtract extras (pop and dip) values from amount sent and charge for remaining value
    if(custom.pops != null){
        if((custom.pops.length - Number(extras.Pop))*Number(topping_data.Pop[0].value)>0){
            total+= (custom.pops.length - Number(extras.Pop))*Number(topping_data.Pop[0].value);
            console.log('After pop ', total);
        }
    }
    if(custom.dips != null){
        if((custom.dips.length - Number(extras.Dip))*Number(topping_data.Dip[0].value)>0){
            total+= (custom.dips.length - Number(extras.Dip))*Number(topping_data.Dip[0].value);
            console.log('After dip ', total);
        }
    }
    //round to 2 decimal places
    total = total.toFixed(2);
    console.log('Final ', total)
    return total;
}

// calculate price
export function totalPrice(cartCurrent){
    console.log('calculating total price...');
    var cart_total = 0;
    for(var j = 0; j < cartCurrent.length; j++){
        cart_total += Number(cartCurrent[j].price);
    }
    console.log(cart_total);
    return cart_total;
}


export function formatDesc(item){

    var desc = [];
    var divider = 0;
    // name and price
    var item_name = item.name.replace(new RegExp('&', 'g'), 'and');
    console.log(item_name);
    desc.push("\n-" + item_name + "- $" + item.price);
    // addon
    if (item.custom.addOns != null){
        desc.push("\nADD-ONS: " + item.custom.addOns);
    }
    // pizza 1 toppings
    if(item.custom.toppings != null){
        desc.push("\nPIZZA 1 TOPPINGS: ")
        for (var i = 0; i < item.custom.toppings.length; i++){
            desc.push(item.custom.toppings[i]);
            if(i < item.custom.toppings.length - 1){
                desc.push(' | ')
                divider ++;
            }
        }
    }    // pizza 2 toppings
    if(item.custom.toppings2 != null){
        desc.push("\nPIZZA 2 TOPPINGS: ")
        for (var j = 0; j < item.custom.toppings2.length; j++){
            desc.push(item.custom.toppings2[j]);
            if(j < item.custom.toppings2.length - 1){
                desc.push(' | ')
            }
        }
    }
    // pizza 3 toppings
    if(item.custom.toppings3 != null){
        desc.push("\nPIZZA 3 TOPPINGS: ")
        for (var k = 0; k < item.custom.toppings3.length; k++){
            desc.push(item.custom.toppings3[k]);
            if(k < item.custom.toppings3.length - 1){
                desc.push(' | ')
            }
        }
    }
    // chips
    if (item.custom.Chips != null){
        desc.push("\nCHIPS: " + item.custom.Chips);
    }
    // dips
    if (item.custom.dips != null){
        desc.push("\nDIPS: ");
        for (var i = 0; i < item.custom.dips.length; i++){
            desc.push((i+1) + '. ' + item.custom.dips[i] + ' ');
        }
    }
    // pops
    if (item.custom.pops != null){
        desc.push("\nPOPS: ");
        for (var j = 0; j < item.custom.pops.length; j++){
            desc.push((j+1) + '. ' + item.custom.pops[j] + ' ');
        }
    }
    // pasta
    if (item.custom.pasta != null){
        desc.push("\nPASTA: " + item.custom.pasta);
    }
    // special notes
    if (item.custom.specialNotes != null){
        desc.push('\nNOTES: ' + item.custom.specialNotes);
    }
    // wings
    if (item.custom.wings != null){
        desc.push('\nWINGS: ' + item.custom.wings);
    }

    if(divider == 0){divider == 3};

    desc.push('\n')
    for (var i = divider; i > 0; i--){
        desc.push('_______________________');
    }
    
    return desc; 
}