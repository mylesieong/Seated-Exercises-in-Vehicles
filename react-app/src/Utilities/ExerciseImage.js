import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SvgXml } from 'react-native-svg'
import ThemeColor from './ThemeColor'

export default function ExerciseImage({
  image,
  imageWidth,
  ImageHeight,
  containerWidth,
  containerHeight,
  containerRadius,
  backgroundColor,
}) {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    let timer = setInterval(() => {
      setFrame((frame) => frame + 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <View
      style={[
        styles.container,
        {
          width: containerWidth,
          height: containerHeight,
          borderRadius: containerRadius ? containerRadius : 0,
          backgroundColor: backgroundColor ? backgroundColor : ThemeColor.spacing,
        },
      ]}
    >
      {image[0] !== `` && (
        <SvgXml
          width={imageWidth ? imageWidth : '100%'}
          height={ImageHeight ? ImageHeight : '100%'}
          xml={image[frame % image.length]}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
