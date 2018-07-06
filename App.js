import React, { Component } from 'react';
import MainActivity from './Modules/MainActivity' ;
import SecondActivity from './Modules/SecondActivity' ;
import MainDrawer from './Modules/MainDrawer' ;
import MainModal from './Modules/MainModal' ;

import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

const RootDrawer = createDrawerNavigator(
  {
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
    MyModal: {
      screen: MainModal,
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