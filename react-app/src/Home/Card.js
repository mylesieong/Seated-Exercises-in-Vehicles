import { StyleSheet, View, Text, Pressable } from 'react-native'
import React from 'react'
import HomeMan from '../../assets/exercises_image/home-man'
import TextInCard from './TextInCard'
import { useNavigation } from '@react-navigation/native'
import ThemeColor from '../Utilities/ThemeColor'

export default function Card({ item }) {
  const { id, title, description, image } = item
  const navigation = useNavigation()
  return (
    <Pressable onPress={() => navigation.navigate('ExerciseOverview', { id: id, title: title })}>
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
            <TextInCard description={description} />
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
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: ThemeColor.shadow,
    shadowColor: ThemeColor.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  innerContainer: {
    backgroundColor: ThemeColor.component,
    borderRadius: 10,
    overflow: 'hidden',
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
    backgroundColor: ThemeColor.spacing,
  },
  sentence: {
    alignContent: 'space-around',
  },
  exerciseTitle: {
    color: ThemeColor.text,
    fontWeight: 800,
    paddingLeft: 5,
    fontSize: 20,
    textAlign: 'left',
  },
  exerciseDetail: {
    textAlign: 'left',
    fontStyle: 'italic',
    color: ThemeColor.textGray,
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
    backgroundColor: ThemeColor.component,
    padding: 5,
  },
})
