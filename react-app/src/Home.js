import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Setting"
        onPress={() =>
          navigation.navigate('Setting')
        }
      />
      <Button
        title="History"
        onPress={() =>
          navigation.navigate('History')
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
});
