import { Alert, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import ArrowRotateLeft from '../../assets/icons/arrow-rotate-left.svg'
import Home from '../../assets/icons/home.svg'
import Train from '../../assets/icons/train.svg'
import Button from './Button'

export default function Buttons() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          navigation.navigate('In Seat/ Stretching')
        }}
        text='ONCE MORE'
        color='#64B5F6'
      >
        <ArrowRotateLeft height={20} width={20} />
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('Home')
        }}
        text='FINISH'
      >
        <Home height={20} width={20} />
      </Button>
      <Button
        onPress={() => {
          Alert.alert('Coming soon!')
        }}
        text='START JOURNEY'
      >
        <Train height={20} width={20} />
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})
