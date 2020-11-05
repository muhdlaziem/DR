import React from 'react';
import {  Layout, Text, Button, Input, Card, Spinner, Modal } from '@ui-kitten/components';
import {Image, View, Dimensions, StyleSheet, Alert, ScrollView} from 'react-native'
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
            fetch(`${API_URL}/sendbugs`, {
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
            .catch(err => {
                if(err.message === "Network request failed") {
                    Alert.alert("Status", `${err.message}, Please check your internet connection.`)
                }
                else {
                    Alert.alert("Status", "Error has occurred, Please try again later.")
    
                }
                setLoad(false)
                console.log("Error",err.message)
            })
        }
        else {
            Alert.alert('Status', 'Plese insert All Details')
            setLoad(false)
        }
    }
    
    return(
        <ScrollView style={{backgroundColor: 'white'}}>
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor: 'white'}}>
                <Input style={{paddingRight:20, paddingLeft:20, paddingTop:20}} value={email} label={evaProps => <Text {...evaProps} style={{fontWeight:'bold', margin:5}}>Email:</Text>} placeholder='Insert Email' onChangeText={val => setEmail(val)}></Input>
                <Input style={{paddingRight:20, paddingLeft:20, paddingTop:10}} value={name} label={evaProps => <Text {...evaProps} style={{fontWeight:'bold', margin:5}}>Name:</Text>} placeholder='Insert Name' onChangeText={val => setName(val)}></Input>
                <Input style={{paddingRight:20, paddingLeft:20, paddingTop:10}} value={title} label={evaProps => <Text {...evaProps} style={{fontWeight:'bold', margin:5}}>Title:</Text>} placeholder='Insert Title' onChangeText={val => setTitle(val)}></Input>
                <Input style={{paddingRight:20, paddingLeft:20, paddingTop:10}} value={content} label={evaProps => <Text {...evaProps} style={{fontWeight:'bold', margin:5}}>Content:</Text>}textStyle={{ minHeight: 100 }}
                    placeholder='Place your Details Here' onChangeText={val => setContent(val)} multiline={true} allowFontScaling={true}></Input>         
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
        </ScrollView>
        
    )
    
};
const styles = StyleSheet.create({
    
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    
  });
export default reportbug;