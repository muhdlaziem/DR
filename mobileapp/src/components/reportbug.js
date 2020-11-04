import React from 'react';
import {  Layout, Text, Button, Input, Card, Spinner, Modal } from '@ui-kitten/components';
import {Image, View, Dimensions, StyleSheet, Alert} from 'react-native'
import API_URL from '../utils/config'

const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size='small'/>
    </View>
  );

const reportbug = ({route, navigation}) => {
    const[email, setEmail] = React.useState('')
    const[title, setTitle] = React.useState('')
    const[name, setName] = React.useState('')
    const[content, setContent] = React.useState('')
    const [load, setLoad] = React.useState(false);

    const sendEmail = () => {
        setLoad(true)
        if(email && title && name && content){
            const body = {
                name: name,
                title: title,
                content: content,
                email: email
            }
            console.log(body)
            fetch(`${API_URL}/sendreport`, {
                method: "post",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" }
            })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                setLoad(false)
                Alert.alert("Status","Thank you for submitting Report!")
            })
            .catch(err => console.log("Error",err))
        }
        else {
            Alert.alert('Status', 'Plese insert All Details')
            setLoad(false)
        }
    }

    return(
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Input style={{padding:20}} label="Email:" placeholder='Insert Email' onChangeText={val => setEmail(val)}></Input>
            <Input style={{padding:20}}label="Name:" placeholder='Insert Name' onChangeText={val => setName(val)}></Input>
            <Input style={{padding:20}}label="Title:" placeholder='Insert Title' onChangeText={val => setTitle(val)}></Input>
            <Input style={{padding:20}}label="Content:" textStyle={{ minHeight: 100 }}
                placeholder='Place your Details Here' onChangeText={val => setContent(val)}></Input>         
            {
                load ?
                <Button style={{margin:10}} appearance='outline' accessoryLeft={LoadingIndicator}>
                    LOADING
                </Button> :
                <Button style={{margin:10}} onPress={() => {
                    sendEmail()
                    // setVisible(false)
                }}>Submit Report</Button>
            }      

        </Layout>
    )
    
};
const styles = StyleSheet.create({
    
  });
export default reportbug;