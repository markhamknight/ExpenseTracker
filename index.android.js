import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Navigator,
  BackAndroid,
} from 'react-native';
import Queries from './app/Queries'
Queries.addDefaultCategories();
//import { Container, Content, Tab, Tabs, TabHeading, Button,Title,Left,Body,Icon, Text, Header} from 'native-base';
BackAndroid.addEventListener("hardwareBackPress", () => {
  if (navigator.getCurrentRoutes().length > 1) {
    navigator.pop()
    return true // do not exit app
  } else {
    return false // exit app
  }
})
import Today from './app/Today'
import Category from './app/Category'
import PerCategory from './app/PerCategory'
import PerDaily from './app/PerDaily'
import Tabs from './app/Tabs'
import Realm from 'realm'
import _ from 'lodash'

export default class ExpenseTrackerProject extends Component {
 
renderScene = (route, navigator) => {
    if (route.name == 'Today') {
      return <Tabs navigator={navigator}/>
    } else if (route.name == "perDaily") {
      return <PerDaily navigator={navigator} data={route.data} />
    } else if (route.name == 'perCategory') {
      return <PerCategory navigator={navigator} data={route.data}/>
    } else {
      return <Tabs navigator={navigator}/>
    } 
  }
render() {
    return (
          <Navigator
            initialRoute={{ key: '1', index: 0}}
            renderScene={this.renderScene}
            ref={(nav) => {navigator = nav;}}
          />
      );
}
}

AppRegistry.registerComponent('ExpenseTrackerProject', () => ExpenseTrackerProject);
