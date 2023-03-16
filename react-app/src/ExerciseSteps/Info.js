import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import ThemeColor from '../Utilities/ThemeColor'
import QuestionMark from '../../assets/icons/questionmark.svg'

export default function Info({ stepDetail, setShowDetail }) {
  const { title, description } = stepDetail

  return (
    <View style={styles.info}>
      <Text style={styles.description}>{description}</Text>
      <Pressable style={styles.titleContainer} onPress={() => setShowDetail(true)}>
        <Text style={styles.title}>{title}</Text>
        <View>
          <QuestionMark height={25} width={25} style={styles.icon} />
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  info: {
    padding: 25,
    paddingBottom: 0,
    flex: 1,
  },
  description: {
    fontSize: 18,
    color: ThemeColor.textColor,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 500,
    lineHeight: 60,
    marginRight: 10,
    color: ThemeColor.textColor,
  },
  instructionContainer: {
    marginBottom: 15,
  },
  instruction: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: ThemeColor.textColor,
  },
  icon: {
    color: ThemeColor.textColor,
  },
})
