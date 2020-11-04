import React from 'react';
import {  Layout, Text, Button, Modal, Card } from '@ui-kitten/components';
import { StyleSheet, Image, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';

// import {image} from '../assets/doctor.png'
const home = ({navigation}) => {
    // const [visible, setVisible] = React.useState(false);
    const { width, height } = Dimensions.get('window')
    const [visible, setVisible] = React.useState(false)
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
            {/* <Image source={require('../assets/doctor.png')} style={{position: 'absolute', top: 0, left: 0, width: width, height: height, resizeMode:'cover', opacity: 0.5}}/> */}
            
           
            <Text category='h2' style={{textAlign:'center', fontWeight:'bold', color:'#2E3131'}}>Welcome to</Text>
            <Text category='h1' style={{textAlign:'center', fontWeight:'bold', color:'#ee4c50',marginBottom:75, fontSize:70}}>quickD</Text>
            <Button style={styles.button} size='giant' onPress={pickSingleAndCamera} >START DIAGNOSIS</Button>
            <Button style={styles.button} size='tiny' appearance='outline' status='info' onPress={() =>setVisible(true)} >How this application works ?</Button>
            <Text style={{textAlign:'center', marginTop:20}}>&reg; NDR, 2020</Text>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true} style={{margin:40}}>
                    <Text style={{textAlign:'center', margin: 10, fontWeight:'bold'}} category='h6'>How this application works ?</Text>
                    <Text style={{margin:10}}>This application is predicting Diabetic Retinopathy stage based on retinal image by using Artificial Intelligence(AI).</Text>
                

                    <Button onPress={() => setVisible(false)} style={styles.button,{width: '50%', alignSelf: 'center', margin:20}} size='small' appearance='outline' status='danger'>
                        Close
                    </Button>
                </Card>
            </Modal>
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