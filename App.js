import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {location: "home", riskLevel: 0};
    this.onPressButton = this.onPressButton.bind(this);
  }

  onPressButton() {
    this.setState({location: this.state.location == "home" ? "calculator" : "home"});
  }

  render() {
    let bodyComponent;
    if(this.state.location == "home"){
       bodyComponent = <Text>Home</Text>;
    } else if (this.state.location == "calculator"){
      bodyComponent = <Text>Calculator</Text>;
    }

    return (
      <View style={styles.app}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>Financial Advisor</Text>
        </View>
        <View style={styles.body}>
          {bodyComponent}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.onPressButton}
            title="Press Me"
            color="#841584"
          />
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
    flex: 8,
    backgroundColor: 'ghostwhite',
    alignItems: 'center',
  },
  appTitle: {
    color: 'white',
    fontSize: 22,
  },
  buttonContainer: {
    margin: 20,
  },
});
