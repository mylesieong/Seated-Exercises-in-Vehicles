import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import GoBackButton from '../Utilities/GoBackButton'

export default function Header() {
  const navigation = useNavigation()
  return (
    <View style={styles.header}>
      <GoBackButton
        onPress={() => {
          navigation.navigate('In Seat/ Stretching')
        }}
      />
      <Text style={styles.headerText}> Nice work!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 2,
  },
  headerText: {
    fontWeight: 500,
    marginRight: 20,
    fontSize: 20,
  },
})
