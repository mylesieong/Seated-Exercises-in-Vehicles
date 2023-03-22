import { StyleSheet, Text, View, Platform } from 'react-native'
import React from 'react'
import ThemeColor from '../Utilities/ThemeColor'
import StartExerciseButton from './StartExerciseButton'

export default function Summary({ title, moves, time, format }) {
  return (
    <View style={[styles.container, styles.shadow]}>
      <Text style={[styles.textColor, styles.title]}>{title}</Text>
      <Text style={[styles.description, styles.textColor]}>
        Stretching will help reduce neck pain pain and back pain, improve the blood circulation as
        long as lower the risk of DVT(Deep Vain Thrombosis).
      </Text>
      <View style={styles.bottomPart}>
        {[
          [`Moves`, moves],
          [`Minutes`, time],
          [`Format`, format],
        ].map((item, keys, array) => {
          return (
            <View
              key={keys}
              style={[
                styles.wrapper,
                keys !== array.length - 1 && {
                  borderRightWidth: 2,
                  borderColor: ThemeColor.spacing,
                },
              ]}
            >
              <Text style={[styles.summary_value, styles.textColor]}>{item[1]}</Text>
              <Text style={styles.summary}>{item[0]}</Text>
            </View>
          )
        })}
      </View>
      <StartExerciseButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColor.component,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 10,
    top: 66,
    marginHorizontal: 15,
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'NotoSansExtraBold',
    fontWeight: 800,
    fontSize: 28,
    lineHeight: 32,
    alignSelf: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    transform: [{ scaleX: 0.9 }],
  },
  textColor: {
    color: ThemeColor.text,
  },
  description: {
    fontWeight: 400,
    fontSize: 15,
    lineHeight: 20,
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    transform: [{ scaleX: 0.875 }],
  },
  bottomPart: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 14,
  },
  wrapper: {
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
    maxHeight: 48,
  },
  summary_value: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: 'NotoSansExtraBold',
    transform: [{ scaleX: 0.875 }],
    marginBottom: -4,
  },
  summary: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'NotoSans',
    transform: [{ scaleX: 0.875 }],
    color: ThemeColor.textGray,
  },
  ...Platform.select({
    ios: {
      shadow: {
        shadowColor: ThemeColor.shadow,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
    },
    android: {
      shadow: {
        shadowColor: ThemeColor.shadow,
        elevation: 5,
      },
    },
  }),
})
