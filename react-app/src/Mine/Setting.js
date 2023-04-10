import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import ThemeColor from '../Utilities/ThemeColor.js'
import ResetButton from './Buttons/ResetButton.js'
import AboutButton from './Buttons/AboutButton.js'

export default function Setting({ db, reset, setReset }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setting</Text>
      <View style={styles.buttons}>
        <ResetButton db={db} reset={reset} setReset={setReset} />
        <AboutButton />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColor.deepBackground,
    flex: 1,
  },
  title: {
    color: ThemeColor.text,
    fontSize: 28,
    paddingLeft: 20,
    paddingTop: 20,
    lineHeight: 32,
    fontFamily: 'NotoSansMidExtraBold',
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 24,
    color: ThemeColor.text,
    marginTop: 12,
    fontFamily: 'NotoSansExtraBold',
  },
  buttons: {
    marginBottom: 10,
  },
})
