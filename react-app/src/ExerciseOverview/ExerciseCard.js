import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SvgXml } from 'react-native-svg'

export default function ExerciseCard({ id, title, description, image }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.id}>{id}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.image}>
        {!image == `` && <SvgXml width='100%' height='100%' xml={image} />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    margin: 15,
  },
  id: {
    fontStyle: 'italic',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 500,
    height: 30,
  },
  image: {
    width: 64,
    height: 64,
    backgroundColor: '#d9d9d9',
  },
})
