import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemeColor from '../Utilities/ThemeColor'

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}> Nice work!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 2,
  },
  headerText: {
    fontFamily: 'NotoSansMidExtraBold',
    lineHeight: 32,
    marginRight: 20,
    fontSize: 28,
    color: ThemeColor.text,
  },
})
