import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GoBackButton from '../Utilities/GoBackButton'
import { useNavigation } from '@react-navigation/native'

export default function Header() {
  const navigation = useNavigation()
  return (
    <View style={styles.header}>
      <GoBackButton onPress={() => navigation.navigate('Home')} />
      <Text style={styles.title}>In Seat/ Stretching</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffca28',
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 25,
    color: '#000000',
    marginVertical: 4,
  },
})
