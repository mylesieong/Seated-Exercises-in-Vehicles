import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemeColor from '../Utilities/ThemeColor'

export default function Info({ moves, time, format }) {
  return (
    <View style={styles.container}>
      {[
        [`Moves`, moves],
        [`Minutes`, time],
        [`Format`, format],
      ].map((item, keys) => {
        return (
          <View key={keys} style={[styles.wrapper]}>
            <Text style={[styles.info_value, styles.textColor]}>{item[1]}</Text>
            <Text style={styles.info}>{item[0]}</Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    marginHorizontal: 40,
  },
  textColor: {
    color: ThemeColor.text,
  },
  wrapper: {
    alignItems: 'center',
    flex: 1,
  },
  info_value: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: 'NotoSansExtraBold',
    transform: [{ scaleX: 0.875 }],
    marginBottom: -4,
  },
  info: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'NotoSans',
    transform: [{ scaleX: 0.875 }],
    color: ThemeColor.textGray,
  },
})
