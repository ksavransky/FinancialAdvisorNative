import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import Selector from './components/selector.js';
import Calculator from './components/calculator.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {screen: "home", riskLevel: 0};
    this.changeMainScreen = this.changeMainScreen.bind(this);
  }

  changeMainScreen() {
    this.setState({screen: this.state.screen == "home" ? "calculator" : "home"});
  }

  render() {
    let bodyComponent;
    if(this.state.screen == "home"){
       bodyComponent = <Selector changeMainScreen={this.changeMainScreen} riskTable={riskTable}/>;
    } else if (this.state.screen == "calculator"){
      bodyComponent = <Calculator changeMainScreen={this.changeMainScreen} riskTable={riskTable}/>;
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

const riskTable = {
  1: [80, 20, 0, 0, 0],
  2: [70, 15, 15, 0, 0],
  3: [60, 15, 15, 10, 0],
  4: [50, 20, 20, 10, 0],
  5: [40, 20, 20, 20, 0],
  6: [35, 25, 5, 30, 5],
  7: [20, 25, 25, 25, 5],
  8: [10, 20, 40, 20, 10],
  9: [5, 15, 40, 25, 15],
  10: [0, 5, 25, 30, 40]
}
