import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

import CustomInput from '../components/CustomInput';
import AuthService from '../services/auth.service';
import { validate, alertError } from '../helpers/FormValidation';


class LoginScreen extends React.Component {
  state = {
    username: "",
    password: ""
  }

  fields = [
            {
              field: 'username',
              name: 'Nome Utente',
              type: 'text'
            },
            {
              field: 'password',
              name: 'Password',
              type: 'password'
            }
          ]

  onChangeTextHandler = (field, text) => {
    this.setState({[field]: text});
  }

  alertError = (title, message) => {
    return Alert.alert(
        title,
        message
      );
  };

  handleLogin = () => {
    const validation = validate(this.fields, this.state);
    if (validation){
      AuthService.login(this.state.username, this.state.password).then(res => {
        if (res === "login successful"){
          AuthService.getCurrentUser().then(user => {
            this.props.navigation.navigate('Drawer', {user: user});
          })
        }
        else
          this.alertError("Login Fallito", "Non risulta nessun utente con queste credenziali");
        })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.logo}>Acetaia</Text>
        </View>
        {this.fields.map((field, i) => (
          <CustomInput key={i}
                        style={{paddingTop: 20}}
                        field={field}
                        value={`${this.state[field.field] ? this.state[field.field] : ''}`}
                        onChangeText={this.onChangeTextHandler} labeled/>
        ))}
        <TouchableOpacity style={styles.loginBtn} onPress={this.handleLogin}>
          <Text style={styles.loginText}>Invia</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },

  logo: {
    fontWeight:"bold",
    fontSize: 50,
    color:"#000",
  },

  loginText: {
    color: "white",
    fontSize: 17
  },

  loginBtn:{
    width:"100%",
    color: "#fff",
    backgroundColor:"#3366ff",
    borderRadius: 15,
    height: 50,
    alignItems:"center",
    justifyContent:"center",
    marginTop: 40,
    marginBottom: 10
  },
});

export default LoginScreen;
