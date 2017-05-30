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
import { Container, Content, Tab, Tabs,Grid, Col, Toast,Title, List, ListItem,TabHeading, Icon, Text, Header, Fab, Button,Form, Item, Label, Input, Picker, Left,Body} from 'native-base';
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
            inputCategory: '',
            modalVisible: false,
            totalForMonth: 0,
            dataSource: ds.cloneWithRows(Queries.getTotalPerCategory()),
        };
        this.addCategory = this.addCategory.bind(this);
    }
    addCategory() {
        if(this.state.inputCategory == '') {
          alert('Please input a Category');
        } else {
          if(Queries.categoryExists(this.state.inputCategory)) {
            alert('Category already exists');
          } else {
            Queries.addCategory(this.state.inputCategory);
            this.setState({
                modalVisible: !this.state.modalVisible,
            });
            Toast.show({
              text: 'Category Added',
              position: 'bottom',
              buttonText: 'Ok',
              duration: 1000,
            });
          }
        }

    }
  renderRow(rowData) {
    return(
        <TouchableOpacity style={styles.itemContainer} onPress={() => this.navigator.push({
          name: 'perCategory',
          data: rowData,
        }) }>
          <Text style={{
            marginLeft: 10,
            flex: 9,
            fontSize: 17.5,
          }}>
            {rowData.name}
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
                        {Queries.getTotalForMonth()}
                      </Text>  
                    </View>  
                  </View>
                  <View style={styles.listContainer}>
                  <ListView 
                      dataSource={ds.cloneWithRows(Queries.getTotalPerCategory())}
                      renderRow={this.renderRow}
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
                                Add Category
                            </Text>
                            <TextInput
                              onChangeText={(text) => this.setState({inputCategory: text})}
                              placeholder="Category Name"
                            />
                            <Grid>
                                <Col>
                                    <Button light block rounded primary onPress={this.addCategory}>
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

