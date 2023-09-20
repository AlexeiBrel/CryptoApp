import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import setColor from '../utils/setColor'

export default memo(function CardRow({ item }) {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Image style={styles.icon} source={{ uri: item.image }} />
                <View style={{ gap: 5 }}>
                    <Text style={[styles.text, { color: '#D2D2EE' }]}>{item.name}</Text>
                    <Text style={[styles.text, styles.bold]}>${item.price_change_24h.toFixed(4)}</Text>
                </View>
            </View>
            <View style={styles.col}>
                <Text style={[styles.text, { fontSize: 21 }]}>${item.current_price.toLocaleString()}</Text>
                <Text style={[styles.textSmall, setColor(item.price_change_percentage_24h)]}>{item.price_change_percentage_24h.toFixed(2)}%</Text>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#2D334D',
        width: '100%',
        height: 75,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10
    },

    col: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 5
    },

    icon: {
        width: 40,
        height: 40
    },


    text: {
        color: '#FFFFFF',
        fontSize: 17
    },

    textSmall: {
        fontSize: 14
    },

    bold: {
        fontWeight: 'bold',
    }
})