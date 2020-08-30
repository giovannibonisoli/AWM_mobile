import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  state = {
    show: false,
    date: new Date(1598051730000)
  }

  onChangeDate = (event, selectedDate) => {
    this.setState({show: false});
    const value = `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`
    this.props.onChangeText(this.props.field.field, value);
  }

  render(){
    if(this.props.field.type ==="select"){
      return (
        <View style={{...this.props.style}}>
          {this.props.labeled ? (<Text style={styles.inputLabel}>{this.props.field.name}</Text>)
                              : (<View></View>)}
          <View style={{...styles.inputView, backgroundColor: 'white'}} >
            <Picker style={{color:"#000", fontSize: 17, padding: 34}}
                          selectedValue={this.props.value}
                          onValueChange={(itemValue, itemIndex) =>
                            this.props.onChangeText(this.props.field.field, itemValue)
                          }>
                          {this.props.field.options.map((option, i) =>
                            (<Picker.Item key={i} label={option.label} value={option.value} />))}
            </Picker>
          </View>
        </View>)
    }
    if (this.props.field.type === "date"){
      return (
        <View style={{...this.props.style}}>
          {this.props.labeled ? (<Text style={styles.inputLabel}>{this.props.field.name}</Text>)
                              : (<View></View>)}
          <TouchableOpacity style={{...styles.inputView, backgroundColor: 'white'}} onPress={() => this.setState({show: true})}>
            <Text style={styles.inputText}>{this.props.value}</Text>
          </TouchableOpacity>
          {this.state.show && <DateTimePicker style={{color:"#000", fontSize: 17, padding: 34}}
                          testID="dateTimePicker"
                          value={this.state.date}
                          mode="date"
                          is24Hour={true}
                          display="default"
                          //onChange={text => this.props.onChangeText(this.props.field.field, text)} />
                          onChange={this.onChangeDate} />}

        </View>
      )
    }
    return (
      <View style={{...this.props.style}}>
        {this.props.labeled ? (<Text style={styles.inputLabel}>{this.props.field.name}</Text>)
                            : (<View></View>)}
        <View style={{...styles.inputView, backgroundColor: 'white'}} >
          <TextInput style={styles.inputText}
                      placeholder={this.props.field.name}
                      placeholderTextColor="#003f5c"
                      //keyboardType={this.props.field.type}
                      secureTextEntry={this.props.field.secure}
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
    return (<View style={{...this.props.style, flexDirection:"row"}}>
              <TouchableOpacity style={{flexDirection:"row", alignItems: 'center'}} onPress={this.props.onPress}>
                <AntDesign name={this.props.iconName} size={24} color="black" />
                <Text style={styles.buttonText}>
                  {this.props.label}
                </Text>
              </TouchableOpacity>
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
  },

  inputLabel: {
    color:"#000",
    fontSize: 17,
    fontWeight: 'bold',
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
