import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
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
      ></Button>
      <Button
        onPress={() => {
          navigation.navigate('Home')
        }}
        text='FINISH'
      ></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})
