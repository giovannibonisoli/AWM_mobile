import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Header extends React.Component {
  render(){
    return (
        <View style={styles.header}>
          <TouchableOpacity onPress={this.props.openDrawer}>
            <Ionicons name="ios-menu" size={32} />
          </TouchableOpacity>
          <Text style={{fontWeight:"bold", fontSize: 17}}>{this.props.name}</Text>
        </View>
      )
    }
}

export default Header;

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
})
