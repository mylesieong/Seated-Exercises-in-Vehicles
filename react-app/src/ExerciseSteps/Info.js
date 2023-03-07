import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import ArrowUpIcon from '../../assets/icons/arrow-tiny-up.svg'
import ArrowDownIcon from '../../assets/icons/arrow-tiny-down.svg'

export default function Info({ title, description, instruction }) {
  const [instructionVisible, setInstructionVisible] = useState(false)
  return (
    <View style={styles.info}>
      <Text style={styles.description}>{description}</Text>
      <Pressable
        style={styles.titleContainer}
        onPress={() => setInstructionVisible(!instructionVisible)}
      >
        <Text style={styles.title}>{title}</Text>
        <View style={instructionVisible && styles.switch}>
          <ArrowUpIcon height={18} width={18} />
          <ArrowDownIcon height={18} width={18} />
        </View>
      </Pressable>
      <FlatList
        style={instructionVisible ? styles.instructionContainer : { display: 'none' }}
        data={instruction}
        renderItem={({ item }) => <Text style={styles.instruction}>{item}</Text>}
      />
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
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 500,
    lineHeight: 60,
    marginRight: 20,
  },
  switch: {
    flexDirection: 'column-reverse',
  },
  instructionContainer: {
    marginBottom: 15,
  },
  instruction: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
})
