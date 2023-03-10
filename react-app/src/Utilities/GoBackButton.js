import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg'

export default function GoBackButton({ onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.goBackButton}>
      <ArrowLeftIcon height={35} width={35} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  goBackButton: {
    position: 'absolute',
    top: 12,
    left: 20,
  },
})