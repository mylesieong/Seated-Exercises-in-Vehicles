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

export default function ExerciseDetail({
  id,
  title: exerciseTitle,
  item,
  totalSteps,
  setSelectedStep,
  setShowDetail,
}) {
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
            backgroundColor={ThemeColor.manBackground}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.instructionContainer}>
          <FlatList
            data={instruction}
            contentContainerStyle={{ paddingBottom: 30 }}
            renderItem={({ item }) => <Text style={styles.instruction}>{item}</Text>}
          />
        </View>
      </View>
      {!hasStarted && (
        <View style={[styles.startButtonContainer, styles.shadow]}>
          <StartExerciseButton id={id} title={exerciseTitle} />
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
    shadowColor: ThemeColor.shadow,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 24,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: ThemeColor.tab,
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
    fontFamily: 'NotoSansMidBold',
    fontSize: 15,
    lineHeight: 20,
    paddingHorizontal: 15,
    color: ThemeColor.text,
  },
  singleButton: {
    display: 'flex',
    backgroundColor: ThemeColor.spacing,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  closeText: {
    fontFamily: 'NotoSansMidBold',
    fontSize: 15,
    lineHeight: 20,
    color: ThemeColor.textBlack,
  },
  image: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'NotoSansMidExtraBold',
    fontSize: 24,
    lineHeight: 28,
    marginBottom: 10,
    color: ThemeColor.text,
  },
  description: {
    fontFamily: 'NotoSansMidBold',
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 10,
    color: ThemeColor.text,
  },
  instructionContainer: {
    flex: 1,
  },
  instruction: {
    fontFamily: 'NotoSansMid',
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 10,
    color: ThemeColor.text,
  },
  startButtonContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    backgroundColor: ThemeColor.tab,
    flexDirection: 'row',
    paddingBottom: 50,
    paddingTop: 10,
  },
  ...Platform.select({
    ios: {
      shadow: {
        shadowColor: ThemeColor.shadow,
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
        shadowColor: ThemeColor.shadow,
        elevation: 5,
      },
    },
  }),
})
