import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, Platform, Alert, ScrollView} from 'react-native';
import {DrawerActions} from 'react-navigation';
import { Ionicons as Icon } from '@expo/vector-icons';
import * as utils from './structure/scripts.js';

initialArr = [
    {
        id: 1,
        price: 32.99,
        name: "Mega Deal",
        toppings: 3,
        size: 'Medium',
        addon: {
            name: 'Upgrade to large',
            price: 2

        },
        extras: {
            wings: 10,
            pop: 4,
            dip: 2,
            pasta: 'true'
        }
    }
  ];

class SecondActivity extends Component
{
    
 static navigationOptions =
 {
    title: 'Cart',
 };

 /*
calculatePrice(item){
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
*/

render()
{   
    return(
<View style={styles.container}>
            <StatusBar barStyle="dark-content" />
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.dispatch(DrawerActions.toggleDrawer());
                        }}
                    >
                        <Icon name="md-menu" size={30} />
                    </TouchableOpacity>
                    {/* MAP CART */}
                    <View>
                        <ScrollView>
                            {initialArr.map((buttonInfo) => {
                                return (
                                    <View key={buttonInfo.id}>

                                        <Text style={styles.item}>
                                            {buttonInfo.name}{'\n'}
                                            Price: {buttonInfo.price}{'\n'}
                                            Size: {buttonInfo.size}{'\n'}
                                            Total Price: {utils.calculatePrice(buttonInfo)}
                                            
                                        </Text>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>
                    
                </View>
        </View>
    );
 }
}
 
const styles = StyleSheet.create({
    container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#FFF',
    },
    header: { padding: 15, paddingTop: Platform.OS === 'ios' ? 13 : 7 },
    MainContainer: {
    
        flex:1,
        justifyContent: 'center',
        margin: 5
      
     },
    
    ActivityNameTextCss: {
    
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
     },

     container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#FFF',
    },
    header: { 
        padding: 15, 
        paddingTop: Platform.OS === 'ios' ? 13 : 7, 
        alignContent : 'center'
    },    
	item: {
        fontSize: 10,
        backgroundColor: 'dimgrey',
        margin: 5,
        textAlign: 'center',
	},
	price: {
        fontSize: 10,
        backgroundColor: 'lightgrey',
        fontWeight: 'bold',
	}, 
    
    });
 
 
export default SecondActivity;