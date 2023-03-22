import React from 'react'
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native'
import CancelIcon from '../../assets/icons/cancel.svg'
import ThemeColor from '../Utilities/ThemeColor'
import ExerciseImage from '../Utilities/ExerciseImage'
import ArrowBlueRight from '../../assets/icons/arrow-blue-right.svg'
import ArrowBlueLeft from '../../assets/icons/arrow-blue-left.svg'
import ArrowGreyRight from '../../assets/icons/arrow-grey-right.svg'
import ArrowGreyLeft from '../../assets/icons/arrow-grey-left.svg'
import { useRoute } from '@react-navigation/native'
import StartExerciseButton from './StartExerciseButton'

export default function ExerciseDetail({ item, totalSteps, setSelectedStep, setShowDetail }) {
  const { title, description, instruction, image } = item
  const path = useRoute().name
  const hasStarted = path === 'Exercise Steps'

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View
          style={[
            styles.buttonContainer,
            { justifyContent: hasStarted ? 'flex-end' : 'space-between' },
          ]}
        >
          {!hasStarted && (
            <View style={styles.arrows}>
              {item.id === 1 ? (
                <ArrowGreyLeft />
              ) : (
                <Pressable onPress={() => setSelectedStep((prev) => prev - 1)}>
                  <ArrowBlueLeft />
                </Pressable>
              )}
              <Text style={styles.progress}>
                {item.id}/{totalSteps}
              </Text>
              {item.id === totalSteps ? (
                <ArrowGreyRight />
              ) : (
                <Pressable onPress={() => setSelectedStep((prev) => prev + 1)}>
                  <ArrowBlueRight />
                </Pressable>
              )}
            </View>
          )}
          <Pressable style={styles.singleButton} onPress={() => setShowDetail(false)}>
            <CancelIcon />
            <Text style={styles.closeText}> Close </Text>
          </Pressable>
        </View>
        <View style={styles.image}>
          <ExerciseImage
            image={image}
            containerHeight={260}
            containerWidth={'100%'}
            containerRadius={10}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.instructionContainer}>
          <FlatList
            data={instruction}
            renderItem={({ item }) => <Text style={styles.instruction}>{item}</Text>}
          />
        </View>
      </View>
      {!hasStarted && (
        <View style={[styles.startButtonContainer, styles.shadow]}>
          <StartExerciseButton />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: '10%',
    left: 0,
    height: '95%',
    width: '100%',
    zIndex: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10,

    elevation: 24,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: ThemeColor.contrastColor,
    padding: '5%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  arrows: {
    display: 'flex',
    flexDirection: 'row',
  },
  progress: {
    fontWeight: 700,
    fontSize: 15,
    paddingHorizontal: 15,
    color: ThemeColor.textColor,
  },
  singleButton: {
    display: 'flex',
    backgroundColor: ThemeColor.componentColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  closeText: {
    fontWeight: 600,
    fontSize: 15,
    color: ThemeColor.textColor,
  },
  image: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontWeight: 700,
    fontSize: 25,
    marginBottom: 10,
    color: ThemeColor.textColor,
  },
  description: {
    fontWeight: 500,
    fontSize: 16,
    marginBottom: 10,
    color: ThemeColor.textColor,
  },
  instructionContainer: {
    flex: 1,
  },
  instruction: {
    fontWeight: 400,
    fontSize: 16,
    marginBottom: 10,
    color: ThemeColor.textColor,
  },
  startButtonContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    backgroundColor: ThemeColor.contrastColor,
    flexDirection: 'row',
    paddingBottom: 50,
    paddingTop: 10,
  },
  ...Platform.select({
    ios: {
      shadow: {
        shadowColor: '#9A9A9A',
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.0,
      },
    },
    android: {
      shadow: {
        shadowColor: '#9A9A9A',
        elevation: 5,
      },
    },
  }),
})
