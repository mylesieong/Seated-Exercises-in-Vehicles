import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Button } from 'react-native'
import NavBar from './NavBar.js'
import React from 'react'

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <NavBar />
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})
