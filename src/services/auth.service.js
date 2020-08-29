import AsyncStorage from '@react-native-community/async-storage';

class AuthService {
  login = async (username, password) => {
    return fetch("http://10.0.2.2:8000/api/token/", {
       method: 'POST',
       headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
       body: JSON.stringify({username, password})
    })
    .then(res => res.json())
    .then(data => {
      if(data.access && data.refresh){
        this.storeUser(username, data.access, data.refresh);
        return "login successful";
      }
      return data.detail;
    })
    .catch(err => console.error(err));
  }

  storeUser = async (username, access, refresh) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify({
        name: username,
        token: {
                  access: access,
                  refresh: refresh
                },
        date: new Date()
      }));
    } catch (e) {
      console.error(e);
    }
}

  logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
    }
    catch(e) {
      console.error(e);
    }
  }

  isLoggedIn = async () => {
    if(await AsyncStorage.getItem('user')){
      return true;
    }
    return false;
  }

  getCurrentUser = async () => {
    try{
      return JSON.parse(await AsyncStorage.getItem('user'));
    }
    catch(e){
      console.error(e);
    }
  }

  checkToken = async () => {
    const user = await this.getCurrentUser();

    const startDate = Date.parse(user.date);
    const endDate = new Date();
    if ((endDate - startDate) / 1000 >=  290){
      return fetch("http://10.0.2.2:8000/api/token/refresh/", {
    	   method: 'POST',
      	 headers: {
        		        'Content-Type': 'application/json',
      		          Accept: 'application/json',
      	          },
    		 body: JSON.stringify({refresh: user.token.refresh})
    	})
    	.then(res => {
        if (!res.ok) {
    		    throw new Error(`Error with status ${res.status}`);
    		}
    		return res.json();
    	})
      .then(res => {
        this.storeUser(user.name, res.access, user.token.refresh);
      });

    }
  }
}

export default new AuthService();
