import React, { Component } from 'react';
import {
	Alert,
	Image,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
    Platform,
    Button,
    ScrollView,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const UserLogin = t.struct({
  username: t.String,
  pass: t.String
});

const options = {
    fields: {
        pass: {
            label: 'Password',
        }
    }
}

// require the module
const Frisbee = require('frisbee');

// create a new instance of Frisbee
const api = new Frisbee({
  baseURI: 'https://pizza-admin.herokuapp.com/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export var userId;
export var auth;

export default class Login extends Component {
    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        if(value == null){
            Alert.alert(
                'Please enter login info'
            )
        }
        else{
            //send data to database
            // function invoked immediately with async/await
            (async () => {
                // log in to our API with a user/pass
                try {
                // make the request
                let res = await api.post('/login', {
                    body:{ 
                        'username': String(value.username), 
                        'password': String(value.pass)
                    }
                });
            
                // handle HTTP or API errors
                if (res.body.status == "error"){
                    //throw res.body.message;
                    Alert.alert(
                        res.body.message
                    );
                } 
                else if (res.body.status == "success"){
                    // set basic auth headers for all
                    auth = res.body.data.authToken
                    userId = res.body.data.userId
                    Alert.alert(
                        'Successful Login'
                    );
                    this.props.navigation.navigate('AutofillModal')
                }            
                } catch (err) {
                throw err;
                }
            })();     
        }   
    }
    render() {
        return (
        <ScrollView>
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
				</View>
                <Text style={{ fontSize: 25 }}>Point of Sale Login</Text>
                <View style={{marginBottom: 15}} />
                <Form
                    ref={c => this._form = c} // assign a ref
                    type={UserLogin} 
                    options={options} 
                />
                <View style={{marginBottom: 15}} />
                <Button 
                    onPress={this.handleSubmit}
                    title="Login"
                />
                <View style={{marginBottom: 15}} />
            </View>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: 150,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: { paddingTop: Platform.OS === 'ios' ? 13 : 7 },
});