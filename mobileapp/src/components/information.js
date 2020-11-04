import React from 'react';
import {  Layout, Text, Button, Input, Card, Spinner, Modal } from '@ui-kitten/components';
import {Image, View, Dimensions, StyleSheet, Alert, ScrollView} from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component';

const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size='small'/>
    </View>
  );

const information = ({route, navigation}) => {
    const { width, height } = Dimensions.get('window')
    
    const tableHead = ['Level', 'Details']
    const tableData = [
        ['Normal','No abnormalities'],
        ['Mild','Microaneurysms'],
        ['Moderate', 'More that just Microaneurysms but less that severe'],
        ['Severe','- More than 20 intraretinal haemorrhages in each 4 quadrants\n- Definite venous beading in 2 or more quadrants\n- Prominent intraretinal microvascular abnormalities in 1 or more quadrants and no sign of proliferative retinopathy'],
        ['Proliferative','- Neovascularisation\n- Vitreous/preretinal haemorrhage'],
    ];
   
    return(
        <ScrollView >
            <Layout style={{ backgroundColor: 'white'}}>

                <Card style={{ flex:1}}> 
                    <Image source={require('../assets/retina.png')} style={{ width: width*0.75, height: height*0.3, resizeMode: 'center', alignSelf:'center'}}/>

                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text} flexArr={[1, 2]}/>
                        <Rows data={tableData} textStyle={styles.text} flexArr={[1, 2]}/>
                    </Table>
                    <Text style={{textAlign:'center', marginTop:20}}>Source: MALAYSIAN SOCIETY OF OPTHAMOLOGY</Text>

                    <Text style={{textAlign:'center', marginTop:20}}>&reg; NDR, 2020</Text>

                </Card>
                

            </Layout>
        </ScrollView>
        
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
      head: { height: 40, backgroundColor: '#f1f8ff' },
      text: { margin: 6 }
  });
export default information;