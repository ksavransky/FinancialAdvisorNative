import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Slider
} from 'react-native';

export default class SelectorSlider extends Component {
  constructor(props) {
   super(props)
   this.state = { riskLevel: 1 }
  }
  getVal(val){
    console.warn(val);
  }
  render() {

    return (
      <View style={stylesSlider.container}>
        <Slider
         style={{ width: 300 }}
         step={1}
         minimumValue={1}
         maximumValue={10}
         value={this.state.riskLevel}
         onValueChange={val => this.setState({ riskLevel: val })}
         onSlidingComplete={ val => this.getVal(val)}
        />
        <Text style={stylesSlider.text}>
          Risk Level: {this.state.riskLevel}
        </Text>
      </View>
    );
  }
}

const stylesSlider = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'ghostwhite',
    padding: 10,
  },
  text: {
    fontSize: 13,
    textAlign: 'center',
    margin: 10,
  },
});
