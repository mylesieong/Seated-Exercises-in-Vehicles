import { StyleSheet, SafeAreaView, View, Platform, StatusBar } from 'react-native'
import React from 'react'
import ThemeColor from './ThemeColor'

export default function PageTemplate({ topBarColor, bottomColor, children }) {
  return (
    <View
      style={[
        styles.upperWrapper,
        { backgroundColor: topBarColor ? topBarColor : ThemeColor.primaryDarker },
      ]}
    >
      <SafeAreaView />
      <SafeAreaView
        style={[
          styles.lowerWrapper,
          { backgroundColor: bottomColor ? bottomColor : ThemeColor.component },
        ]}
      >
        {children}
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  upperWrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  lowerWrapper: {
    flex: 1,
  },
})
