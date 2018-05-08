import React from 'react';
import Puzzles from "./Puzzles"
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
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
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';
import Expo, { Asset, Audio, FileSystem, Font, Permissions, Video } from 'expo';
import { YellowBox } from 'react-native';
console.disableYellowBox = true;

class App extends React.Component {
  static navigationOptions = {
    title: 'Puzzle Alarm',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#ffff55',
    },
    headerTintColor: '#2771c1',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.soundObject = null;
    this.state = {
      isVisible: false,
      time: '',
    };
  }

  getTime() {
    let date;
    let timeType;
    let hour;
    let minutes;
    let seconds;
    let fullTime;

    date = new Date();

    hour = date.getHours();

    if (hour == 0) {
      hour = 12;
    }
    if (hour < 10) {
      hour = '0' + hour.toString();
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
    if (this.state.time != undefined) {
      if (this.state.chosenTime == this.state.time) {
        return this.props.navigation.navigate('Puzzles');
      }
    }

    return ( 
      <View style = {styles.container}>
          <Text style={
            {
              color: '#ffff55',
              fontSize: 60,
              marginTop: 20,
              marginBottom: 20,
            }
            }> {this.state.chosenTime} 
          </Text>
          <Image style = {styles.image} source = {require('./assets/clocks.png')}/> 
          <Text style={
            {
              color: '#ffff55',
              fontSize: 60,
              marginBottom: 20,
            }
            }> {this.state.time.toString()}
          </Text>
          <TouchableOpacity style={styles.button}
            onPress = {this.showPicker}>
            <Text style = {styles.text}>Choose Time</Text>  
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

export default StackNavigator({
  Home: {
    screen: App,
  },

  Puzzles: {
    screen: Puzzles,
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2771c1',
    alignItems: 'center',
  },

  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },

  button: {
    width: 250,
    height: 50,
    backgroundColor: '#ffff55',
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

