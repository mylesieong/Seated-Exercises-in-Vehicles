import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import Button from './Button'
import ThemeColor from '../Utilities/ThemeColor'

export default function Buttons({ id, title }) {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          navigation.navigate('ExerciseOverview', { id: id, title: title })
        }}
        text='ONCE MORE'
        color={ThemeColor.secondary}
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
