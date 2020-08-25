import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BarrelSetScreen from '../pages/BarrelSetScreen';
import Sidebar from '../components/Sidebar';

const Drawer = createDrawerNavigator();

class DrawerNavigator extends React.Component {
  state = {
    routes:[
        {
            name:"barrelSet",
            title: "Batterie",
            component: BarrelSetScreen,
            icon:"ios-home"
        }
    ]
  }
  render(){
    return (
      <Drawer.Navigator drawerContent={props => <Sidebar {...props} routes={this.state.routes}/>}>
        {this.state.routes.map(route => (
          <Drawer.Screen
            name={route.name}
            component={route.component}
            options={{
              title: route.title
            }}/>
        ))}
      </Drawer.Navigator>
    )
  }
}

export default DrawerNavigator;
