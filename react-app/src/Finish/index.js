import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Finish() {
  return (
    <View style={styles.container}>
      <Text>Finish page is coming...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
