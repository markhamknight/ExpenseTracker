import React, { Component } from 'react';
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import Today from './Today';
import Category from './Category';
import Daily from './Daily';
import Queries from './Queries';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabView: {
    flex: 1,
  },
  pageTitle: {
    flex: 6,
    fontWeight: 'bold',
    fontSize: 20, 
    marginLeft: 10,
    marginTop: 5,
  },
  pageTitleContainer: {
    flexDirection: 'row',
    backgroundColor: '#3591EF',
  },
  tabBar: {
    backgroundColor: '#3591EF',
  },
  transactionButton: {
    marginRight: 5,
    marginTop: 7,
  },
  transactionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class Tabs extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', icon: 'clock-o', title: 'Today'},
      { key: '2', icon: 'tasks', title: 'Category'},
      { key: '3', icon: 'calendar-o', title: 'Daily'},
    ],
  };

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderIcon =({ route }: any) => {
    return (
      <Icon
        name={route.icon}
        size={24}
      />
    );
  };

  _renderHeader = (props) => {
    return  <TabBar {...props} 
              tabStyle={styles.tabBar}
              renderIcon={this._renderIcon}
            />;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <Today navigator={this.props.navigator} />;
    case '2':
      return <Category navigator={this.props.navigator} />;
    case '3':
      return <Daily navigator={this.props.navigator} />;
    default:
      return null;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>
            {this.state.routes[this.state.index].pageTitle}
          </Text>
        </View>
        <TabViewAnimated
          style={styles.tabView}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleChangeTab}
        />
      </View>
    );
  }
}