import React from 'react'
import { StyleSheet, Text, SafeAreaView, View, Pressable, FlatList } from 'react-native'
import CancelIcon from '../../assets/icons/cancel.svg'
import ThemeColor from '../Utilities/ThemeColor'
import ExerciseImage from '../Utilities/ExerciseImage'

export default function ExerciseDetail({ item, setShowDetail }) {
  const { title, description, instruction, image } = item
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Pressable style={styles.buttonContainer} onPress={() => setShowDetail(false)}>
          <View style={styles.button}>
            <CancelIcon />
            <Text> Close </Text>
          </View>
        </Pressable>
        <View style={styles.image}>
          <ExerciseImage
            image={image}
            containerHeight={260}
            containerWidth={380}
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: ThemeColor.backgroundColor,
    top: 150,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 10,
    padding: 20,
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
    backgroundColor: ThemeColor.backgroundColor,
    padding: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  button: {
    display: 'flex',
    backgroundColor: ThemeColor.componentColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
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
    height: 230,
  },
  instruction: {
    fontWeight: 400,
    fontSize: 16,
    marginBottom: 10,
    color: ThemeColor.textColor,
  },
})
