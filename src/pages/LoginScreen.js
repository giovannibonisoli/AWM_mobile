import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

import { CustomInput} from '../components/smallComponents';
import AuthService from '../services/auth.service';
import { validate, alertError } from '../helpers/FormValidation';



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
    const validation = validate([
                                  {
                                    field: 'username',
                                    name: 'Nome Utente',
                                    type: 'default'
                                  },
                                  {
                                    field: 'password',
                                    name: 'Password',
                                    secure: true
                                  }
                                ], this.state);
    if (validation){
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
        <CustomInput field={{field: 'password', name: 'Password',  secure: true}}
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
