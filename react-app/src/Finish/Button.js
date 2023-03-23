import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import ThemeColor from '../Utilities/ThemeColor'

export default function Button({ onPress, text, children, color }) {
  return (
    <Pressable style={[styles.button, color && { backgroundColor: color }]} onPress={onPress}>
      <View style={styles.icon}>{children}</View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: ThemeColor.primaryDarker,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 800,
    color: ThemeColor.textWhite,
  },
})
