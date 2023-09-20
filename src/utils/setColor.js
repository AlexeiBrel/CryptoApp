import { StyleSheet } from 'react-native'

export default function setColor(number) {
    return number < 0 ? styles.redText : styles.greenText;
}

const styles = StyleSheet.create({
    redText: {
        color: '#E44144',
    },

    greenText: {
        color: '#56F69A',
    },
})