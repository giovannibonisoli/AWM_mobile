import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';

export class Header extends React.Component {
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

export class CustomInput extends React.Component {
  render(){
    return (
      <View>
        <Text style={styles.inputLabel}>{this.props.field.name}</Text>
        <View style={{...styles.inputView, backgroundColor: 'white'}} >
          <TextInput style={styles.inputText}
                      placeholder={this.props.field.name}
                      placeholderTextColor="#003f5c"
                      keyboardType={this.props.field.type}
                      value={this.props.value}
                      onChangeText={text => this.props.onChangeText(this.props.field.field, text)} />
        </View>
      </View>
    )}
}

export class DisabledInput extends React.Component {
  render(){
    return (
      <View>
        <Text style={styles.inputLabel}>{this.props.name}</Text>
        <View style={{...styles.inputView, backgroundColor: 'lightgray'}} >
          <Text style={styles.inputText}>{this.props.value}</Text>
        </View>
      </View>
    )}
}

export class IconButton extends React.Component {
  render(){
    return (
      <TouchableOpacity style={{flexDirection:"row", padding: 20}}
                          onPress={this.props.onPress}>
        <AntDesign name={this.props.iconName} size={24} color="black" />
        <Text style={styles.buttonText}>
          {this.props.label}
        </Text>
      </TouchableOpacity>
    )}
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
  },

  inputLabel: {
    color:"#000",
    fontSize: 17,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10
  },

  inputView:  {
    width: "100%",
    borderWidth: 1,
    borderRadius:15,
    justifyContent:"center",
  },

  inputText: {
    color:"#000",
    fontSize: 17,
    padding: 20
  },

  buttonText: {
    color: 'black',
    fontWeight: "bold",
    fontSize: 17,
    paddingHorizontal: 10
  }
});
