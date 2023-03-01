import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import NavBar from './NavBar.js'


export default function Setting() {
  return (
    <View style={styles.container}>
      <NavBar />
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
})
