import {customerInfo as customer} from '../CustomerModal'
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

// calculate delivery
export function deliveryCost(cartCurrent){
    var deli = 0;

    //check if non free delivery category
    for(var j = 0; j < cartCurrent.length; j++){
        if(cartCurrent[j].category != 'freedelivery'){
            // if a non free delivery item, check what delivery charge to apply
            if(customer.delivery == 'Local Delivery: $7'){
                deli = 7;
            }
            else{
                deli = 10;
            }
        }
    }
    if(customer.delivery == 'Pickup'){
        deli = 0;
    }

    //round to 2 decimal places
    deli = deli.toFixed(2);
    return deli;
}

// calculate tax
export function taxCost(subtotal){
    var tax = subtotal*0.13;

    //round to 2 decimal places
    tax = tax.toFixed(2);
    return tax;
}

// calculate final
export function finalPrice(subtotal, tax, delivery){
    var final = Number(subtotal)+Number(tax)+Number(delivery);
    final = final.toFixed(2);
    return final;
}

// calculate price
export function totalPrice(cartCurrent){
    console.log('calculating total price...');
    var cart_total = 0;
    for(var j = 0; j < cartCurrent.length; j++){
        cart_total += Number(cartCurrent[j].price);
    }
    cart_total = cart_total.toFixed(2);
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
            desc.push((i+1) + '. ' + item.custom.toppings[i] + ' ');
            divider++;
        }
    }    // pizza 2 toppings
    if(item.custom.toppings2 != null){
        desc.push("\nPIZZA 2 TOPPINGS: ")
        for (var j = 0; j < item.custom.toppings2.length; j++){
            desc.push((j+1) + '. ' + item.custom.toppings2[j] + ' ');
        }
    }
    // pizza 3 toppings
    if(item.custom.toppings3 != null){
        desc.push("\nPIZZA 3 TOPPINGS: ")
        for (var k = 0; k < item.custom.toppings3.length; k++){
            desc.push((k+1) + '. ' + item.custom.toppings3[k] + ' ');
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

export var MD5 = function (string) {

    function RotateLeft(lValue, iShiftBits) {
            return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }
 
    function AddUnsigned(lX,lY) {
            var lX4,lY4,lX8,lY8,lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                    return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                    if (lResult & 0x40000000) {
                            return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                    } else {
                            return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                    }
            } else {
                    return (lResult ^ lX8 ^ lY8);
            }
    }
 
    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }
 
    function FF(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function GG(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function HH(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function II(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1=lMessageLength + 8;
            var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
            var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
            var lWordArray=Array(lNumberOfWords-1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while ( lByteCount < lMessageLength ) {
                    lWordCount = (lByteCount-(lByteCount % 4))/4;
                    lBytePosition = (lByteCount % 4)*8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                    lByteCount++;
            }
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
            lWordArray[lNumberOfWords-2] = lMessageLength<<3;
            lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
            return lWordArray;
    };
 
    function WordToHex(lValue) {
            var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
            for (lCount = 0;lCount<=3;lCount++) {
                    lByte = (lValue>>>(lCount*8)) & 255;
                    WordToHexValue_temp = "0" + lByte.toString(16);
                    WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
            }
            return WordToHexValue;
    };
 
    function Utf8Encode(string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";
 
            for (var n = 0; n < string.length; n++) {
 
                    var c = string.charCodeAt(n);
 
                    if (c < 128) {
                            utftext += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
                            utftext += String.fromCharCode((c >> 6) | 192);
                            utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                            utftext += String.fromCharCode((c >> 12) | 224);
                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                            utftext += String.fromCharCode((c & 63) | 128);
                    }
 
            }
 
            return utftext;
    };
 
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
 
    string = Utf8Encode(string);
 
    x = ConvertToWordArray(string);
 
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
    for (k=0;k<x.length;k+=16) {
            AA=a; BB=b; CC=c; DD=d;
            a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
            d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
            c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
            b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
            a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
            d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
            c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
            b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
            a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
            d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
            c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
            b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
            a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
            d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
            c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
            b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
            a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
            d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
            c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
            b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
            a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
            d=GG(d,a,b,c,x[k+10],S22,0x2441453);
            c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
            b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
            a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
            d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
            c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
            b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
            a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
            d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
            c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
            b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
            a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
            d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
            c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
            b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
            a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
            d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
            c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
            b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
            a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
            d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
            c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
            b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
            a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
            d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
            c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
            b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
            a=II(a,b,c,d,x[k+0], S41,0xF4292244);
            d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
            c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
            b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
            a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
            d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
            c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
            b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
            a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
            d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
            c=II(c,d,a,b,x[k+6], S43,0xA3014314);
            b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
            a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
            d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
            c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
            b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
            a=AddUnsigned(a,AA);
            b=AddUnsigned(b,BB);
            c=AddUnsigned(c,CC);
            d=AddUnsigned(d,DD);
            }
 
        var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
        return temp.toLowerCase();
 }