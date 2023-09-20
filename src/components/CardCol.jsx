import { StyleSheet, Text, View, Image } from 'react-native'
import React, { memo } from 'react'

import setColor from '../utils/setColor'

export default memo(function Card({ item }) {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <View>
                    <Text style={[styles.text, styles.bold]}>{item.symbol.toUpperCase()}</Text>
                </View>
                <View>
                    <Image style={styles.icon} source={{ uri: item.image }} />
                </View>
            </View>

            <View style={{ flexDirection: 'column' }}>
                <Text style={[styles.text, { fontSize: 21 }]}>${item.current_price.toLocaleString()}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <Text style={[styles.text, styles.bold, setColor(item.price_change_24h)]}>${item.price_change_24h.toFixed(4)}</Text>
                    <Text style={[styles.textSmall, setColor(item.price_change_percentage_24h)]}>({item.price_change_percentage_24h.toFixed(2)}%)</Text>
                </View>
            </View>

        </View>
    )
})

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#3F4462',
        width: 170,
        height: 170,
        borderRadius: 20,
        justifyContent: 'space-between',
        color: '#FFFFFF',
        padding: 10,
        margin: 5
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    text: {
        color: '#FFFFFF',
        fontSize: 18
    },

    textSmall: {
        fontSize: 12
    },

    icon: {
        width: 35,
        height: 35
    },

    bold: {
        fontWeight: 'bold',
    }
})