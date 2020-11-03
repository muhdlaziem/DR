import React from 'react';
import {  Layout, Text, Button, Modal, Card } from '@ui-kitten/components';
import { StyleSheet, Image, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';

// import {image} from '../assets/doctor.png'
const home = ({navigation}) => {
    // const [visible, setVisible] = React.useState(false);
    const { width, height } = Dimensions.get('window')

    const pickSingleAndCamera = () => {
          
          /**
           * The first arg is the options object for customization (it can also be null or omitted for default options),
           * The second arg is the callback which sends object: response (more info in the API Reference)
           */
          ImagePicker.showImagePicker((response) => {
            // console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
                // const source = { uri: response.uri };
            
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                // console.log(response.data)
                navigation.navigate('Diagnosis', {
                    image: response.data,
                });
                console.log("Navigating to Diagnosis")
            }
          });
    }

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} > 
                <Image source={require('../assets/doctor.png')} style={{position: 'absolute', top: 0, left: 0, width: width, height: height, resizeMode:'cover', opacity: 0.5}}/>
            
            {/* <ImageBackground source={require('../assets/doctor.png')} style={{
                flex: 1,
                resizeMode: "cover",
                justifyContent: 'center',
                alignItems: 'center'}}>
                <Card style={{margin:40, display:'flex', flexDirection:'row', alignItems:'space-between', flexWrap:'wrap'}}> */}
                    <Text category='h2' style={{textAlign:'center', fontWeight:'bold', color:'#2E3131'}}>Welcome to quickD</Text>
                    <Button style={styles.button} size='giant' onPress={pickSingleAndCamera} >START DIAGNOSIS</Button>
                    <Button style={styles.button} size='tiny' appearance='outline' status='info' onPress={() => {}} >Click Here to See Tutorial</Button>
                {/* </Card>

            </ImageBackground>
            <Button>a</Button> */}
        </Layout>

    )
};
const styles = StyleSheet.create({
    container: {
      minHeight: 192,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    button: {
        margin : 10,
        
    }
  });

export default home;