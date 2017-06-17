import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import SelectorSlider from './slider.js';
import RiskViewerTable from './riskviewer.js';
import DonutViewer from './donut.js';


export default class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {riskLevel: 1, viewer: "donut"};
    this.updateRiskLevel = this.updateRiskLevel.bind(this);
  }

  updateRiskLevel(level = 1){
    this.setState({riskLevel: level});
  }

  render() {
    let viewer;
    if (this.state.viewer == "table"){
      viewer = <RiskViewerTable riskTable={this.props.riskTable} riskLevel={this.state.riskLevel}/>;
    } else {
      viewer = <DonutViewer riskTable={this.props.riskTable} riskLevel={this.state.riskLevel}/>;
    }
    return (
      <View>
        <Text style={stylesSelector.title}>Please Select A Risk Level For Your Investment Portfolio</Text>
        <View style={stylesSelector.riskLabels}>
          <Text style={stylesSelector.riskLabelText}>Low</Text>
          <Text style={stylesSelector.riskLabelText}>High</Text>
        </View>
        <SelectorSlider updateRiskLevel={this.updateRiskLevel}/>
        {viewer}
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
