import { StyleSheet, View } from 'react-native'
import React from 'react'
import HappyMan from '../../assets/exercises_image/happy-man.svg'
import ThemeColor from '../Utilities/ThemeColor'

export default function Image() {
  return (
    <View style={styles.container}>
      <View style={styles.outline}>
        <View style={styles.image}>
          <HappyMan height='70%' width='70%' backgroundColor={ThemeColor.manBackground} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColor.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  outline: {
    backgroundColor: ThemeColor.textWhite,
    height: 220,
    width: 310,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 190,
    width: 190,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColor.manBackground,
    borderRadius: 360,
  },
})
