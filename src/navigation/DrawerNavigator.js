import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BarrelSetScreen from '../pages/BarrelSetScreen';
import Sidebar from '../components/Sidebar';

const Drawer = createDrawerNavigator();

class DrawerNavigator extends React.Component {
  state = {
    routes:[
        {
            field: "barrelSet",
            name: "Batterie e Barili",
            component: BarrelSetScreen,
            icon: require("../static/barrel.png")
        }
    ]
  }
  render(){
    return (
      <Drawer.Navigator drawerContent={props => <Sidebar {...props} username={this.props.route.params.username}
                                                                    routes={this.state.routes}/>}>
        {this.state.routes.map((route, i) => (
          <Drawer.Screen
            key={i}
            name={route.field}
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
