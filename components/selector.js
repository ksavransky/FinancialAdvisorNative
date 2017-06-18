import React from 'react';
import { ScrollView, StyleSheet, Text, Button, View } from 'react-native';
import SelectorSlider from './slider.js';
import RiskViewerTable from './riskviewer.js';
import DonutViewer from './donut.js';


export default class Selector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let viewer;
    if (this.props.viewer == "table"){
      viewer = <RiskViewerTable riskTable={this.props.riskTable} riskLevel={this.props.riskLevel}/>;
    } else {
      viewer = <DonutViewer riskTable={this.props.riskTable} riskLevel={this.props.riskLevel}/>;
    }
    return (
      <ScrollView>
        <Text style={stylesSelector.title}>Please Select A Risk Level For Your Investment Portfolio</Text>
        <View style={stylesSelector.riskLabels}>
          <Text style={stylesSelector.riskLabelText}>Low</Text>
          <Text style={stylesSelector.riskLabelText}>High</Text>
        </View>
        <SelectorSlider riskLevel={this.props.riskLevel} updateRiskLevel={this.props.updateRiskLevel} changeViewer={this.props.changeViewer} changeMainScreen={this.props.changeMainScreen}/>
        {viewer}
      </ScrollView>
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
