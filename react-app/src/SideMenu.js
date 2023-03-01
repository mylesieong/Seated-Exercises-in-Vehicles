import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, Button } from 'react-native'

export default function SideMenu({ }) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Button title="Setting" onPress={() => navigation.navigate('Setting')} />
            <Button title="History" onPress={() => navigation.navigate('History')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        zIndex: 1000,
        backgroundColor: '#D0D7DD',
        width: 300,
        minHeight: 600,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
