import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import AuthService from '../services/auth.service';

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
        <Text style={styles.logo}>Acetaia</Text>
        <View style={styles.inputView} >
          <TextInput
             style={styles.inputText}
             placeholder="Nome Utente"
             placeholderTextColor="#003f5c"
             onChangeText={text => this.onChangeTextHandler("username", text)}
           />
        </View>
        <View style={styles.inputView} >
           <TextInput
              style={styles.inputText}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              onChangeText={text => this.onChangeTextHandler("password", text)}
            />
        </View>

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputView:  {
    width:"80%",
    backgroundColor:"white",
    borderWidth: 1,
    borderRadius:15,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },

  logo: {
    fontWeight:"bold",
    fontSize:50,
    color:"#000",
    marginBottom:40
  },

  inputText:{
    height:50,
    color:"#000"
 },

  loginText: {
    color: "white"
  },

  loginBtn:{
    width:"80%",
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
