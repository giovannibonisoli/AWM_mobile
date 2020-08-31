import React from 'react';
import { StyleSheet, View, Text, FlatList,
          TouchableOpacity, ScrollView, Dimensions } from 'react-native';

import { request } from '../helpers/requests';

class DataList extends React.Component {

  goToDetail = (action, item) => {
    let params = {}

    if(!this.props.variable){
      params.fields= this.props.fields;
      if(action === 'add'){
        params.item = undefined;
        params.action = this.props.addAction.bind(this);
        params.title = `Aggiungi ${this.props.objectName}`;
      }
      else{
        params.item = item;
        params.action = this.props.updateDeleteAction.bind(this);
        params.details = this.props.details;
        params.title = `Modifica ${this.props.objectName}`;
      }
      this.props.navigate('detail', params);
    }
    else{
      if(action === 'add'){
        params.item = undefined;
        params.action = this.props.addAction.bind(this);
        params.title = "Aggiungi";
      }
      else{
        params.item = item;
        params.action = this.props.updateDeleteAction.bind(this);
        params.details = this.props.details;
        params.title = `Modifica`;
      }
      this.props.navigate('operationDetail', params);
    }
  }

  render() {
    let numFields = this.props.fields.length;
    if(numFields > 3)
      numFields = 3;

    let tdSpace = (Math.round(Dimensions.get('window').width) - 20) / numFields;

    return (
      <View style={styles.container}>
        <ScrollView horizontal>
        <View>
        <View style={styles.tableRow}>
          {this.props.fields.map((field, i) => (
            <Text key={i} style={{...styles.tH, width: tdSpace}}>{field.name}</Text>
          ))}
        </View>
        <View style={styles.rowDivider}></View>
        <FlatList
          data={this.props.items}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity style={styles.tableRow} onPress={() => this.goToDetail('edit', item)}>
                {this.props.fields.map((field, i) => (
                  <Text key={i} style={{color: 'black', width: tdSpace, padding: 20, fontSize: 17}}>
                      {item[field.field]}
                  </Text>
                ))}
              </TouchableOpacity>
              <View style={styles.rowDivider}></View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
        </View>
        </ScrollView>
        <TouchableOpacity onPress={() => this.goToDetail('add')} style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10
  },

  tableRow: {
    backgroundColor: '#fff',
    flexDirection:"row",
    alignItems:"center"
  },

  tH: {
    fontWeight:"bold",
    color: 'black',
    padding: 20,
    fontSize: 17
  },

  rowDivider:{
    height: 1,
    backgroundColor: "#DCDCDC"
  },

  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#00cc00',
    borderRadius: 30,
  },

  fabIcon: {
    fontSize: 40,
    color: 'white'
  }
});

export default DataList;
