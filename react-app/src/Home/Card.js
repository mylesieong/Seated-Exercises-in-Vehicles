import { StyleSheet, View } from 'react-native'
import React from 'react'
import ImageInCard from './ImageInCard'
import TextInCard from './TextInCard'
import ButtonInCard from './ButtonInCard'

export default function Card({ title, description, image, available, type }) {
  return (
    <View style={styles.cardContainer}>
      <ImageInCard image={image} type={type} />
      <View style={styles.cardLowerPart}>
        <TextInCard title={title} description={description} available={available} />
        <ButtonInCard></ButtonInCard>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginBottom: 20
  },

  cardLowerPart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#cfd8dc',
    padding: 17
  }
})
