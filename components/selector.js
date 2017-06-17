import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';


export default class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Selector</Text>
        <View>
          <Button
            onPress={this.props.onChangeScreen}
            title="Press Me"
            color="blue"
          />
        </View>
      </View>
    );
  }
}
