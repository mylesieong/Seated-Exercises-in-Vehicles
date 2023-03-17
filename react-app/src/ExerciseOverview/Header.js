import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GoBackButton from '../Utilities/GoBackButton'
import { useNavigation } from '@react-navigation/native'
import ThemeColor from '../Utilities/ThemeColor'

export default function Header() {
  const navigation = useNavigation()
  return (
    <View style={styles.header}>
      <GoBackButton onPress={() => navigation.navigate('Home')} color={ThemeColor.titleTextColor} />
      <Text style={styles.title}>Stretching on the Seat</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 190,
    alignItems: 'center',
    backgroundColor: '#FFB300',
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    color: ThemeColor.titleTextColor,
    marginTop: 13,
    fontFamily: 'NotoSansBold',
    transform: [{ scaleX: 0.875 }],
  },
})
