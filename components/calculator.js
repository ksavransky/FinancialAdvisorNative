import React from 'react';
import { StyleSheet, Text, TextInput, ScrollView, Button, View } from 'react-native';
import CalcInputs from './calcinputs.js';
import Results from './results.js';


export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentAmounts: ['','','','',''], calcviewer: "inputs"};
    this.updateCurrentAmounts = this.updateCurrentAmounts.bind(this);
    this.changeCalcView = this.changeCalcView.bind(this);
  }

  updateCurrentAmounts(newCurrentAmounts){
      this.setState({currentAmounts: newCurrentAmounts});
  }

  changeCalcView(){
      this.setState({calcviewer: this.state.calcviewer == "inputs" ? "results" : "inputs"});
  }

  render() {
    let calcBody;
    if(this.state.calcviewer == "inputs"){
       calcBody = <CalcInputs currentAmounts={this.state.currentAmounts} updateCurrentAmounts={this.updateCurrentAmounts} changeCalcView={this.changeCalcView}  changeMainScreen={this.props.changeMainScreen}/>
    } else if (this.state.calcviewer == "results"){
      calcBody = <Results riskLevel={this.state.riskLevel} currentAmounts={this.state.currentAmounts} riskTable={this.props.riskTable} changeCalcView={this.changeCalcView} changeMainScreen={this.props.changeMainScreen}/>;
    }
    return (
      <ScrollView>
        <Text style={stylesCalculator.title}>Personalized Portfolio at Risk Level: {this.props.riskLevel}</Text>
        {calcBody}
      </ScrollView>
    );
  }
}

const stylesCalculator = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
    alignSelf: 'center'
  }
});
