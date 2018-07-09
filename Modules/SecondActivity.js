import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

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
 
          <Text style = { styles.ActivityNameTextCss }> This Is SecondActivity. </Text>
 
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