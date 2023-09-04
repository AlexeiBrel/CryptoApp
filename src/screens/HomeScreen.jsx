import { FlatList, StyleSheet, View, RefreshControl, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

import Card from '../components/Card'
import CoinService from '../api/CoinService'
import Loader from '../components/Loader'

export default function HomeScreen({ navigation }) {
    const [page, setPage] = useState(0)
    const { data, isLoading, isSuccess, isFetching, isError, isPreviousData } = useQuery({
        queryKey: ['coins', page],
        queryFn: () => CoinService.getAll(page),
        keepPreviousData: true
    })


    const loadMoreCoins = () => {
        if (!isPreviousData) {
            setPage(prev => prev + 10)
        }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id })}>
            <Card item={item} />
        </TouchableOpacity>
    )

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Text style={styles.warningText}>Something went wrong!</Text>
    }

    return (
        <View style={styles.wrap}>
            {isSuccess &&
                <FlatList
                    horizontal={false}
                    numColumns={2}
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    style={styles.flatList}
                // onEndReached={loadMoreCoins}
                // onEndReachedThreshold={0}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#121212',
        // padding: 10,                
    },

    flatList: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    warningText: {
        marginTop: 'auto',
        marginBottom: 'auto',
        color: 'red',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
        letterSpacing: 0.36,
        textAlign: 'center'
    }
})