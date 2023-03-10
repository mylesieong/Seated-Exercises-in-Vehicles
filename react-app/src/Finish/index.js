import { StyleSheet, SafeAreaView, View, Dimensions } from 'react-native'
import React from 'react'
import Header from './Header'
import Image from './Image'
import Buttons from './Buttons'
import Lottie from 'lottie-react-native'
import { useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite'

export default function Finish() {
  const db = SQLite.openDatabase('shelter.db')
  const [debugMessage, setDebugMessage] = useState('')

  useEffect(() => {
    const timestamp = new Date().getTime()
    db.transaction(
      (tx) => {
        tx.executeSql(
          `insert into Record (timestamp, exercise_name) values (?,?);`,
          [timestamp, 'stretchW'],
          () => {
            setDebugMessage('insert success')
            if (__DEV__) alert(debugMessage)
          },
          (tx, error) => {
            setDebugMessage('insert failed' + error)
            if (__DEV__) alert(debugMessage)
            return false
          }
        )
      },
      (error) => {
        setDebugMessage('tx failed' + error)
      }
    )
  }, [])

  return (
    <View style={styles.upperWrapper}>
      <SafeAreaView />
      <SafeAreaView style={styles.lowerWrapper}>
        <Header />
        <Image />
        <Buttons />
        <Lottie
          source={require('../../assets/animation/62717-confetti.json')}
          autoPlay
          loop
          style={styles.animation}
          resizeMode='cover'
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  upperWrapper: {
    flex: 1,
    backgroundColor: '#ffca28',
    paddingTop: 35,
  },
  lowerWrapper: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  animation: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    top: 0,
  },
})
