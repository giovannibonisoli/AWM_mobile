import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import { request } from '../helpers/requests';

class DataList extends React.Component {

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
              <TouchableOpacity style={styles.tableRow} onPress={() => {
                this.props.navigate('detail', {
                                                fields: this.props.fields,
                                                item: item,
                                                title: "Batteria",
                                                action: this.props.updateAction
                                              });
              }}>
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
        <TouchableOpacity onPress={() => alert('FAB clicked')} style={styles.fab}>
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
