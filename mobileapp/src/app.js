import React from 'react';
import Navigator from './routes/index';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {StatusBar} from 'react-native'

export default () => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light }}>
      <StatusBar backgroundColor ="#ee4c50"/>
      <Navigator />
    </ApplicationProvider>
  </React.Fragment>
);