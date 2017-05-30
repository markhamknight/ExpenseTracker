import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Modal,
  ListView,
  TextInput,
  Navigator,
  TouchableOpacity,
} from 'react-native';
import { Container, Content, Tab, Tabs, Toast,Title, List, ListItem,TabHeading, Icon, Text, Header, Fab, Button,Form, Item, Label, Input, Picker, Left,Body} from 'native-base';
import { StackNavigator } from 'react-navigation';
import _ from 'lodash'
import moment from 'moment/src/moment';
import Queries from './Queries'
import Today from './Today'
var now = moment().format('MMMM YYYY');
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});


export default class Category extends Component {
  constructor(props) {
        super(props);
        this.state = {
            active: false,
            time: now,
            totalForMonth: 0,
            //dataSource: ds.cloneWithRows(Queries.getTotalPerDay()),
        };
      
    
    }
  renderRow(rowData) {
    return(
        <TouchableOpacity style={styles.itemContainer} onPress={() => this.navigator.push({
          name: 'perDaily',
          data: rowData,
        }) }>
          <Text style={{
            marginLeft: 10,
            flex: 9,
            fontSize: 17.5,
          }}>
            {moment(rowData.name).format('DD - ddd')}
          </Text>
          <Text style={{
            marginRight: 10,
            fontSize: 17.5
            }}>
            {rowData.total}
          </Text>
        </TouchableOpacity>
    )
  }

render() {
      return (
           <Container>
              <View style={styles.mainContainer}>
                  <View style={styles.datePriceContainer}>
                    <View style={styles.dateContainer}>  
                      <Text style={{fontSize:20}}>  
                        {this.state.time}  
                      </Text>  
                    </View>  
                    <View style={styles.priceContainer}>  
                      <Text style={{fontSize:50,fontWeight:'bold'}}>  
                        {Queries.getTotalForMonth()}
                      </Text>  
                    </View>  
                  </View>
                  <View style={styles.listContainer}>
                  <ListView 
                      dataSource={ds.cloneWithRows(Queries.getTotalPerDay())}
                      renderRow={this.renderRow}
                    />
                  </View>                    
              </View>
          </Container>
        );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  datePriceContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  dateContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  priceContainer: {
    alignItems: 'center',
  },
  priceText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#CDCDCD',
    marginTop: 10,
  },
  categoryNameContainer: {
    marginLeft: 10,
    flex: 9,
  },
  categoryName: {
    fontSize: 17.5,
    fontWeight: 'bold',
  },
  categoryPrice: {
    marginRight: 10,
  }, 
  Caret: {
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  itemName: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    flex: 9,
    fontSize: 17.5,
  }, 
  itemPrice: {
    marginRight: 10,
    fontSize: 17.5,
  }, 
  line: {
    backgroundColor: 'black',
    height: 1,
  }
});

