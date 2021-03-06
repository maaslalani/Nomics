import React from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native'
import { Constants } from 'expo'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor() {
    super()
    this.state = {
      balance: User.balance,
      health: User.health,
      education: User.education,
      income: User.job.salary,
      expenses: User.expenses.rent + User.expenses.food + User.expenses.medical,
      date: User.date
    }
    setInterval(() => {
      console.log(User)
      User.balance = User.balance + User.job.salary - (User.expenses.rent + User.expenses.food + User.expenses.medical)
      User.date.setDate(this.state.date.getDate() + 1)
      this.setState({
        balance: User.balance,
        health: User.health,
        education: User.education,
        income: User.job.salary,
        expenses: User.expenses.rent + User.expenses.food + User.expenses.medical,
        date: User.date
      })
    }, 1000)
  }

  render() {
    return (
        <View style={styles.container}>

          <Text style={styles.balanceLabel}>Balance </Text><Text style={styles.balanceAmount}>${User.balance}</Text>

          <View style={styles.item}>
            <Text>Health</Text>
            <View style={styles.healthBar}>
              <View style={[styles.health, {width: this.state.health + '%'}]}></View>
            </View>
          </View>
          
          <View style={styles.item}>
            <Text>Education</Text>
            <Text style={styles.largeText}>{this.state.education}</Text>
          </View>

          <View style={styles.item}>
            <Text>Income</Text>
            <Text style={styles.largeText}>${this.state.income}</Text>
          </View>
          
          <View style={styles.item}>
            <Text>Expenses</Text>
            <Text style={styles.largeText}>${this.state.expenses}</Text>
          </View>

          <View style={styles.item}>
            <Text>Today's Date</Text>
            <Text style={styles.largeText}>{`${this.state.date.getDate()}/${this.state.date.getMonth()}/${this.state.date.getFullYear()}`}</Text>
          </View>
          
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight + 40,
    paddingHorizontal: 20,
  },
  balanceLabel: {
    fontFamily: 'Avenir',
    fontSize: 28,
    alignSelf: 'center'
  },
  balanceAmount: {
    fontFamily: 'Avenir',
    fontSize: 28,
    alignSelf: 'center',
    color: 'white',
    backgroundColor: '#5DBCD2',
    // #5DBCD2 | #F389EE
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 5,
  },
  balance: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 30,
  },
  health: {
    backgroundColor: '#E26D69',
    height: 30,
  },
  healthBar: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#E26D69'
  },
  item: {
    marginBottom: 30, 
  },
  largeText: {
    fontFamily: 'Avenir',
    fontSize: 30,
  }
})
