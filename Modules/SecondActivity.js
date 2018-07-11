import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';

class SecondActivity extends Component
{
    
 static navigationOptions =
 {
    title: 'Cart',
 };
 
 render()
 {
    return(
        <View style = { styles.container }>
        	<StatusBar barStyle="dark-content" />
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.dispatch(DrawerActions.toggleDrawer());
						}}
					>
						<Icon name="md-menu" size={30} />
					</TouchableOpacity>
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
    
    });
 
 
export default SecondActivity;