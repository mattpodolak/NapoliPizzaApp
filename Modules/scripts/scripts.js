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