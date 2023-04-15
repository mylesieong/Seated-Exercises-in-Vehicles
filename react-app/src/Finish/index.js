import { StyleSheet, Dimensions, BackHandler } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Header from './Header'
import Image from './Image'
import Buttons from './Buttons'
import Info from './Info'
import Lottie from 'lottie-react-native'
import { useEffect } from 'react'
import PageTemplate from '../Utilities/PageTemplate'
import { CORE_EXERCISE_DATA } from '../../data/CoreExerciseData'
import { STRETCHING_EXERCISE_DATA } from '../../data/StretchingExerciseData'
import ThemeColor from '../Utilities/ThemeColor'

export default function Finish({ db, setReset }) {
  const navigation = useNavigation()
  const route = useRoute()
  const { id, title } = route.params

  const exercises = { 1: STRETCHING_EXERCISE_DATA, 2: CORE_EXERCISE_DATA }
  const exercise = exercises[id]

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('insert into Record (exercise_name, timestamp) values (?, ?)', [
        title,
        new Date().getTime(),
      ])
    })
    setReset((prev) => !prev)
    const backAction = () => {
      navigation.goBack()
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => backHandler.remove()
  }, [])

  return (
    <>
      <Lottie
        source={require('../../assets/animation/62717-confetti.json')}
        autoPlay
        loop
        style={styles.animation}
        resizeMode='cover'
      />
      <PageTemplate topBarColor={ThemeColor.background} bottomColor={ThemeColor.background}>
        <Header />
        <Info
          moves={exercise.length}
          // These coming two lines are kinda hard code
          time={id == 1 ? 12 : 14}
          format={`Sitting`}
        ></Info>
        <Image />
        <Buttons id={id} title={title} />
      </PageTemplate>
    </>
  )
}

const styles = StyleSheet.create({
  animation: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    top: 0,
    zIndex: 1,
    pointerEvents: 'none',
  },
})
