import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ArrowRightIcon from '../../assets/icons/arrow-right.svg'

export default function ButtonInCard({ available, screen }) {
  const navigation = useNavigation()

  return (
    <Pressable
      style={[styles.button, !available && styles.unavailable]}
      onPress={() => navigation.navigate(screen)}
    >
      <ArrowRightIcon height={20} width={20} />
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
    alignItems: 'center',
  },
  unavailable: {
    backgroundColor: '#878d8f',
  },
})
