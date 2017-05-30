import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Modal,
  ListView,
  TextInput,
} from 'react-native';
import { Container, Content, Tab, Tabs, Toast,Title, List, ListItem,TabHeading, Icon, Text, Header, Fab, Button,Form, Item, Label, Input, Picker, Left,Body} from 'native-base';
import _ from 'lodash'
import moment from 'moment/src/moment';
import Queries from './Queries'

var now = moment().format('DD MMMM YYYY, dddd');
var dateToday = moment().format('YYYY-MM-DD');
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});
export default class PerDaily extends Component {
  constructor(props) {
        super(props);
        //console.log(this.props.data.name);
        let groupedExpenses = Queries.getExpensesForDaily(this.props.data.name);
        this.state = {
            dateToday: dateToday,
            time: now,
            totalForToday: 0,
            dataSource: ds.cloneWithRowsAndSections(groupedExpenses),
            expenses: null,
        };
    }
    
  renderRow(rowData) {
    return(
        <View style={styles.itemContainer}>
          <Text style={{
            marginLeft: 10,
            flex: 9,
            fontSize: 17.5,
          }}>
            {rowData.description}
          </Text>
          <Text style={{
            marginRight: 10,
            fontSize: 17.5
            }}>
            {rowData.value}
          </Text>
        </View>
    )
  }

  renderSectionHeader(sectionData, sectionID) {
    return(
      <View style={styles.categoryContainer}>
        <View style={styles.categoryNameContainer}>
            <Text style={{
                fontSize: 17.5,
                fontWeight: 'bold'
            }}>    
              {sectionID}    
            </Text>    
        </View>
        <View style={styles.categoryPrice}>
            <Text style={{
                fontSize: 17.5,
                fontWeight: 'bold'
            }}>    
              {sectionData[0].totalPrice}
              &nbsp;
              <Icon active name='ios-arrow-down' style={{fontSize:15}}/>    
            </Text>    
        </View>
      </View>
    )
  }

render() {
      return (
            <Container>
                <View style={styles.mainContainer}>
                    <View style={styles.datePriceContainer}>
                      <View style={styles.dateContainer}>  
                        <Text style={{fontSize:25}}>  
                          {moment(this.props.data.name).format('DD MMMM YYYY, dddd')}  
                        </Text>  
                      </View>  
                      <View style={styles.priceContainer}>  
                        <Text style={{fontSize:50,fontWeight:'bold'}}>  
                            {this.props.data.total}  
                        </Text>  
                      </View>  
                    </View>
                    <View style={styles.listContainer}>
                     <ListView 
                        dataSource={this.state.dataSource}
                        renderSectionHeader={this.renderSectionHeader}
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

