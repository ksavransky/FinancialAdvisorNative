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
        <Text style={stylesSelector.title}>Please Select A Risk Level For Your Investment Portfolio</Text>
        <View style={stylesSelector.riskLabels}>
          <Text style={stylesSelector.riskLabelText}>Low</Text>
          <Text style={stylesSelector.riskLabelText}>High</Text>
        </View>
      </View>
    );
  }
}

const stylesSelector = StyleSheet.create({
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    margin: 10,
  },
  riskLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  riskLabelText: {
    fontSize: 12,
  },
});
