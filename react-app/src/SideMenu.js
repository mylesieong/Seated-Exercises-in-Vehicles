import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, Button } from 'react-native'

export default function SideMenu({ setShowMenu }) {
    const navigation = useNavigation();
    const handlePress = (screen) => {
        navigation.navigate(screen);
        setShowMenu(false);
    }

    return (
        <View style={styles.container}>
            <Button title="Home" onPress={() => handlePress('Home')} />
            <Button title="Setting" onPress={() => handlePress('Setting')} />
            <Button title="History" onPress={() => handlePress('History')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        zIndex: 10,
        backgroundColor: '#D0D7DD',
        width: '70%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    }
})
