import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Header extends React.Component {
  render(){
    return (
        <View style={styles.header}>
          <TouchableOpacity onPress={this.props.openDrawer}>
            <Ionicons name="ios-menu" size={32} />
          </TouchableOpacity>
          <Text style={{fontWeight:"bold"}}>{this.props.name}</Text>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  header: {
    width:"100%",
    height:60,
    backgroundColor: '#fff',
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20
 }
});

export default Header;
