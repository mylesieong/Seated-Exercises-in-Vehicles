import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SvgXml } from 'react-native-svg'

export default function ImageInCard({ image, type }) {
  return (
    <View
      style={[
        styles.imageContainer,
        type == 'standalone' ? styles.standaloneCardColor : styles.journeyCardColor
      ]}
    >
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
    height: 110,
    padding: 17
  },
  svgContainer: {
    flex: 1,
    width: '100%'
  },
  standaloneCardColor: {
    backgroundColor: '#FFCA28'
  },
  journeyCardColor: {
    backgroundColor: '#64B5F6'
  }
})
