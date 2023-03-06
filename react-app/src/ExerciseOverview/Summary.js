import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GoBackButton from '../Utilities/GoBackButton'

export default function Summary({ moves, time, format }) {
  return (
    <View style={styles.container}>
      <GoBackButton />
      <Text style={styles.title}>In Seat/ Stretching</Text>
      <Text style={styles.description}>
        When travel a long trip in a confined seat, stretching will help reduce neck pain and back
        pain, improve the blood circulation as long as lower the risk of DVT(Deep Vein Thrombosis).
      </Text>
      <View style={styles.bottomPart}>
        {[
          [`Moves`, moves],
          [`Time`, time],
          [`Format`, format],
        ].map((item, keys) => {
          return (
            <View key={keys} style={styles.wrapper}>
              <Text style={styles.summary}>{item[0]}</Text>
              <Text style={[styles.summary, { fontWeight: 500 }]}>{item[1]}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffca28',
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 19,
    color: '#000000',
    textAlign: 'center',
    marginVertical: 4,
  },
  description: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 16,
    alignItems: 'center',
    marginVertical: 30,
  },
  bottomPart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  wrapper: {
    alignItems: 'center',
  },
  summary: {
    fontSize: 16,
    lineHeight: 26,
  },
})
