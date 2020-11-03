import React from 'react';
import {  Layout, Text, Button, Input, Card, Spinner, Modal } from '@ui-kitten/components';
import {Image, View, Dimensions, StyleSheet, Alert} from 'react-native'
import API_URL from '../utils/config'

const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size='small'/>
    </View>
  );

const diagnosis = ({route, navigation}) => {
    const {image} = route.params;
    const [normal, setNormal] = React.useState(null);
    const [mod, setMod] = React.useState(null);
    const [sev, setSev] = React.useState(null);
    const [load, setLoad] = React.useState(false);
    const  [accuracy, setAccuracy] = React.useState(0)
    const  [label, setLabel] = React.useState('')
    const  [status, setStatus] = React.useState('')
    const  [visible, setVisible] = React.useState(false)
    const [email, setEmail] =React.useState('')
    const [name, setName] =React.useState('')
    const { width, height } = Dimensions.get('window')
    
    const calcResult = () => {
        let cnt = 0;
        let acc = 0
        if(parseFloat(normal) > 0.5){ 
            cnt +=1;
            acc += parseFloat(normal)
        }

        if(parseFloat(mod) > 0.5){
            cnt +=1;
            acc += parseFloat(mod)
        }

        if(parseFloat(sev) > 0.5){
            cnt +=1;
            acc += parseFloat(sev)
        }
        setAccuracy(acc/cnt*100)
        console.log(`Acc: ${acc/cnt*100}`)
        if(cnt==1){
            setLabel("Normal");
        }
        else if(cnt==2){
            setLabel("Moderate");
        }
        else{
            setLabel("Severe");
        }
    }
    const Predict = () => {
        // console.log(content)
        const body = {
            image: image
        }
        fetch(`${API_URL}/predict`, {
            method: "post",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            setNormal(json.prediction.Normal)
            setMod(json.prediction.Moderate)
            setSev(json.prediction.Severe)

        })
        .catch(err => console.log("Error",err))
    }

    React.useEffect(()=> {
        Predict()
    },[])

    React.useEffect(() =>{
        calcResult()
    },[sev])

    React.useEffect(() =>{
        if(label == 'Normal') setStatus('success')
        else if(label  == 'Moderate') setStatus('warning')
        else setStatus('danger')
    },[label])

    const sendEmail = () => {
        setLoad(true)
        const body = {
            name: name,
            acc: `${accuracy.toFixed(2)} %`,
            level: label,
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
            Alert.alert("Status","Success !")
            setVisible(false)
        })
        .catch(err => console.log("Error",err))
    }

    return(
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/doctor.png')} style={{position: 'absolute', top: 0, left: 0, width: width, height: height, opacity: 0.5}}/>


            {normal && status ? 
            <>
                <Text category='h1' style={{textAlign:'center', fontWeight:'bold', color:'#2E3131'}}>RESULT:</Text>

                <Card status={status} style={{marginTop: 20}}>
                    <Image source={{uri: `data:image/png;base64,${image}`}} style={{
                        width: parseInt(0.75*width),
                        height: parseInt(0.75*width),
                    }}/>
                    {/* <Text>Normal Confident: {parseFloat(normal).toFixed(4)}</Text>
                    <Text>Moderate Confident: {parseFloat(mod).toFixed(4)}</Text>
                    <Text>Severe Confident: {parseFloat(sev).toFixed(4)}</Text> */}
                    <Text style={{textAlign:'center'}}>Accuracy: {accuracy.toFixed(2)} %</Text>
                    <Text style={{textAlign:'center'}}>{`Result: ${label}`}</Text>

                    
                </Card>
                <Button style={{margin : 30}} onPress={() => setVisible(true)}>Send Report</Button>
            
            </> : <Spinner status='info' size='giant'/>}
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true}>
                    <Input 
                        placeholder="Enter your Email"
                        // value={email}
                        onChangeText={val => setEmail(val)}/>
                    <Input 
                        placeholder="Enter your Name"
                        // value={name}
                        onChangeText={val => setName(val)}/>
                    {
                        load ?
                        <Button style={styles.button} appearance='outline' accessoryLeft={LoadingIndicator}>
                            LOADING
                        </Button> :
                        <Button style={styles.button} onPress={() => {
                            sendEmail()
                            // setVisible(false)
                        }}>Send Report</Button>
                    }
                    
                    


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
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
      },
  });
export default diagnosis;