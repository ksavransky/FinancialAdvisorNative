import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {money: 0, transfers: "replace me", textColor: "black"};
    this.checkErrorsAndSetTotal = this.checkErrorsAndSetTotal.bind(this);

  }

  componentDidMount(){
    this.checkErrorsAndSetTotal();
  }

  checkErrorsAndSetTotal(){
    let totalAmount = 0;
    let validInput = true;
    let validRegEx = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;
    this.props.currentAmounts.forEach((amount) => {
      if(!validRegEx.test(amount) || amount < 0 || amount == ""){
        this.setState({textColor: "red", transfers: "Invalid Inputs. Please click on 'Change Inputs' button. Please use only positive digits or zero when entering current amounts and enter all inputs correctly."})
          validInput = false;
      } else {
        totalAmount += parseFloat(amount.replace(/[^0-9\.]+/g, ''));
      }
    })
    if(validInput){
      this.setState({textColor: "black", money: Math.floor(totalAmount * 100) / 100});
    }
  }

  render() {
    let riskLevelRow = this.props.riskTable[this.props.riskLevel];
    let currentAmounts = this.props.currentAmounts;
    // [riskLevelRow[0] + "%"],
    // [riskLevelRow[1] + "%"],
    // [riskLevelRow[2] + "%"],
    // [riskLevelRow[3] + "%"],
    // [riskLevelRow[4] + "%"],
    const tableHead = ['Investment', 'Current Amount', 'Difference', "New Amount"];
    const tableTitle = ['Bonds', 'Large Cap', 'Mid Cap', 'Foreign', 'Small Cap'];
    const tableData = [
      ["$" + currentAmounts[0], "blah", "blah"],
      ["$" + currentAmounts[1]],
      ["$" + currentAmounts[2]],
      ["$" + currentAmounts[3]],
      ["$" + currentAmounts[4]],
    ];
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
        <Text style={stylesResults.title}>Recommended New Portfolio</Text>
        <Table>
          <Row data={tableHead} flexArr={[1, 1]} style={stylesTable.head} textStyle={stylesTable.text}/>
          <TableWraper style={{flexDirection: 'row'}}>
            <Col data={tableTitle} style={stylesTable.title} heightArr={[30, 30, 30, 30, 30]} textStyle={stylesTable.text}/>
            <Rows data={tableData} heightArr={[30]} flexArr={[1, 1, 1]} style={stylesTable.row} textStyle={stylesTable.text}/>
          </TableWraper>
        </Table>
        <Text style={stylesResults.title}>Recommended Action</Text>
        <View style={stylesResults.transfersContainer}>
          <Text style={{fontSize: 12, color: this.state.textColor}}>{this.state.transfers}</Text>
        </View>
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
  },
  transfers: {
    fontSize: 12,
  },
  transfersContainer: {
    alignSelf: 'center',
    width: 320
  }
});

const stylesTable = StyleSheet.create({
  container: {flex: 7, backgroundColor: 'ghostwhite'},
  head: { height: 40, backgroundColor: '#f1f8ff' },
  title: { backgroundColor: '#f6f8fa' },
  row: { height: 30 },
  text: { textAlign: 'center' },
  mainTitle: {
    fontSize: 16,
    marginBottom: 20,
    alignSelf: 'center'
  },
})
