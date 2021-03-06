import React, { Component } from 'react';
import MainActivity from './Modules/MainActivity' ;
import SecondActivity from './Modules/SecondActivity' ;
import ThirdActivity from './Modules/ThirdActivity';
import FourthActivity from './Modules/FourthActivity';
import MainDrawer from './Modules/MainDrawer' ;
import MainModal from './Modules/MainModal' ;
import Login from './Modules/Login' ;
import CustomerModal from './Modules/CustomerModal' ;
import AutofillModal from './Modules/AutofillModal' ;
import PastOrderModal from './Modules/PastOrderModal' ;
import {StyleSheet, Dimensions} from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

const RootDrawer = createDrawerNavigator(
  {
  Login: { screen: Login },

  Info: { screen: CustomerModal },

  Home: { screen: MainActivity },
   
  Cart: { screen: SecondActivity },

  },
  {
		// Custom rendering component of drawer panel
		contentComponent: MainDrawer,
	}
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: RootDrawer,
    },
    ToppingModal: {
      screen: MainModal,
    },
    PaymentModal: {
      screen: ThirdActivity,
    },
    CompleteModal:{
      screen: FourthActivity,
    },
    AutofillModal:{
      screen: AutofillModal,
    },
    PastOrderModal:{
      screen: PastOrderModal,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default class App extends React.Component {
	render() {
		return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  },
  textInput: {
    width: Dimensions.get('window').width - 30,
    marginHorizontal: 15,
    padding: 5,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#eee',
    marginVertical: 15,
    height: 50,
    fontSize: 16,
  },
  loadingOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//Exponent.registerRootComponent(App);