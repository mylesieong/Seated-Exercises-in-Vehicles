import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import GoBackButton from '../Utilities/GoBackButton'
import ThemeColor from '../Utilities/ThemeColor'

export default function Header({ step, totalStep }) {
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
    <View style={styles.header}>
      <GoBackButton onPress={goBackOnPress} />
      <Text style={styles.headerText}>
        {step} of {totalStep}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerText: {
    marginRight: 20,
    fontSize: 18,
    color: ThemeColor.textColor,
  },
})
