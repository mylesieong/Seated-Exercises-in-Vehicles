import { StyleSheet, Pressable, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ArrowRightIcon from '../../assets/icons/arrow-right.svg'
import ThemeColor from '../Utilities/ThemeColor'

export default function ButtonInCard({ available, id, title }) {
  const navigation = useNavigation()

  return (
    <Pressable
      style={[styles.button, !available && styles.unavailable]}
      onPress={
        available
          ? () => navigation.navigate('ExerciseOverview', { id: id, title: title })
          : () => {
              Alert.alert('Coming soon!')
            }
      }
    >
      <ArrowRightIcon height={20} width={20} style={styles.icon} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    width: 48,
    height: 48,
    backgroundColor: ThemeColor.text,
    borderRadius: 50,
    alignItems: 'center',
  },
  unavailable: {
    backgroundColor: '#878d8f',
  },
  icon: {
    color: ThemeColor.component,
  },
})
