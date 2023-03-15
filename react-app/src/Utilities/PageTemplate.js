import { StyleSheet, SafeAreaView, View, Platform, StatusBar } from 'react-native'
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

const styles = StyleSheet.create({
  upperWrapper: {
    flex: 1,
    backgroundColor: ThemeColor.componentColor,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  lowerWrapper: {
    backgroundColor: ThemeColor.backgroundColor,
    flex: 1,
  },
})
