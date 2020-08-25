import 'react-native-gesture-handler';
import * as React from 'react';

import RootNavigator from './src/navigation/RootNavigator';

class App extends React.Component {
  render(){
    return (
      <RootNavigator />
    );
  }
};

export default App;
