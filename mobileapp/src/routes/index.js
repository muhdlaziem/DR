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
          headerLeft: ()=>(<Icon name='menu-outline' style={{width: 40, height:40, margin:10}} fill='#FFF' onPress={() => {navigation.openDrawer()}}/>),
          headerRight: ()=>(<Image source={require('../assets/logo.png')} style={{ width: 40, height:40, margin:10}} />),
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
          headerRight: ()=>(<Image source={require('../assets/logo.png')} style={{ width: 40, height:40, margin:10}} />)
        }}
      />
    </StackNav.Navigator>
)
const CustomDrawerContent=(props)=> {
  const [visible,setVisible] = React.useState(false);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
          <Image source={require('../assets/logo.png')} style={{ width: 100, height:100, margin:10}} />
            <Text style={styles.text}>quickD by NDR</Text>
      </View>
      <DrawerItemList {...props} />
      
      <DrawerItem
        label="Tutorials"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Informations"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Report Bugs"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="About"
        onPress={() => {
          setVisible(true)
          props.navigation.closeDrawer()
        }}
      />
      <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
          >
          <Card disabled={true} style={{margin:50 }}>
              <Text category='h1' style={{textAlign:'center', margin: 10, fontWeight:'bold'}} >About</Text>
              <Image source={require('../assets/logo.png')} style={{ width: 100, height:100, margin:20, alignSelf:'center'}} />
              <Text category='h5' style={{textAlign:'center', margin: 10, fontWeight:'bold'}}>Credits:</Text>
              <Text style={{textAlign:'center', margin: 10}}><Text style={{textAlign:'center', fontWeight:'bold'}}>NDR Teams:</Text> Muhammad Laziem, Muhammad Amiruddin, Aishah Nabilah, Puteri Ameena</Text>
              <Text style={{textAlign:'center', margin: 10}}><Text style={{textAlign:'center', fontWeight:'bold'}}>Mentors:</Text> Assoc. Prof. Dr. Amelia Ritahani Bt. Ismail, Dr. Nurul Ain Binti Yahaya </Text>

              <Button onPress={() => setVisible(false)} style={styles.button,{width: '50%', alignSelf: 'center', margin:20}} size='small' appearance='outline' status='danger'>
                  Close
              </Button>
          </Card>
      </Modal>
    </DrawerContentScrollView>
  );
}
const Navigator = () => (
  <NavigationContainer>
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} initialRouteName='Start Diagnosis'>
      <Drawer.Screen name="Start Diagnosis" component={Diagnosis} />
      
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