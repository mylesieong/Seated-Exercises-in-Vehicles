import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SvgXml } from 'react-native-svg'
import ThemeColor from '../Utilities/ThemeColor'

export default function ImageInCard({ image }) {
  return (
    <View style={styles.imageContainer}>
      <View style={styles.svgContainer}>
        <SvgXml width='100%' height='100%' xml={image} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: ThemeColor.spacing,
  },
})
