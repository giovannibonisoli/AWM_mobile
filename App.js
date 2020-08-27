import 'react-native-gesture-handler';
import * as React from 'react';
import { YellowBox } from 'react-native';

import RootNavigator from './src/navigation/RootNavigator';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

class App extends React.Component {
  render(){
    return (
      <RootNavigator />
    );
  }
};

export default App;
