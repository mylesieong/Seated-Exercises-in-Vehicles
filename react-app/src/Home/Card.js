import { StyleSheet, View } from 'react-native'
import React from 'react'
import ImageInCard from './ImageInCard'
import TextInCard from './TextInCard'
import ButtonInCard from './ButtonInCard'
import ThemeColor from '../Utilities/ThemeColor'

export default function Card({ title, description, image, available, type, screen }) {
  return (
    <View style={styles.cardContainer}>
      <ImageInCard image={image} type={type} />
      <View style={styles.cardLowerPart}>
        <TextInCard title={title} description={description} available={available} />
        <ButtonInCard available={available} screen={screen}></ButtonInCard>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.58,
    shadowRadius: 10,
    backgroundColor: ThemeColor.componentColor,
    elevation: 24,
  },

  cardLowerPart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ThemeColor.componentColor,
    padding: 17,
  },
})
