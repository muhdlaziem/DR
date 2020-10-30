import React from 'react';
import {  Layout, Text, Button, Input, Card, Spinner, Modal } from '@ui-kitten/components';
import {Image, View, Dimensions, StyleSheet, Alert} from 'react-native'
import DocumentPicker from 'react-native-document-picker';
import * as rnfs from 'react-native-fs'
import ImagePicker from 'react-native-customized-image-picker';

const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size='small'/>
    </View>
  );

const diagnosis = ({route, navigation}) => {
    const {action} = route.params;
    const [normal, setNormal] = React.useState(null);
    const [mod, setMod] = React.useState(null);
    const [sev, setSev] = React.useState(null);
    const [path, setPath] = React.useState('');
    const [image, setImage] = React.useState('');
    const [load, setLoad] = React.useState(true);
    const  [accuracy, setAccuracy] = React.useState(0)
    const  [label, setLabel] = React.useState('')
    const  [status, setStatus] = React.useState('')
    const  [visible, setVisible] = React.useState(false)
    const [email, setEmail] =React.useState('')
    const [name, setName] =React.useState('')
    const [cameraStat, setCameraStat] = React.useState(false)
    const windowWidth = Dimensions.get('window').width;
    
    const pickSingleAndCamera = () => {
        setCameraStat(true)
        console.log('Opening Camera')
        ImagePicker.openCamera({
            width: 400,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image[0].path);
            setPath(image[0].path)
            console.log('Closing Camera')

        }).catch(e => {
            console.log(e.code);
            Alert.alert('Status',e)
        });
        // console.log('Closing Camera')
    }
    React.useEffect(() => {
        if(cameraStat && path.length === 0) Alert.alert('Status','You did not capture any image !')
        console.log(cameraStat, path.length)
    },[cameraStat])
    const  onPick = async () => {
        // Pick a single file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            console.log(
                res.uri
        );
        setPath(res.uri)
        
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
                Alert.alert('Status', 'You did not choose image !')
                navigation.goBack();
            } else {
                throw err;
            }
        }
    }
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
    const readImageAndPredict = () => {
        rnfs.readFile(path, {encoding: 'base64'}).then((content) => {
        // console.log(content)
        setImage(content)
        const body = {
            image: content
        }
        fetch("http://192.168.43.250:5000/predict", {
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
        })
    }
    
    React.useEffect(() => {
        
        if(action == 'capture') pickSingleAndCamera()
        else if(action == 'pick') onPick()
        // action = ''
        
    },[])

    React.useEffect(()=> {
        if(path) {
            readImageAndPredict()
            setLoad(false)
        }
    },[path])

    React.useEffect(() =>{
        calcResult()
    },[sev])

    React.useEffect(() =>{
        if(label == 'Normal') setStatus('success')
        else if(label  == 'Moderate') setStatus('warning')
        else setStatus('danger')
    },[label])

    // React.useEffect(() =>{
    //     return () => {
    //         setImage('')
    //         setNormal(null)
    //         setStatus('')
    //         setAccuracy(0)
    //         setSev(null)
    //         setMod(null)
    //         setName('')
    //         setEmail('')
    //         setLabel('')
    //         setPath('')
    //     };
    // })
    const sendEmail = () => {
        setLoad(true)
        const body = {
            name: name,
            acc: `${accuracy.toFixed(2)} %`,
            level: label,
            email: email
        }
        console.log(body)
        fetch("http://192.168.43.250:5000/sendreport", {
            method: "post",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            setLoad(false)
            Alert.alert("Status","Success !")
        })
        .catch(err => console.log("Error",err))
    }

    return(
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{ flexDirection:'row', height: 30, justifyContent: 'flex-start', alignItems: 'baseline'}}>
            <Text category='h1'>RESULT:</Text>
        </View>
        <View style={{height: 30, margin: 2}} />
        <Layout style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center',}}>
            {image && normal && status ? 
            <>
            <Card status={status} >
                <Image source={{uri: `data:image/png;base64,${image}`}} style={{
                    width: parseInt(0.75*windowWidth),
                    height: parseInt(0.75*windowWidth),
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