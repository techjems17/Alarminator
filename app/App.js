import React from 'react';
import Puzzles from "./Puzzles"
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Text,
  View,
  Button,
  Platform,
  AlertIOS,
  Picker,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  BackHandler,
  Image,
  Vibration,
  VibrationIOS,
} from 'react-native';
import { StackNavigator} from 'react-navigation';
console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style = {styles.image} source = {require('./assets/clocks.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 250,
    height: 250,
    marginBottom: 50,
  },
});
