import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import ThemeColor from '../Utilities/ThemeColor'
import QuestionMark from '../../assets/icons/questionmark.svg'

export default function Info({ stepDetail, setShowDetail }) {
  const { title, description } = stepDetail

  return (
    <View style={styles.info}>
      <Pressable style={styles.titleContainer} onPress={() => setShowDetail(true)}>
        <Text style={styles.title}>{title}</Text>
        <View>
          <QuestionMark height={24} width={24} />
        </View>
      </Pressable>
      <Text style={styles.description}>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  info: {
    flex: 1,
    paddingTop: 20,
  },
  description: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'NotoSansMidBold',
    color: ThemeColor.text,
    paddingHorizontal: 25,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontFamily: 'NotoSansMidExtraBold',
    fontSize: 24,
    lineHeight: 28,
    marginRight: 10,
    color: ThemeColor.text,
  },
})
