import React, { Component } from 'react';
import {StyleSheet, ScrollView , StatusBar, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';


export default class DonutViewer extends Component {
  render() {
    const chart_wh = 250;
    const riskRow = this.props.riskTable[this.props.riskLevel];
    const series = riskRow;
    const sliceColor = ['#2196F3','#4CAF50','#FF9800', '#F44336', 'purple'];

    return (
        <View style={stylesDonut.container}>
          <Text style={stylesDonut.title}>Investment Portfolio Allocation</Text>
          <View style={stylesDonut.labelsContainer}>
            <Text style={stylesDonut.label}>Bonds</Text>
            <View style={stylesDonut.labelColor1}><Text style={stylesDonut.labelText}>{riskRow[0] + "%"}</Text></View>
            <Text style={stylesDonut.label}>Large Cap</Text>
            <View style={stylesDonut.labelColor2}><Text style={stylesDonut.labelText}>{riskRow[1] + "%"}</Text></View>
            <Text style={stylesDonut.label}>Mid Cap</Text>
            <View style={stylesDonut.labelColor3}><Text style={stylesDonut.labelText}>{riskRow[2] + "%"}</Text></View>
          </View>
          <View style={stylesDonut.labelsContainer}>
            <Text style={stylesDonut.label}>Foreign</Text>
            <View style={stylesDonut.labelColor4}><Text style={stylesDonut.labelText}>{riskRow[3] + "%"}</Text></View>
            <Text style={stylesDonut.label}>Small Cap</Text>
            <View style={stylesDonut.labelColor5}><Text style={stylesDonut.labelText}> {riskRow[4] + "%"}</Text></View>
          </View>
          <PieChart
            chart_wh={chart_wh}
            series={series}
            sliceColor={sliceColor}
            doughnut={true}
            coverRadius={0.45}
            coverFill={'#FFF'}
          />
        </View>
    );
  }
}

const stylesDonut = StyleSheet.create({
  container: {flex: 7, backgroundColor: 'ghostwhite', alignItems: 'center'},
  title: {
    fontSize: 16,
    marginBottom: 10
  },
  labelsContainer: {
    height: 30,
    marginBottom: 10,
    flexDirection: 'row',
  },
  label: {
    fontSize: 12,
    alignSelf: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  labelText: {
    fontSize: 10,
    alignSelf: 'center',
    color: 'white',
  },
  labelColor1: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    backgroundColor: '#2196F3'
  },
  labelColor2: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    backgroundColor: '#4CAF50'
  },
  labelColor3: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    backgroundColor: '#FF9800'
  },
  labelColor4: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    backgroundColor: '#F44336'
  },
  labelColor5: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    backgroundColor: 'purple'
  }
});
