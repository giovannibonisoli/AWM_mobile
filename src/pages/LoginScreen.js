import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import AuthService from '../services/auth.service';
import { Header, CustomInput, DisabledInput, IconButton } from '../components/smallComponents';

class LoginScreen extends React.Component {
  state = {
    username: "",
    password: ""
  }

  onChangeTextHandler = (field, text) => {
    this.setState({[field]: text});
  }

  alertError = (title, message) => {
    return Alert.alert(
        title,
        message
      );
  };

  handleLogin = async () => {
    if (this.state.username === ""){
      this.alertError("Errore", "Inserire \"Nome Utente\"");
    }
    else if (this.state.password === ""){
      this.alertError("Errore", "Inserire \"Password\"");
    }
    else{
      const res = await AuthService.login(this.state.username, this.state.password);
      if (res === "login successful"){
        this.props.navigation.navigate('Drawer', { username: this.state.username });
      }
      else{
        this.alertError("Login Fallito", "Non risulta nessun utente con queste credenziali");
      }
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.logo}>Acetaia</Text>
        </View>
        <CustomInput field={{field: 'username', name: 'Nome Utente',  type: 'default'}}
                      value={`${this.state.username ? this.state.username : ''}`}
                      onChangeText={this.onChangeTextHandler}/>
        <CustomInput field={{field: 'password', name: 'Password',  type: 'default'}}
                      value={`${this.state.password ? this.state.password : ''}`}
                      onChangeText={this.onChangeTextHandler}/>
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

  inputText:{
    height:50,
    color:"#000",
    fontSize: 17,
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
