import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {View, Image, StyleSheet, Dimensions} from 'react-native'
import {Icon, Modal, Card, Button,Text} from '@ui-kitten/components'

import diagnosis from '../components/diagnosis';
import home from '../components/home';
import reportbug from '../components/reportbug';
import about from '../components/about';
import information from '../components/information';



const StackNav = createStackNavigator();
const Drawer = createDrawerNavigator();
const { width, height } = Dimensions.get('window')

const Diagnosis = ({navigation}) => (
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
          headerLeft: ()=>(<Icon name='menu-outline' style={{width: 30, height:30, margin:10}} fill='#FFF' onPress={() => {navigation.openDrawer()}}/>),
          headerRight: ()=>(<Image source={require('../assets/logo.png')} style={{ width: 30, height:30, margin:10}} />),
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
            textAlign: 'center'

          },
          headerRight: ()=>(<Image source={require('../assets/logo.png')} style={{ width: 30, height:30, margin:10}} />)
        }}
      />
    </StackNav.Navigator>
)

const ReportBugNav = ({navigation}) => (
  <StackNav.Navigator initialRouteName="Report Bugs">
      <StackNav.Screen
        //   options={{headerShown: false}}
        name="Report Bugs"
        component={reportbug}
        options={{
          title: 'Report Bugs',
          headerStyle: {
            backgroundColor: '#ee4c50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center'

          },
          headerLeft: ()=>(<Icon name='menu-outline' style={{width: 30, height:30, margin:10}} fill='#FFF' onPress={() => {navigation.openDrawer()}}/>),
          headerRight: ()=>(<Image source={require('../assets/logo.png')} style={{ width: 30, height:30, margin:10}} />),
        }}
      />
    </StackNav.Navigator>
)

const aboutNav = ({navigation}) => (
  <StackNav.Navigator initialRouteName="Report Bugs">
      <StackNav.Screen
        //   options={{headerShown: false}}
        name="About"
        component={about}
        options={{
          title: 'About Us',
          headerStyle: {
            backgroundColor: '#ee4c50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center'

          },
          headerLeft: ()=>(<Icon name='menu-outline' style={{width: 30, height:30, margin:10}} fill='#FFF' onPress={() => {navigation.openDrawer()}}/>),
          headerRight: ()=>(<Image source={require('../assets/logo.png')} style={{ width: 30, height:30, margin:10}} />),
        }}
      />
    </StackNav.Navigator>
)

const infoNav = ({navigation}) => (
  <StackNav.Navigator initialRouteName="Informations">
      <StackNav.Screen
        //   options={{headerShown: false}}
        name="Informations"
        component={information}
        options={{
          title: 'Informations',
          headerStyle: {
            backgroundColor: '#ee4c50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center'

          },
          headerLeft: ()=>(<Icon name='menu-outline' style={{width: 30, height:30, margin:10}} fill='#FFF' onPress={() => {navigation.openDrawer()}}/>),
          headerRight: ()=>(<Image source={require('../assets/logo.png')} style={{ width: 30, height:30, margin:10}} />),
        }}
      />
    </StackNav.Navigator>
)
const CustomDrawerContent=(props)=> {

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
          <Image source={require('../assets/logo.png')} style={{ width: 100, height:100, margin:10}} />
            <Text style={styles.text}>quickD by NDR</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
const Navigator = () => (
  <NavigationContainer>
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} initialRouteName='Start Diagnosis'>
      <Drawer.Screen name="Start Diagnosis" component={Diagnosis} />
      <Drawer.Screen name="Informations" component={infoNav} />
      <Drawer.Screen name="Report Bugs" component={ReportBugNav}/>
      <Drawer.Screen name="About Us" component={aboutNav}/>

      
    </Drawer.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  
  headerContainer: {
      height: parseInt(height*0.25),
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
  },
  text: {
    // margin : 20
    fontWeight: 'bold'
  },
  button: {
    margin : 10
},
backdrop: {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
});
export default Navigator;