import { StyleSheet, View, Text, Pressable } from 'react-native'
import React from 'react'
import ImageInCard from './ImageInCard'
import TextInCard from './TextInCard'
import { useNavigation } from '@react-navigation/native'
import ThemeColor from '../Utilities/ThemeColor'

export default function Card({ item }) {
  const { id, title, description, image, summary } = item
  const navigation = useNavigation()
  return (
    <Pressable onPress={() => navigation.navigate('ExerciseOverview', { id: id, title: title })}>
      <View style={styles.cardContainer}>
        <View style={styles.innerContainer}>
          {/* upper part */}
          <View style={styles.cardUpperPart}>
            <View style={styles.imageContainer}>
              <ImageInCard height={80} width={80} image={image} />
            </View>
            <View style={styles.sentence}>
              <Text style={styles.exerciseTitle} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.exerciseDetail} numberOfLines={3}>
                {summary}
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
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  cardUpperPart: {
    flexDirection: 'row',
    alignContent: 'space-around',
  },
  imageContainer: {
    height: 80,
    width: 80,
  },
  sentence: {
    alignContent: 'space-around',
    paddingHorizontal: 8,
    flex: 1,
  },
  exerciseTitle: {
    color: ThemeColor.text,
    fontFamily: 'NotoSansExtraBold',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'left',
  },
  exerciseDetail: {
    paddingTop: 5,
    fontFamily: 'NotoSansBasicBold',
    color: ThemeColor.textGray,
    fontSize: 10,
    lineHeight: 14,
  },
  cardLowerPart: {
    paddingTop: 10,
  },
})
