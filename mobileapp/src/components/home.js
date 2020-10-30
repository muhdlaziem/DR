import React from 'react';
import {  Layout, Text, Button, Modal, Card } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
const home = ({navigation}) => {
    const [visible, setVisible] = React.useState(false);

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to D-CNN Retina</Text>
            <Button style={styles.button} size='giant' onPress={() => setVisible(true)}>START DIAGNOSIS</Button>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true}>
                    <Button onPress={() => {
                        setVisible(false)
                        navigation.navigate('Diagnosis', {
                            action: 'pick',
                        });
                    }} style={styles.button}>
                        Pick Image
                    </Button>

                    <Button onPress={() => {
                        setVisible(false)
                        navigation.navigate('Diagnosis', {
                            action: 'capture',
                        });
                    }} style={styles.button}>
                        Capture Image
                    </Button>

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
        margin : 10
    }
  });

export default home;