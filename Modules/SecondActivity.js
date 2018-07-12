import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, Platform, Alert, ScrollView} from 'react-native';
import {DrawerActions} from 'react-navigation';
import { Ionicons as Icon } from '@expo/vector-icons';
import * as utils from './structure/scripts.js';

var cartArr = [];

class SecondActivity extends Component
{  
    static navigationOptions =
    {
        title: 'Cart',
    };
    addtoCart= () => {
        if(this.props.navigation.state.params.category != undefined){
            this.category = this.props.navigation.state.params.category;
            this.name = this.props.navigation.state.params.name;
            this.custom = this.props.navigation.state.params.form;
            cartArr.push(
                {
                    name: this.name,
                    category: this.category,
                    custom: this.custom,
                    price: utils.singlePrice(this.name, this.category, this.custom)
                },
            );
        }
    }  
    render()
    {
        this.addtoCart()
        return(
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.dispatch(DrawerActions.toggleDrawer());
                        }}>
                    <Icon name="md-menu" size={30} />
                    </TouchableOpacity>
                    {/* MAP CART */}
                    <View>
                        {/*<ScrollView>
                            {cartArr.map((buttonInfo) => {
                                return (
                                    <View key={buttonInfo.id}>
                                        <Text style={styles.item}>
                                            {buttonInfo.name}{'\n'}
                                            Price: {buttonInfo.price}{'\n'}
                                            Size: {buttonInfo.size}{'\n'}
                                            Total Price: {utils.totalPrice(cartArr)} 
                                        </Text>
                                    </View>
                                );
                            })}
                        </ScrollView>*/}
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