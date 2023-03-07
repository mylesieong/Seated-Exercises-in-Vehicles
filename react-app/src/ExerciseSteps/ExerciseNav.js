import { StyleSheet, View, Dimensions, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import ArrowLeftIcon from '../../assets/icons/arrow-tiny-left.svg'
import ArrowRightIcon from '../../assets/icons/arrow-tiny-right.svg'
import TickIcon from '../../assets/icons/tick.svg'

export default function ExerciseNav({ step, setStep }) {
  const navigation = useNavigation()
  const prevStep = () => {
    step !== 1 && setStep(step - 1)
  }
  const nextStep = () => {
    step == 8 ? navigation.navigate('Finish') : setStep(step + 1)
  }
  return (
    <View style={styles.container}>
      <Pressable style={step == 1 && styles.unusable} onPress={prevStep}>
        <ArrowLeftIcon height={35} width={35} />
      </Pressable>
      <Pressable style={styles.bigButton} onPress={nextStep}>
        <TickIcon height={35} width={35} />
      </Pressable>
      <Pressable onPress={nextStep}>
        <ArrowRightIcon height={35} width={35} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 60,
  },
  unusable: {
    opacity: 0.2,
  },
  bigButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#64b5f6',
    marginHorizontal: 30,
  },
})
