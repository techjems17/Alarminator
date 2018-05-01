import React from 'react';
// import Puzzles from "./Puzzles"
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
// import { StackNavigator} from 'react-navigation';
// import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { YellowBox } from 'react-native';
console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      time: ''
    }
  }

  getTime() {
    var date;
    var timeType;
    var hour;
    var minutes;
    var seconds;
    var fullTime;

    date = new Date();

    hour = date.getHours();

    if (hour == 0) {
      hour = 12;
    }

    minutes = date.getMinutes();

    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }

    seconds = date.getSeconds();

    if (seconds < 10) {
      seconds = '0' + seconds.toString();
    }

    fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString();

    this.setState({
      time: fullTime
    });
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPressed', () => {
      return true;
    });
    this.Clock = setInterval(() => this.getTime(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.Clock);
  }

  render() {
    return ( 
      <View style = {styles.container}>
        {/* <Text style={
        {
          color: 'yellow',
          fontSize: 60,
          marginBottom: 50,
        }
        } > {this.state.chosenTime} 
        </Text> */}
        <Image style = {styles.image} source = {require('./assets/clocks.png')}/> 
        <Text style={
        {
          color: 'yellow',
          fontSize: 60,
          marginBottom: 50,
        }
        }> {this.state.time.toString()} 
        </Text>
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

