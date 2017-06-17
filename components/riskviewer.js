import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default class RiskViewerTable extends React.Component {
  render() {
    const tableHead = ['Investment', 'Percent Allocated'];
    const tableTitle = ['Bonds', 'Large Cap', 'Mid Cap', 'Foreign', 'Small Cap'];
    const tableData = [
      ['1'],
      ['1'],
      ['1'],
      ['1'],
      ['1'],
    ];
    return (
      <View style={stylesRiskViewer.container}>
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
  container: {flex: 5, backgroundColor: 'ghostwhite'},
  head: { height: 40, backgroundColor: '#f1f8ff' },
  title: { backgroundColor: '#f6f8fa' },
  row: { height: 30 },
  text: { textAlign: 'center' }
})
