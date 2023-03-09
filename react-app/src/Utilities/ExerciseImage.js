import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SvgXml } from 'react-native-svg'

export default function ExerciseImage({
  image,
  imageWidth,
  ImageHeight,
  containerWidth,
  containerHeight,
}) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    let timer = setInterval(() => {
      setStep((step) => step + 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <View style={[styles.container, { width: containerWidth, height: containerHeight }]}>
      {image[0] !== `` && (
        <SvgXml
          width={imageWidth ? imageWidth : '100%'}
          height={ImageHeight ? ImageHeight : '100%'}
          xml={image[step % image.length]}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9d9d9',
  },
})
