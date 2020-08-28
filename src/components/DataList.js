import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import { request } from '../helpers/requests';

class DataList extends React.Component {

  goToDetail = (action, item) => {
    let params = {
      fields: this.props.fields
    }

    if(action === 'add'){
      params.item = undefined;
      params.title = `Aggiungi ${this.props.objectName}`;
      params.action = this.props.addAction.bind(this);
    }
    else{
      params.item = item;
      params.title = `Modifica ${this.props.objectName}`;
      params.action = this.props.updateDeleteAction.bind(this);
      params.item = item;
      params.details = this.props.details;
    }
    this.props.navigate('detail', params);
  }

  render() {
    const tdSpace = `${Math.floor(100 / this.props.fields.length)}%`;
    return (
      <View style={styles.container}>
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
          keyExtractor={item => item.id}
        />
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
    width:"100%",
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
    width: "100%",
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
