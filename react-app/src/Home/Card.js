import { StyleSheet, View } from 'react-native'
import React from 'react'
import ImageInCard from './ImageInCard'
import TextInCard from './TextInCard'
import ButtonInCard from './ButtonInCard'
import ThemeColor from '../Utilities/ThemeColor'

export default function Card({ title, description, image, available, type, screen }) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.innerContainer}>
        <ImageInCard image={image} type={type} />
        <View style={styles.cardLowerPart}>
          <TextInCard title={title} description={description} available={available} />
          <ButtonInCard available={available} screen={screen}></ButtonInCard>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  innerContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 10,
  },
  cardLowerPart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ThemeColor.component,
    padding: 17,
  },
})
