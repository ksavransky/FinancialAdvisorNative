import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Slider,
  Button
} from 'react-native';

export default class SelectorSlider extends Component {
  constructor(props) {
   super(props)
   this.state = { riskLevel: 1 }
  }
  getVal(val){
    this.props.updateRiskLevel(val)
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
        <View style={stylesSlider.buttonContainer}>
                <Button
                   onPress={this.props.changeViewer}
                   title="Change View"
                   color="#0084bf"
                  style={stylesSlider.button}
                 />
                <Button
                   onPress={this.props.changeMainScreen}
                   title="Personalize"
                   color="green"
                  style={stylesSlider.button}
                 />
        </View>
      </View>
    );
  }
}

const stylesSlider = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: 'ghostwhite',
    padding: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  button: {
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 320,
  }
});
