import { StyleSheet, Text, Pressable, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import GoBackButton from '../Utilities/GoBackButton'
import ThemeColor from '../Utilities/ThemeColor'

export default function Header({ setShowDetail }) {
  const navigation = useNavigation()
  const goBackOnPress = () => {
    Alert.alert('Exit', 'Leave current exercise?', [
      {
        text: 'NO',
        onPress: () => {
          return
        },
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          navigation.navigate('In Seat/ Stretching')
        },
      },
    ])
  }
  return (
    <Pressable style={styles.header} onPress={() => setShowDetail(false)}>
      <GoBackButton onPress={goBackOnPress} />
      <Text style={styles.title}>In Seat/ Stretching</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColor.manBackground,
  },
  title: {
    marginRight: 20,
    fontSize: 25,
    color: ThemeColor.textWhite,
    fontWeight: 500,
  },
})
