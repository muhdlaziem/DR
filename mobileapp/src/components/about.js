import React from 'react';
import {  Layout, Text, Button, Input, Card, Spinner, Modal } from '@ui-kitten/components';
import {Image, View, Dimensions, StyleSheet, Alert} from 'react-native'



const about = ({route, navigation}) => {
    

    return(
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.0001)',}}>
            <Card disabled={true} style={{margin:50 }}>
              <Text category='h1' style={{textAlign:'center', margin: 10, fontWeight:'bold'}} >About</Text>
              <Image source={require('../assets/logo.png')} style={{ width: 100, height:100, margin:20, alignSelf:'center'}} />
              <Text category='h5' style={{textAlign:'center', margin: 10, fontWeight:'bold'}}>Credits:</Text>
              <Text style={{textAlign:'center', margin: 10}}><Text style={{textAlign:'center', fontWeight:'bold'}}>NDR Teams:</Text> Muhammad Laziem, Muhammad Amiruddin, Aishah Nabilah, Puteri Ameena</Text>
              <Text style={{textAlign:'center', margin: 10}}><Text style={{textAlign:'center', fontWeight:'bold'}}>Mentors:</Text> Assoc. Prof. Dr. Amelia Ritahani Bt. Ismail, Dr. Nurul Ain Binti Yahaya </Text>

              {/* <Button onPress={() => setVisible(false)} style={styles.button,{width: '50%', alignSelf: 'center', margin:20}} size='small' appearance='outline' status='danger'>
                  Close
              </Button> */}
          </Card>
        </Layout>
    )
    
};
const styles = StyleSheet.create({
    
  });
export default about;