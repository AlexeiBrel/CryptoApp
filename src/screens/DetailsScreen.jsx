import { StyleSheet, Text, TouchableOpacity, View, Image, useWindowDimensions, ScrollView } from 'react-native'
import { useQuery } from 'react-query'
import CoinService from '../api/CoinService'
import Loader from '../components/Loader'
import { Row, Table } from 'react-native-table-component'

import setColor from '../utils/setColor'


export default function DetailsScreen({ navigation, route }) {
    const { id } = route.params
    const { data, isLoading, isError } = useQuery({
        queryKey: ['coin'],
        queryFn: () => CoinService.getOne(id)
    })

    if (isLoading) {
        console.log('Loading');
        return <Loader />
    }

    return (
        <ScrollView style={styles.wrap}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
                    <Image
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                        source={require('../../assets/img/back-white.png')}
                    />
                </TouchableOpacity>
                <View style={styles.name}>
                    <Image style={styles.icon} source={{ uri: data.image.small }} />
                    <View>
                        <Text style={[styles.text, styles.bold]}>{data.name}</Text>
                        <Text style={[styles.text, { fontSize: 14 }]}>{data.symbol.toUpperCase()}/USD</Text>
                    </View>
                </View>
            </View>

            <View style={styles.main}>
                <View>
                    <Text style={styles.price}>${data.market_data.current_price.usd.toLocaleString()}</Text>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: 5 }}>
                        <Text style={[styles.text, styles.bold, setColor(data.market_data.price_change_24h)]}>${data.market_data.price_change_24h.toFixed(4)}</Text>
                        <Text style={[styles.text, { fontSize: 14 }, setColor(data.market_data.price_change_24h)]}>({data.market_data.price_change_percentage_24h.toFixed(4)}%)</Text>
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={[styles.text, styles.bold]}>Price change percentage</Text>

                    <Table style={{ marginTop: 30 }} borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row textStyle={styles.headText} data={['1h', '24d', '7d', '30d', '1y']} />
                        <Row textStyle={styles.bodyText}
                            data={[data.market_data.price_change_percentage_1h_in_currency.usd.toFixed(2),
                            data.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2),
                            data.market_data.price_change_percentage_7d_in_currency.usd.toFixed(2),
                            data.market_data.price_change_percentage_30d_in_currency.usd.toFixed(2),
                            data.market_data.price_change_percentage_1y_in_currency.usd.toFixed(2)]}
                        />
                    </Table>
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={[styles.text, styles.bold]}>Description</Text>
                    <Text style={[styles.text, { fontSize: 16, marginTop: 10 }]}>{data.description.en || 'No description'}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10,
        paddingTop: 30,
        paddingBottom: 60
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },

    btnBack: {
        backgroundColor: '#363739',
        borderRadius: 50,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },

    name: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    icon: {
        width: 40,
        height: 40
    },

    text: {
        color: '#FFFFFF',
        fontSize: 18
    },

    bold: {
        fontWeight: 'bold'
    },

    main: {
        paddingTop: 20
    },

    headText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    bodyText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center'
    },

    price: {
        fontSize: 30,
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
})