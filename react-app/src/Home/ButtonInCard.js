import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import ArrowIcon from '../../assets/icons/arrow-right.svg'

export default function ButtonInCard() {
  return (
    <Pressable style={styles.button}>
      <ArrowIcon height={20} width={20} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    width: 48,
    height: 48,
    backgroundColor: '#000',
    borderRadius: 50,
    alignItems: 'center'
  }
})
