import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default class RiskViewerTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let riskLevelRow = this.props.riskTable[this.props.riskLevel];
    const tableHead = ['Investment', 'Percent Allocated'];
    const tableTitle = ['Bonds', 'Large Cap', 'Mid Cap', 'Foreign', 'Small Cap'];
    const tableData = [
      [riskLevelRow[0] + "%"],
      [riskLevelRow[1] + "%"],
      [riskLevelRow[2] + "%"],
      [riskLevelRow[3] + "%"],
      [riskLevelRow[4] + "%"],
    ];
    return (
      <View style={stylesRiskViewer.container}>
        <Text style={stylesRiskViewer.mainTitle}>Investment Portfolio Allocation</Text>
        <Table>
          <Row data={tableHead} flexArr={[1, 1]} style={stylesRiskViewer.head} textStyle={stylesRiskViewer.text}/>
          <TableWraper style={{flexDirection: 'row'}}>
            <Col data={tableTitle} style={stylesRiskViewer.title} heightArr={[30, 30, 30, 30, 30]} textStyle={stylesRiskViewer.text}/>
            <Rows data={tableData} heightArr={[30]} flexArr={[1]} style={stylesRiskViewer.row} textStyle={stylesRiskViewer.text}/>
          </TableWraper>
        </Table>
      </View>
    )
  }
}

const stylesRiskViewer = StyleSheet.create({
  container: {flex: 6, backgroundColor: 'ghostwhite'},
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
