import { StyleSheet, View, Text, Pressable, Alert } from 'react-native'
import React from 'react'
import HomeMan from '../../assets/exercises_image/home-man'
import TextInCard from './TextInCard'
import { useNavigation } from '@react-navigation/native'
import ThemeColor from '../Utilities/ThemeColor'

export default function Card({ item }) {
  const { id, title, description, image, available } = item
  const navigation = useNavigation()
  return (
    <Pressable
      onPress={
        available
          ? () => navigation.navigate('ExerciseOverview', { id: id, title: title })
          : () => {
              Alert.alert('Coming soon!')
            }
      }
    >
      <View style={styles.cardContainer}>
        <View style={styles.innerContainer}>
          {/* upper part */}
          <View style={styles.cardUpperPart}>
            <View style={styles.imageContainer}>
              <HomeMan height={80} width={80} image={image} />
            </View>
            <View style={styles.sentence}>
              <Text style={styles.exerciseTitle} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.exerciseDetail} numberOfLines={3}>
                {description}
              </Text>
            </View>
          </View>
          {/* lower part */}
          <View style={styles.cardLowerPart}>
            <TextInCard description={description} available={available} />
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 5,
    paddingBottom: 10,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  innerContainer: {
    backgroundColor: ThemeColor.contrastColor,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 10,
    padding: 10,
  },
  cardUpperPart: {
    flexDirection: 'row',
  },
  imageContainer: {
    height: 90,
    padding: 10,
    width: 90,
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  sentence: {
    alignContent: 'space-around',
  },
  exerciseTitle: {
    color: ThemeColor.textColor,
    fontWeight: 800,
    paddingLeft: 5,
    fontSize: 20,
    textAlign: 'left',
  },
  exerciseDetail: {
    textAlign: 'left',
    fontStyle: 'italic',
    color: ThemeColor.textGrey,
    padding: 5,
    fontSize: 13,
    marginRight: 50,
    paddingRight: 30,
  },
  cardLowerPart: {
    flex: 1,
    flexDirection: 'row',
    fontWeight: 400,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ThemeColor.contrastColor,
    padding: 5,
  },
})
