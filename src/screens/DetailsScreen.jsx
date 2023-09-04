import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useQuery } from 'react-query'
import CoinService from '../api/CoinService'


export default function DetailsScreen({ navigation, route }) {
    const { id } = route.params
    const { data, isLoading, isError } = useQuery({
        queryKey: ['coin'],
        queryFn: () => CoinService.getOne(id)
    })

    const coin = data.coin

    console.log(data.coin);

    return (
        <View style={styles.wrap}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={{ width: 27, height: 27 }}
                        resizeMode="contain"
                        source={require('../../assets/img/back-white.png')}
                    />
                </TouchableOpacity>
                <View style={styles.name}>
                    <Image style={styles.icon} source={{ uri: coin.icon }} />
                    <View>
                        <Text style={styles.text}>{coin.name}</Text>
                        <Text style={styles.text}>{coin.symbol}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10,
        paddingTop: 30
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },

    name: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    icon: {
        width: 30,
        height: 30
    },

    text: {
        color: '#FFFFFF',
        fontSize: 16
    },
})