import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button, Input, Card } from '@ui-kitten/components';
import {Image, View} from 'react-native'
import DocumentPicker from 'react-native-document-picker';
import * as rnfs from 'react-native-fs'



const HomeScreen = () => {
  const [normal, setNormal] = React.useState();
  const [mod, setMod] = React.useState();
  const [sev, setSev] = React.useState();
  const [path, setPath] = React.useState('');
  const [image, setImage] = React.useState('');


  const  onPick = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        // res.type, // mime type
        // res.name,
        // res.size
      );
      setPath(res.uri)
      rnfs.readFile(res.uri, {encoding: 'base64'}).then((content) => {
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
        .catch(err => console.log("Hi",err))
        })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }
  const setLabel = () => {
    let cnt = 0;
    if(parseFloat(normal) > 0.5) cnt +=1;
    if(parseFloat(mod) > 0.5) cnt +=1;
    if(parseFloat(sev) > 0.5) cnt +=1;

    if(cnt==1){
      return "Normal";
    }
    else if(cnt==2){
      return "Moderate"
    }
    else{
      return "Severe"
    }
  }
  return(
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20}}>
      <View style={{ flexDirection:'row', height: 30, justifyContent: 'flex-start', alignItems: 'baseline'}}>
        <Input disabled={true} value={path} placeholder="Upload Image" style={{width: '69%'}}></Input>
        <Button onPress={onPick} style={{marginLeft: 10, width: '25%'}}>Pick</Button>
      </View>
      <View style={{height: 30, margin: 2}} />
      <Layout style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center',}}>
        {image && normal ? 
        <>
          <Card>
              <Image source={{uri: `data:image/png;base64,${image}`}} style={{
                  width: 200,
                  height: 200,
              }}/>
              <Text>Normal Confident: {parseFloat(normal).toFixed(4)}</Text>
              <Text>Moderate Confident: {parseFloat(mod).toFixed(4)}</Text>
              <Text>Severe Confident: {parseFloat(sev).toFixed(4)}</Text>
            
          </Card>
          <Card  status='danger' style={{margin:20}}>
            <Text>{`Result: ${setLabel()}`}</Text>
          </Card>
        </> : null}
        
        
      </Layout>
      
        


    </Layout>
  )
  
};

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <HomeScreen />
  </ApplicationProvider>
);