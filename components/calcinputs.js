import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';



export default class CalcInputs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let currentAmountsState = this.props.currentAmounts;

    let setCurrentAmounts = (text, idx) => {
        currentAmountsState[idx] = text;
        this.props.updateCurrentAmounts(currentAmountsState);
    }
    return (
      <View>
        <View style={stylesCalcInputs.buttonContainer}>
                <Button
                   onPress={this.props.changeMainScreen}
                   title="Change Risk"
                   color="#0084bf"
                  style={stylesCalcInputs.button}
                 />
                <Button
                   onPress={this.props.changeCalcView}
                   title="Rebalance"
                   color="green"
                  style={stylesCalcInputs.button}
                 />
        </View>
        <Text style={stylesCalcInputs.title}>Please Enter Your Current Portfolio</Text>
        <Text style={stylesCalcInputs.label}>Bonds</Text>
        <View style={{padding: 10}}>
                <TextInput
                  style={{height: 40}}
                  defaultValue={currentAmountsState[0]}
                  onChangeText={(text) => setCurrentAmounts(text, 0)}
                />
        </View>
        <Text style={stylesCalcInputs.label}>Large Cap</Text>
        <View style={{padding: 10}}>
                <TextInput
                  style={{height: 40}}
                  defaultValue={currentAmountsState[1]}
                  onChangeText={(text) => setCurrentAmounts(text, 1)}
                />
        </View>
        <Text style={stylesCalcInputs.label}>Mid Cap</Text>
        <View style={{padding: 10}}>
                <TextInput
                  style={{height: 40}}
                  defaultValue={currentAmountsState[2]}
                  onChangeText={(text) => setCurrentAmounts(text, 2)}
                />
        </View>
        <Text style={stylesCalcInputs.label}>Foreign</Text>
        <View style={{padding: 10}}>
                <TextInput
                  style={{height: 40}}
                  defaultValue={currentAmountsState[3]}
                  onChangeText={(text) => setCurrentAmounts(text, 3)}
                />
        </View>
        <Text style={stylesCalcInputs.label}>Small Cap</Text>
        <View style={{padding: 10}}>
                <TextInput
                  style={{height: 40}}
                  defaultValue={currentAmountsState[4]}
                  onChangeText={(text) => setCurrentAmounts(text, 4)}
                />
        </View>
      </View>
    )
  }
}

const stylesCalcInputs = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
    alignSelf: 'center'
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
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
