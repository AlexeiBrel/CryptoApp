import { FlatList, StyleSheet, View, RefreshControl, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import CoinService from '../api/CoinService'
import Loader from '../components/Loader'
import CardCol from '../components/CardCol'
import CardRow from '../components/CardRow'
import Header from '../components/Header'
import { useToggleCard } from '../context/CardContext'
import { useSearch } from '../context/SearchContext'



export default function HomeScreen({ navigation }) {
    const [page, setPage] = useState(0)
    const { toggleCard, key } = useToggleCard()
    const { search } = useSearch()

    const { data, isLoading, isSuccess, isFetching, isError, isPreviousData } = useQuery({
        queryKey: ['coins', page],
        queryFn: () => CoinService.getAll(page),
        keepPreviousData: true
    })

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id })}>
            {toggleCard ? <CardRow item={item} /> : <CardCol item={item} />}
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
            <Header />
            {isSuccess &&
                <FlatList
                    key={key}
                    horizontal={false}
                    numColumns={toggleCard ? 1 : 2}
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
        backgroundColor: '#1B2035',
        padding: 10,
    },

    flatList: {
        margin: 'auto',
        width: '100%',
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