import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import diagnosis from '../components/diagnosis';
import home from '../components/home';

const StackNav = createStackNavigator();
const Navigator = () => (
  <NavigationContainer>
    <StackNav.Navigator initialRouteName="D-CNN Retina">
      <StackNav.Screen
        //   options={{headerShown: false}}
        name="D-CNN Retina"
        component={home}
      />
      <StackNav.Screen
        //   options={{headerShown: false}}
        name="Diagnosis"
        component={diagnosis}
      />
    </StackNav.Navigator>
  </NavigationContainer>
);

export default Navigator;