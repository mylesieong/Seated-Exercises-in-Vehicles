import { StyleSheet, SafeAreaView, View, Appearance, Platform, StatusBar } from 'react-native'
import React from 'react'
import ThemeColor from './ThemeColor'

export default function PageTemplate({ topBarColor, children }) {
  return (
    <View style={[styles.upperWrapper, topBarColor && { backgroundColor: topBarColor }]}>
      <SafeAreaView />
      <SafeAreaView style={styles.lowerWrapper}>{children}</SafeAreaView>
    </View>
  )
}

const colorScheme = Appearance.getColorScheme()
const styles = StyleSheet.create({
  upperWrapper: {
    flex: 1,
    backgroundColor: ThemeColor.componentColor[colorScheme],
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  lowerWrapper: {
    backgroundColor: ThemeColor.backgroundColor[colorScheme],
    flex: 1,
  },
})
