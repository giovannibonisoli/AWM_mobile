import AsyncStorage from '@react-native-community/async-storage';

import { get, post, put, del } from '../helpers/requests';

class AuthService {

  login = async (username, password) => {
    return post("token/", {
      username: username,
      password: password
    }).then(async userInfo => {

      if(userInfo.detail === "No active account found with the given credentials")
        return false;

      try {
        await AsyncStorage.setItem('user', JSON.stringify({
          username: username,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          email: userInfo.email
        }));

        await AsyncStorage.setItem('token', JSON.stringify({
          access: userInfo.access,
          refresh: userInfo.refresh,
          date: new Date()
        }));
      } catch (e) {
        console.log(e);
        return false
      }
      return "login successful";
    })
  }

  logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
    }
    catch(e) {
      console.log(e);
    }
  }

  isLoggedIn = async () => {
    try {
      if(await AsyncStorage.removeItem('user'))
        return true;
      return false;
    }
    catch(e) {
      console.log(e);
    }
  }

  getCurrentUser = async () => {
    if(this.isLoggedIn()){
      try{
        return JSON.parse(await AsyncStorage.getItem('user'));
      }
      catch(e){
        console.error(e)
      }
    }
    return false;
  }

  checkToken = async () => {
    const token = JSON.parse(await AsyncStorage.getItem('token'));

    const startDate = Date.parse(token.date);
    const endDate = new Date();
    if ((endDate - startDate) / 1000 >=  290){
      return post("token/refresh/", {refresh: token.refresh})
      .then(async newToken => {
        token.access = newToken.access;
        try {
          await AsyncStorage.setItem('token', JSON.stringify(token));
        }
        catch (e){
          console.log(e);
        }
      })
    }
  }

  getToken = async () => {
    await this.checkToken();
    try {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      return token.access;
    }
    catch(e){
      console.log(e)
      return false;
    }
  }
}

export default new AuthService();
