import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';


import diagnosis from '../components/diagnosis';
import home from '../components/home';

const StackNav = createStackNavigator();
const Drawer = createDrawerNavigator();
const Diagnosis = () => (
  <StackNav.Navigator initialRouteName="D-CNN Retina">
      <StackNav.Screen
        //   options={{headerShown: false}}
        name="D-CNN Retina"
        component={home}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#ee4c50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center'

          },
        }}
      />
      <StackNav.Screen
        //   options={{headerShown: false}}
        name="Diagnosis"
        component={diagnosis}
        options={{
          title: 'Diagnosis',
          headerStyle: {
            backgroundColor: '#ee4c50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // textAlign: 'center'

          },
        }}
      />
    </StackNav.Navigator>
)
const Navigator = () => (
  <NavigationContainer>
    <Drawer.Navigator >
      <Drawer.Screen name="Start Diagnosis" component={Diagnosis} />
      
    </Drawer.Navigator>
  </NavigationContainer>
);

export default Navigator;