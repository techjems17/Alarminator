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
import Expo, { Asset, Audio, FileSystem, Font, Permissions, Video, KeepAwake } from 'expo';
import { YellowBox } from 'react-native';
console.disableYellowBox = true;

export default class Puzzles extends Component {
    state = {
        puzzles: [],
        userAnswer: "",
        incorrect: "",
        shouldPlay: false,
        isPlaying: false,
        isLoading: true,
        volume: 1.0,
        rate: 1.5,
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
        fetch("https://puzzle-alarm-api.herokuapp.com/puzzles")
            .then(response => {
                return response.json()
            })
            .then(puzzles => {
                var puzzle = puzzles[Math.floor(Math.random() * puzzles.length)]
                this.setState({
                    puzzles: puzzle.puzzle,
                    answers: puzzle.answer,
                });
            })
            .catch(error => {
                console.log(error)
            });
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });
        this.loadSound(true);
        if (this.soundObject != null) {
            this.soundObject.playAsync();
        }
    };

    async loadSound(playing) {
        if (this.soundObject != null) {
            await this.soundObject.unloadAsync();
            this.soundObject.setOnPlaybackStatusUpdate(null);
            this.soundObject = null;
        }

        const source = { uri: 'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3' };
        const initialStatus = {
            shouldPlay: playing,
            rate: this.state.rate,
            volume: this.state.volume,
        };

        const { sound, status } = await Audio.Sound.create(
            source,
            initialStatus,
            this.update
        );
        this.soundObject = sound;
    }

    update = status => {
        if (status.isLoaded) {
            this.setState({
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                rate: status.rate,
                volume: status.volume,
            });
        }
    };

    stopAlarm = () => {
        if (this.soundObject != null) {
            this.soundObject.stopAsync();
        }
    };

    updateAnswer = value => {
        let userInput = value.toLowerCase();
        this.setState({
            userAnswer: userInput,
            incorrect: "",
        })
    };

    checkAnswer = () => {
        if (this.state.userAnswer != undefined) {
            if (this.state.userAnswer == this.state.answers) {
                this.stopAlarm();
                return this.props.navigation.navigate('Home');
            }
            else {
                this.setState({
                    incorrect: "Try Again"
                })
            }
        }
    };


    render() {

        return (
            <View style={styles.container}>
                <KeepAwake />
                <Text style={styles.text}>{this.state.puzzles}</Text>
                <Text style={styles.wrong}>{this.state.incorrect}</Text>
                <TextInput style={styles.input} placeholder="Add answer" value={this.state.userAnswer} onChangeText={this.updateAnswer} />
                <TouchableOpacity style={styles.button} onPress={this.checkAnswer}>
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
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 25,
        marginRight: 10,
        marginLeft: 10,
        justifyContent: 'center',
    },
    wrong: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 25,
        marginTop: 30,
    },
    input: {
        fontSize: 30,
        color: 'black',
        marginLeft: 15,
        marginRight: 15,
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