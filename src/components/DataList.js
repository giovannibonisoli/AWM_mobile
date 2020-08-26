import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

import { request } from '../helpers/requests';

class Item extends React.Component {


  render() {
    return (
      <View style={styles.item}>
        <Text style={{color:'white'}}>{this.props.item.id}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableOpacity onPress={() => alert(`edit ${JSON.stringify(this.props.item)}`)}>
            <AntDesign name="right" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => alert(`go in details ${JSON.stringify(this.props.item)}`)}>
            <Feather name="edit" size={24} color="white" />

          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert(`delete ${JSON.stringify(this.props.item)}`)}>
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


class DataList extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.items}
          renderItem={({ item }) => <Item item={item}/> }
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
    backgroundColor: '#fff',
  },

  item: {
    elevation: 8,
    //borderRadius: 15,
    justifyContent: 'flex-end',
    backgroundColor: '#575FCF',
    padding: 20,
    //marginBottom: 15
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
