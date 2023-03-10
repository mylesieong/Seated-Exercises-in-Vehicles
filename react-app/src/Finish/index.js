import { StyleSheet, SafeAreaView, View, Dimensions } from 'react-native'
import React from 'react'
import Header from './Header'
import Image from './Image'
import Buttons from './Buttons'
import Lottie from 'lottie-react-native'

export default function Finish() {
  return (
    <View style={styles.upperWrapper}>
      <SafeAreaView />
      <SafeAreaView style={styles.lowerWrapper}>
        <Header />
        <Image />
        <Buttons />
        <Lottie
          source={require('../../assets/animation/62717-confetti.json')}
          autoPlay
          loop
          style={styles.animation}
          resizeMode='cover'
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  upperWrapper: {
    flex: 1,
    backgroundColor: '#ffca28',
    paddingTop: 35,
  },
  lowerWrapper: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  animation: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    top: 0,
  },
})
