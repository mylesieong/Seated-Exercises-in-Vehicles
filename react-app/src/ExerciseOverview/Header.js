import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GoBackButton from '../Utilities/GoBackButton'
import { useNavigation } from '@react-navigation/native'
import ThemeColor from '../Utilities/ThemeColor'

export default function Header() {
  const navigation = useNavigation()
  return (
    <View style={styles.header}>
      <GoBackButton onPress={() => navigation.navigate('Home')} color={ThemeColor.textColor} />
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
    color: ThemeColor.textColor,
    marginVertical: 4,
  },
})
