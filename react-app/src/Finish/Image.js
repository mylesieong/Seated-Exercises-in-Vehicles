import { StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import HappyMan from '../../assets/exercises_image/happy-man.svg'
import Lottie from 'lottie-react-native'

export default function Image() {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <HappyMan />
      </View>
      <View style={styles.animationContainer}>
        <Lottie source={require('../../assets/animation/62717-confetti.json')} autoPlay loop />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  image: {
    height: 270,
    width: 270,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d0d7dd',
    borderRadius: 200,
  },
  animationContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
  },
})
