import React, { Component } from "react"
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
    TextInput
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Expo, { Asset, Audio, FileSystem, Font, Permissions, Video } from 'expo';
import { YellowBox } from 'react-native';
console.disableYellowBox = true;

export default class Puzzles extends Component {
    state = {
        puzzles: [],
        userAnswer: "",
        incorrect: "",
    };

    static navigationOptions = {
        title: 'Solve',
        headerLeft: null,
        headerStyle: {
            backgroundColor: 'green',
        },
        headerTintColor: '#ffff55',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPressed', () => {
            return true;
        });
    }

    _onStop = () => {
        return this.props.navigation.navigate('Home');
    };

    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this._onStop}>
                    <Text style={styles.enter}>Check Solution</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff55',
        alignItems: 'center',
    },
    button: {
        width: 250,
        height: 50,
        backgroundColor: 'green',
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 15
    },
    enter: {
        color: '#ffff55',
        textAlign: 'center',
        fontSize: 18,
    }
});