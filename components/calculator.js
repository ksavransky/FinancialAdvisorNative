import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';


export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Calculator</Text>
        <View>
          <Button
            onPress={this.props.changeMainScreen}
            title="Press Me"
            color="blue"
          />
        </View>
      </View>
    );
  }
}
