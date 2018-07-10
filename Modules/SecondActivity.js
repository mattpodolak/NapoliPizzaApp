import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

class SecondActivity extends Component
{
    
 static navigationOptions =
 {
    title: 'Cart',
 };
 
 render()
 {
    return(
        <View style = { styles.MainContainer }>
            <TouchableOpacity
                onPress={(event) => {
                    // onPress event fires with an event object
                    const { navigate } = this.props.navigation;
                    navigate('Cart', { name: 'Mega Deal', category: 'pizza_deals' });
                }}>
                <Text>TOUCH ME</Text>
            </TouchableOpacity>
        </View>
    );
 }
}
 
const styles = StyleSheet.create({
 
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
    
    });
 
 
export default SecondActivity;