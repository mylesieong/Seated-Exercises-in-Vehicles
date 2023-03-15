import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg'
import ThemeColor from './ThemeColor'

export default function GoBackButton({ onPress, color }) {
  return (
    <Pressable onPress={onPress} style={styles.goBackButton}>
      <ArrowLeftIcon height={35} width={35} style={[styles.icon, color && { color: color }]} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  goBackButton: {
    position: 'absolute',
    top: 7,
    left: 20,
  },
  icon: {
    color: ThemeColor.textColor,
  },
})
