import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import Selector from './components/selector.js';
import Calculator from './components/calculator.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {screen: "home", riskLevel: 0};
    this.onChangeScreen = this.onChangeScreen.bind(this);
  }

  onChangeScreen() {
    this.setState({screen: this.state.screen == "home" ? "calculator" : "home"});
  }

  render() {
    let bodyComponent;
    if(this.state.screen == "home"){
       bodyComponent = <Selector onChangeScreen={this.onChangeScreen}/>;
    } else if (this.state.screen == "calculator"){
      bodyComponent = <Calculator onChangeScreen={this.onChangeScreen}/>;
    }

    return (
      <View style={styles.app}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>Financial Advisor</Text>
        </View>
        <View style={styles.body}>
          {bodyComponent}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#0084bf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 7,
    backgroundColor: 'ghostwhite',
    alignItems: 'center',
  },
  appTitle: {
    color: 'white',
    fontSize: 22,
  },
});
