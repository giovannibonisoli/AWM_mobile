import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

import { request } from '../helpers/requests';

class Item extends React.Component {

  render() {
    return (
      <View>
        <TouchableOpacity style={styles.tableRow} onPress={() => alert(`go in details ${JSON.stringify(this.props.item)}`)}>
          {this.props.fields.map((field, i) => (
            <Text key={i} style={{color: 'black', width: this.props.tdSpace, padding: 20}}>
                {this.props.item[field.field]}
            </Text>
          ))}

          {/*<TouchableOpacity onPress={() => alert(`edit ${JSON.stringify(this.props.item)}`)}>
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{width: '5%'}} onPress={() => alert(`delete ${JSON.stringify(this.props.item)}`)}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{width: '5%'}} onPress={() => alert(`go in details ${JSON.stringify(this.props.item)}`)}>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>*/}
        </TouchableOpacity>
        <View style={styles.rowDivider}></View>
      </View>
    )
  }
}

class DataList extends React.Component {

  render() {
    const tdSpace = `${Math.floor(100 / this.props.fields.length)}%`;
    return (
      <View style={styles.container}>
        <View style={styles.tableRow}>
          {this.props.fields.map((field, i) => (
            <Text key={i} style={{fontWeight:"bold", color: 'black', width: tdSpace, padding: 20}}>{field.name}</Text>
          ))}
        </View>
        <View style={styles.rowDivider}></View>
        <FlatList
          data={this.props.items}
          renderItem={({ item }) => <Item item={item} fields={this.props.fields} tdSpace={tdSpace}/> }
          keyExtractor={item => item.id}
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
    height: 60,
    backgroundColor: '#fff',
    flexDirection:"row",
    alignItems:"center"
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
