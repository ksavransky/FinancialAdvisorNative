import React from 'react';
import { StyleSheet, Text, Button, View, Alert } from 'react-native';
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {transfers: [], textColor: "green", newAmounts: ["","","","",""], differences: ["","","","",""]};
    this.calculateAllocation = this.calculateAllocation.bind(this);
    this.checkErrorsAndSetTotal = this.checkErrorsAndSetTotal.bind(this);
    this.recordNewAmountAndDifference = this.recordNewAmountAndDifference.bind(this);
    this.recordTransfers = this.recordTransfers.bind(this);
    this.nullifyRemainder = this.nullifyRemainder.bind(this);
  }

  componentWillMount(){
    this.checkErrorsAndSetTotal();
    display.transferRec = [];
  }

  calculateAllocation(){
    let riskRow = this.props.riskTable[this.props.riskLevel];
    let riskPercents = riskRow.map(value => {
          if(value == 0){
           return 0;
          } else {
          return value / 100;
          }
      });

    return [riskPercents.map(percent => {
      return Math.floor(100*(percent * display.money))/100
    }), riskRow]
  }

  checkErrorsAndSetTotal(){
    let totalAmount = 0;
    let validInput = true;
    let validRegEx = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;
    this.props.currentAmounts.forEach((amount) => {
      if(!validRegEx.test(amount) || amount < 0 || amount == ""){
        this.setState({textColor: "red", transfers: ["Invalid Inputs. Please click on 'Change Inputs' button. Please use only positive digits or zero when entering current amounts and enter all inputs correctly."]})
          validInput = false;
      } else {
        totalAmount += parseFloat(amount.replace(/[^0-9\.]+/g, ''));
      }
    })
    if(validInput){
      this.setState({textColor: "green"});
      display.money = Math.floor(totalAmount * 100) / 100;
      this.recordNewAmountAndDifference(Math.floor(totalAmount * 100) / 100);
    }
  }

  nullifyRemainder(remIdx, differences){
    display.newAmounts[remIdx] = this.props.currentAmounts[remIdx].replace(/[^0-9\.]+/g, '');
    // let $difference = $('.risk-calculator-main-difference')[remIdx];
    display.differences[remIdx] = 0;
    // $difference.value = "+" + 0;
    // $($difference).css('color', 'green');
    differences[remIdx] = 0;
  }

  recordNewAmountAndDifference(){
      let allocation = this.calculateAllocation();
      let newAmounts = [];
      let differences = [];

      allocation[0].forEach((newAmount, idx)=>{
        newAmounts.push(newAmount);
        let inputAmount = this.props.currentAmounts[idx].replace(/[^0-9\.]+/g, '');
        let difference = Math.round(100*(newAmount - inputAmount))/100;
        differences.push(difference);
      })

      display.newAmounts = newAmounts;
      display.differences = differences;

      let sum = 0;
      newAmounts.forEach((amount)=>{
         sum += parseFloat(amount);
      })

      let remainder = Math.round(100*(sum - display.money))/100;
      let remainderIdx = differences.indexOf(remainder);


      if(remainderIdx !== -1 && remainder !== 0){
      this.nullifyRemainder(remainderIdx, differences);
      } else {
        let workingRemainder = remainder;
        while (workingRemainder < 0 && remainder !== 0) {
            workingRemainder = Math.round(100*(workingRemainder + 0.01))/100
            let workingRemainderIdx = differences.indexOf(workingRemainder);
            if(workingRemainderIdx !== -1){
              this.nullifyRemainder(workingRemainderIdx, differences);
              remainder -= workingRemainder;
            }
        }
      }

      this.recordTransfers(differences);
   }

   recordTransfers(differences, recordedTransfers = [], recursionSafetyCounter = 0){
     let labels = ["Bonds", "Large Cap", "Mid Cap", "Foreign", "Small Cap"];
     let newDifferences = differences.slice(0);

     function sortNumber(a,b) {return a - b;}
     let sortedDiff = differences.sort(sortNumber)

     let transferMade = false;
     let smallestFittingDeficit = null;

     sortedDiff.slice(0).reverse().forEach(function(surplus){
        if(!transferMade && surplus > 0){
           sortedDiff.forEach(function(deficit){
               if(surplus + deficit <= 0){
                 smallestFittingDeficit = deficit;
               }
           })

           if(smallestFittingDeficit){
               let surplusIdx = newDifferences.indexOf(surplus);
               let deficitIdx = newDifferences.indexOf(smallestFittingDeficit);
               newDifferences[surplusIdx] = 0;
               newDifferences[deficitIdx] = surplus + smallestFittingDeficit;
               let transferAmount = Math.round(100*surplus)/100;
               let transferString = `Transfer $${transferAmount} from ${labels[deficitIdx]} to ${labels[surplusIdx]}.`
               if(labels[surplusIdx] == labels[deficitIdx]) {
                 transferString ='';
               }
               display.transferRec.push(transferString);
               recordedTransfers.push({"from": deficitIdx, "to":surplusIdx, "amount": transferAmount});
               transferMade = true;
           }
        }
     })

     if(!transferMade){
       sortedDiff.forEach(function(smallestSurplus){
         if(smallestSurplus > 0){
           sortedDiff.slice(0).reverse().forEach(function(smallestDeficit){
             if(!transferMade && smallestDeficit < 0){
               let surplusIdx = newDifferences.indexOf(smallestSurplus);
               let deficitIdx = newDifferences.indexOf(smallestDeficit);
               newDifferences[surplusIdx] = smallestSurplus + smallestDeficit;
               newDifferences[deficitIdx] = 0;
               let transferAmount = Math.round(100*(smallestSurplus - (smallestSurplus + smallestDeficit)))/100;
               let transferString = `Transfer $${transferAmount} from ${labels[deficitIdx]} to ${labels[surplusIdx]}.`
               if(labels[surplusIdx] == labels[deficitIdx]) {
                 transferString ='';
               }
               display.transferRec.push(transferString);
               recordedTransfers.push({"from": deficitIdx, "to":surplusIdx, "amount": transferAmount});
               transferMade = true;
             }
           })
         }
       })
     }

     newDifferences = newDifferences.map((el)=>{return Math.round(100 * el)/100})

     let numOfZeroDifferences = newDifferences.filter(function(x){return x==0}).length;

     // make recursive call, if transfers can still be made (which means at least two differences are not zero)
     if(numOfZeroDifferences < 4 && recursionSafetyCounter < 7){
       this.recordTransfers(newDifferences, recordedTransfers, recursionSafetyCounter + 1);
     }
     // if we have exactly four zero differences, meaning one bucket has a remainder that should be added to the largest amount
     else if (numOfZeroDifferences == 4){
       let amount = newDifferences.find((el)=>el !== 0);
       let surplusIdx = newDifferences.indexOf(amount);
       let largestAmount = display.newAmounts.map((el, idx)=>{
         return parseFloat(el);
       }).sort()[4];
       let deficitIdx;
       display.newAmounts.forEach((el, idx)=>{
            if(parseFloat(el) == largestAmount) {deficitIdx = idx};
       })

       display.newAmounts[deficitIdx] = Math.round(100 * (largestAmount - amount))/100;

       let newDif = largestAmount - amount - Math.round(100 * parseFloat(this.props.currentAmounts[deficitIdx].replace(/[^0-9\.]+/g, '')))/100

       let priorStringModified = false;
       recordedTransfers.forEach((transfer, idx)=>{
         if(transfer["from"] == surplusIdx && transfer["to"] == deficitIdx){
             let newAmount = Math.round(100 * (Math.abs(amount) + transfer["amount"]))/100
             let newString = `Transfer $${newAmount} from ${labels[surplusIdx]} to ${labels[deficitIdx]}.`
             display.transferRec[idx] = newString;
             priorStringModified = true;
         }
       });

       if(!priorStringModified){
           let transferString = `Transfer $${Math.abs(amount)} from ${labels[surplusIdx]} to ${labels[deficitIdx]}.`;
            if(labels[surplusIdx] == labels[deficitIdx]) {
              transferString ='';
            }
           display.transferRec.push(transferString);
       }
     }
     let differencesInsert = display.newAmounts.map((newAmount, idx) => {
       return Math.round(100*(newAmount - (this.props.currentAmounts[idx]).replace(/[^0-9\.]+/g, '')))/100;
     })
    display.newAmounts = display.newAmounts.map((newAmount, idx) => {
       if (parseFloat(newAmount) == 0) {
         return "0.00";
       } else {
         return newAmount;
       }
     })
     this.setState({newAmounts: display.newAmounts, transfers: display.transferRec, differences: differencesInsert})
   }

  render() {
    let riskLevelRow = this.props.riskTable[this.props.riskLevel];
    let currentAmounts = this.props.currentAmounts;
    let differences = this.state.differences;
    let newAmounts = this.state.newAmounts;
    const tableHead = ['Investment', 'Current Amount', 'Difference', "New Amount"];
    const tableTitle = ['Bonds', 'Large Cap', 'Mid Cap', 'Foreign', 'Small Cap'];
    const tableData = [
      ["$" + currentAmounts[0], differences[0], "$" + newAmounts[0]],
      ["$" + currentAmounts[1], differences[1], "$" + newAmounts[1]],
      ["$" + currentAmounts[2], differences[2], "$" + newAmounts[2]],
      ["$" + currentAmounts[3], differences[3], "$" + newAmounts[3]],
      ["$" + currentAmounts[4], differences[4], "$" + newAmounts[4]]
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
          <Text style={{fontSize: 14, color: this.state.textColor}}>{this.state.transfers[5]}</Text>
          <Text style={{fontSize: 14, color: this.state.textColor}}>{this.state.transfers[4]}</Text>
          <Text style={{fontSize: 14, color: this.state.textColor}}>{this.state.transfers[3]}</Text>
          <Text style={{fontSize: 14, color: this.state.textColor}}>{this.state.transfers[2]}</Text>
          <Text style={{fontSize: 14, color: this.state.textColor}}>{this.state.transfers[1]}</Text>
          <Text style={{fontSize: 14, color: this.state.textColor}}>{this.state.transfers[0]}</Text>
        </View>
      </View>
    )
  }
}

const display = {
  money: 0,
  differences: [],
  newAmounts: [],
  transferRec: []
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
    width: 320,
    alignItems: 'center'
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
