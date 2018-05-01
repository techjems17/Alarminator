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
import DateTimePicker from 'react-native-modal-datetime-picker';
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

  handlePicker = (time) => {
    this.setState({
      isVisible: false,
      chosenTime: moment(time).format('HH:mm:00')
    });
  }

  showPicker = () => {
    this.setState({
      isVisible: true
    });
  }

  hidePicker = () => {
    this.setState({
      isVisible: false,
    });
  }

  render() {
    return ( 
      <View style = {styles.container}>
        <Text style={
          {
            color: 'yellow',
            fontSize: 60,
            marginBottom: 50,
          }
          }> {this.state.chosenTime} 
        </Text>
        <Image style = {styles.image} source = {require('./assets/clocks.png')}/> 
        <Text style={
          {
            color: 'yellow',
            fontSize: 60,
            marginBottom: 50,
          }
          }> {this.state.time.toString()}
        </Text>
        <TouchableOpacity style={styles.button}
          onPress = {this.showPicker}>
          <Text style = {styles.text}>Show TimePicker</Text>  
        </TouchableOpacity>
        <DateTimePicker 
          cancelTextIOS = {
            'Exit'
          }
          confirmTextIOS = {
            'OK'
          }
          cancelTextStyle = {
            {
              color: 'red',
              fontSize: 20,
            }
          }
          confirmTextStyle = {
            {
              color: 'green',
              fontSize: 20,
            }
          }
          isVisible = {
            this.state.isVisible
          }
          onConfirm = {
            this.handlePicker
          }
          onCancel = {
            this.hidePicker
          }
          mode = {
            'time'
          }
          datePickerModeAndroid = {
            'spinner'
          }
          is24Hour = {
            true
          }/>
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

  button: {
    width: 250,
    height: 50,
    backgroundColor: 'yellow',
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 15
  },

  text: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center'
  }
});

