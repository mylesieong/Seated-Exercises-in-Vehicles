import { StyleSheet, SafeAreaView, View } from 'react-native'
import React from 'react'
import Header from './Header'
import Image from './Image'
import Buttons from './Buttons'

export default function Finish() {
  return (
    <View style={styles.upperWrapper}>
      <SafeAreaView />
      <SafeAreaView style={styles.lowerWrapper}>
        <Header />
        <Image />
        <Buttons />
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
})
