import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import ThemeColor from '../../Utilities/ThemeColor'
import ResetRightIcon from '../../../assets/icons/reset-arrow-right.svg'

export default function Button({ onPress, text, children }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      {children}
      <Text style={styles.text}>{text}</Text>
      <View style={styles.rightArrow}>
        <ResetRightIcon height={20} width={20} color={ThemeColor.text} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: ThemeColor.tab,
    borderRadius: 10,
    height: 70,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowColor: ThemeColor.shadow,
    // for android
    elevation: 5,
  },
  text: {
    fontSize: 20,
    paddingLeft: 20,
    lineHeight: 24,
    fontFamily: 'NotoSansExtraBold',
    color: ThemeColor.text,
  },
  rightArrow: {
    marginLeft: 'auto',
    justifyContent: 'center',
  },
})
