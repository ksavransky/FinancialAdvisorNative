import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {money: 0, transfers: "replace me", textColor: "black", newAmounts: ["","","","",""], differences: ["","","","",""]};
    this.checkErrorsAndSetTotal = this.checkErrorsAndSetTotal.bind(this);
    this.recordNewAmountAndDifference = this.recordNewAmountAndDifference.bind(this);
    this.nullifyRemainder = this.nullifyRemainder.bind(this);
    this.calculateAllocation = this.calculateAllocation.bind(this);
    this.recordTransfers = this.recordTransfers.bind(this);

  }

  componentWillMount(){
    this.checkErrorsAndSetTotal();
  }

  // componentDidUpdate(){
  //   this.recordNewAmountAndDifference();
  // }

  calculateAllocation(money){
    let riskRow = this.props.riskTable[this.props.riskLevel];
    let riskPercents = riskRow.map(value => {
          if(value == 0){
           return 0;
          } else {
          return value / 100;
          }
      });

    return [riskPercents.map(percent => {
      return Math.floor(100*(percent * money))/100
    }), riskRow]
  }

  checkErrorsAndSetTotal(){
    // console.warn("in checkErrorsAndSetTotal")
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
      this.recordNewAmountAndDifference(Math.floor(totalAmount * 100) / 100);
    }
  }

  nullifyRemainder(remIdx, differences, newAmounts){
    let alteredNewAmounts = newAmounts;
    alteredNewAmounts[remIdx] = this.props.currentAmounts[remIdx].replace(/[^0-9\.]+/g, '');
    // let $difference = differences[remIdx];

    // $difference.value = "+" + 0;
    // $($difference).css('color', 'green');
    let alteredDifferences = differences;
    alteredDifferences[remIdx] = 0;
    return [alteredNewAmounts, alteredDifferences];
  }

  recordNewAmountAndDifference(money){
      // console.warn("in recordNewAmountAndDifference");
      let allocation = this.calculateAllocation(money);
      let newAmounts = [];
      let differences = [];

      allocation[0].forEach((newAmount, idx)=>{
        newAmounts.push(newAmount);
        let inputAmount = this.props.currentAmounts[idx].replace(/[^0-9\.]+/g, '');
        let difference = Math.round(100*(newAmount - inputAmount))/100;
        differences.push(difference);
      })

      this.setState({newAmounts: newAmounts, differences: differences});



      // let sum = 0;
      // newAmounts.forEach((amount)=>{
      //    sum += parseFloat(amount);
      // })
      // // console.warn("sum: " + sum);
      //
      // let remainder = Math.round(100*(sum - money))/100;
      // let remainderIdx = differences.indexOf(remainder);
      //
      // if(remainderIdx !== -1 && remainder !== 0){
      //     let result = this.nullifyRemainder(remainderIdx, differences, newAmounts);
      //     newAmounts = result[0];
      //     differences = result[1];
      // } else {
      //   let workingRemainder = remainder;
      //   while (workingRemainder < 0 && remainder !== 0) {
      //       workingRemainder = Math.round(100*(workingRemainder + 0.01))/100
      //       let workingRemainderIdx = differences.indexOf(workingRemainder);
      //       if(workingRemainderIdx !== -1){
      //         let result = this.nullifyRemainder(workingRemainderIdx, differences, newAmounts);
      //         newAmounts = result[0];
      //         differences = result[1];
      //         remainder -= workingRemainder;
      //       }
      //   }
      // }

      // console.warn("money: " + money);
      // console.warn("newAmounts: " + newAmounts);
      // console.warn("differences: " + differences);
      // //
      // $('.risk-calculator-transfers')[0].innerHTML = "";
      // this.recordTransfers(money, newAmounts, differences);
   }

   recordTransfers(money, newAmounts, originalDifferences, differences = [], recordedTransfers = [], recursionSafetyCounter = 0, transferString = []){
    if (differences == []){
      differences = originalDifferences;
    }
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
              let newTransferString = `Transfer $${transferAmount} from ${labels[deficitIdx]} to ${labels[surplusIdx]}.`
              transferString = transferString.push(newTransferString);
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
              let newTransferString = `Transfer $${transferAmount} from ${labels[deficitIdx]} to ${labels[surplusIdx]}.`
              transferString = transferString.push(newTransferString);
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
      this.recordTransfers(money, newAmounts, originalDifferences, newDifferences, recordedTransfers, recursionSafetyCounter + 1, transferString);
    }
    // if we have exactly four zero differences, meaning one bucket has a remainder that should be added to the largest amount
    else if (numOfZeroDifferences == 4){
      let amount = newDifferences.find((el)=>el !== 0);
      let surplusIdx = newDifferences.indexOf(amount);
      let largestAmount = newAmounts.map((amount)=>{
        return parseFloat(amount);
      }).sort().last()[0]
      let deficitIdx;
      newAmounts.each((amount, idx)=>{
           if(parseFloat(amount) == largestAmount) {deficitIdx = idx};
      })

      newAmounts[deficitIdx] = Math.round(100 * (largestAmount - amount))/100;

      let newDif = largestAmount - amount - Math.round(100 * parseFloat(this.props.currentAmounts[deficitIdx].replace(/[^0-9\.]+/g, '')))/100
      // let addPlusSign = "+";
      // if(newDif < 0){
      //   addPlusSign = "";
      // }
      // $('.risk-calculator-main-difference')[deficitIdx].value = addPlusSign + Math.round(100 * newDif)/100;

      let priorStringModified = false;
      recordedTransfers.forEach((transfer, idx)=>{
        if(transfer["from"] == surplusIdx && transfer["to"] == deficitIdx){
            let newAmount = Math.round(100 * (Math.abs(amount) + transfer["amount"]))/100
            let newString = `Transfer $${newAmount} from ${labels[surplusIdx]} to ${labels[deficitIdx]}`
            transferString[idx] = newString;
            priorStringModified = true;
        }
      });

      if(!priorStringModified){
          let newTransferString = `Transfer $${Math.abs(amount)} from ${labels[surplusIdx]} to ${labels[deficitIdx]}.`;
          transferString = transferString.push(newTransferString);
      }
    }
    // console.warn(money)
    // console.warn(newAmounts)
    // console.warn(differences)
    // console.warn(transferString)
    // this.setState({money: money, newAmounts: newAmounts, differences: differences, transfers: transferString})
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
