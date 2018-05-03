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
        shouldPlay: true,
        isPlaying: true,
        isLoading: false,
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
        fetch("http://localhost:3000/puzzles")
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
        // Audio.setAudioModeAsync({
        //     allowsRecordingIOS: false,
        //     interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        //     playsInSilentModeIOS: true,
        //     shouldDuckAndroid: true,
        //     interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        // });
        // this._loadNewPlaybackInstance(false);
    }

    // async _loadNewPlaybackInstance(playing) {
    //     if (this.playbackInstance != null) {
    //         await this.playbackInstance.unloadAsync();
    //         this.playbackInstance.setOnPlaybackStatusUpdate(null);
    //         this.playbackInstance = null;
    //     }

    //     const source = { uri: 'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3' };
    //     const initialStatus = {
    //         shouldPlay: playing,
    //         rate: this.state.rate,
    //         volume: this.state.volume,
    //     };

    //     const { sound, status } = await Audio.Sound.create(
    //         source,
    //         initialStatus,
    //         this._onPlaybackStatusUpdate
    //     );
    //     this.playbackInstance = sound;
    // }

    // _onPlaybackStatusUpdate = status => {
    //     if (status.isLoaded) {
    //         this.setState({
    //             shouldPlay: status.shouldPlay,
    //             isPlaying: status.isPlaying,
    //             rate: status.rate,
    //             volume: status.volume,
    //         });
    //         if (status.didJustFinish) {
    //             this._updatePlaybackInstanceForIndex(true);
    //         }
    //     }
    // };

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