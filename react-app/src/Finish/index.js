import { StyleSheet, Dimensions, BackHandler } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from './Header'
import Image from './Image'
import Buttons from './Buttons'
import Lottie from 'lottie-react-native'
import { useEffect } from 'react'
import PageTemplate from '../Utilities/PageTemplate'

export default function Finish() {
  const navigation = useNavigation()

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('In Seat/ Stretching')
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => backHandler.remove()
  }, [])

  return (
    <PageTemplate topBarColor={'#ffca28'}>
      <Header />
      <Image />
      <Lottie
        source={require('../../assets/animation/62717-confetti.json')}
        autoPlay
        loop
        style={styles.animation}
        resizeMode='cover'
      />
      <Buttons />
    </PageTemplate>
  )
}

const styles = StyleSheet.create({
  animation: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    top: 0,
  },
})
