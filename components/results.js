import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={stylesResults.buttonContainer}>
                <Button
                   onPress={this.props.changeMainScreen}
                   title="Change Risk"
                   color="#0084bf"
                  style={stylesResults.button}
                 />
                <Button
                   onPress={this.props.changeCalcView}
                   title="Change Inputs"
                   color="green"
                  style={stylesResults.button}
                 />
        </View>
        <Text style={stylesResults.title}>Results</Text>
      </View>
    )
  }
}

const stylesResults = StyleSheet.create({
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
