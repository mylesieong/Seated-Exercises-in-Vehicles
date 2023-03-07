import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SvgXml } from 'react-native-svg'

export default function Image({ image }) {
  return (
    <View style={styles.image}>
      {image !== `` && <SvgXml width='80%' height='80%' xml={image} />}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 270,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9d9d9',
  },
})
