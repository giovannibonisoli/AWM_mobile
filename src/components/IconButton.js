import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

class IconButton extends React.Component {
  render(){
    return (
        <View style={{...this.props.style, flexDirection:"row"}}>
          <TouchableOpacity style={{flexDirection:"row", alignItems: 'center'}} onPress={this.props.onPress}>
            <AntDesign name={this.props.iconName} size={24} color="black" />
            <Text style={styles.buttonText}>{this.props.label}</Text>
          </TouchableOpacity>
        </View>
    )
  }
}

export default IconButton;

const styles = StyleSheet.create({
  buttonText: {
    color: 'black',
    fontWeight: "bold",
    fontSize: 17,
    paddingHorizontal: 10
  }
});
