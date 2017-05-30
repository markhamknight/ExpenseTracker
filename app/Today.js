import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Modal,
  ListView,
  TextInput,
} from 'react-native';
import { Container, Content, Tab, Tabs,Grid, Col, Toast,Title, List, ListItem,TabHeading, Icon, Text, Header, Fab, Button,Form, Item, Label, Input, Picker, Left,Body} from 'native-base';
import _ from 'lodash'
import moment from 'moment/src/moment';
import Queries from './Queries'

var now = moment().format('DD MMMM YYYY, dddd');
var dateToday = moment().format('YYYY-MM-DD');
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});
export default class Today extends Component {
  constructor(props) {
        super(props);
        let groupedExpenses = Queries.getAllExpenses();
        this.state = {
            active: false,
            modalVisible: false,
            inputValue: '',
            inputDescription: '',
            inputCategory: 'Food',
            dateToday: dateToday,
            time: now,
            totalForToday: 0,
            dataSource: ds.cloneWithRowsAndSections(groupedExpenses),
            expenses: null,
        };
        this.addExpense = this.addExpense.bind(this);
    }

    componentWillMount() {
        let groupedExpenses = Queries.getAllExpenses();
        this.setState({
            dataSource: ds.cloneWithRowsAndSections(groupedExpenses),
        });
    }
    addExpense() {
        let data = {
            value: this.state.inputValue,
            category: this.state.inputCategory,
            description: this.state.inputDescription,
        }
        if(this.state.inputValue == '' || isNaN(this.state.inputValue) || this.state.inputValue == 0) {
            alert('Please enter valid Price');
        } else if (this.state.inputDescription == '') {
            alert('Please enter a Description');
        } else if (this.state.inputDescription == '' && this.state.inputValue == '') {
            alert('Please enter a Description and Price');
        } else {
            Queries.addExpense(data);
            this.setState({
                modalVisible: !this.state.modalVisible,
                dataSource: ds.cloneWithRowsAndSections(Queries.getAllExpenses()),
            });
            Toast.show({
              text: 'Expense Added',
              position: 'bottom',
              buttonText: 'Ok',
              duration: 1000,
            });
        }
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
                        <Text style={{fontSize:20}}>  
                          {this.state.time}  
                        </Text>  
                      </View>  
                      <View style={styles.priceContainer}>  
                        <Text style={{fontSize:50,fontWeight:'bold'}}>  
                          {Queries.getTotalForToday()}
                        </Text>  
                      </View>  
                    </View>
                    <View style={styles.listContainer}>
                     <ListView 
                        dataSource={this.state.dataSource}
                        renderSectionHeader={this.renderSectionHeader}
                        renderRow={this.renderRow}
                        enableEmptySections={false}
                      />
                    </View>
                    
                </View>
                <Fab
                    active={this.state.active}
                    direction="up"
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}>
                  <Icon name="add" />
                </Fab>
                <Modal
                  animationType={"slide"}
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {alert("Modal has been closed.")}}
                  >
                    <View style={{marginTop: 22}}>
                        <View style={{paddingLeft:15,paddingRight:15}}>
                            <Text style={{fontSize:30,fontWeight:'bold',textAlign:'center'}}>
                                Add Expense
                            </Text>
                            <TextInput
                              onChangeText={(text) => this.setState({inputValue: text})}
                              placeholder="Price"
                              keyboardType = 'numeric'
                            />
                            <TextInput
                              onChangeText={(text) => this.setState({inputDescription: text})}
                              placeholder="Description"
                            />
                            <Picker
                              mode="dropdown"
                              onValueChange={(value) => this.setState({inputCategory: value})}
                              selectedValue={(this.state && this.state.inputCategory) || 'Food'}
                              >
                                {Queries.getAllCategories().map((item, index) => {
                                  return <Picker.Item label={item.name} value={item.name} key={index}/>
                                })}
                            </Picker>
                            <Grid>
                                <Col>
                                    <Button light block rounded primary onPress={this.addExpense}>
                                    <Text>Add</Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button light block rounded danger onPress={() => this.setState({
                                        modalVisible: !this.state.modalVisible,
                                    })}>
                                    <Text>Cancel</Text>
                                    </Button>
                                </Col>
                            </Grid>
                        </View>
                    </View>
                </Modal>
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

