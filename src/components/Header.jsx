import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { memo, useState } from 'react'
import { useToggleCard } from '../context/CardContext';
import { useSearch } from '../context/SearchContext';

export default memo(function Header() {
    const { search, setSearch } = useSearch()
    const { toggleCard, setToggleCard, setKey } = useToggleCard()

    console.log('search', search);

    const toggleNumColumns = () => {
        setKey((prevKey) => prevKey + 1); // Изменяем ключ для перерендера FlatList
        setToggleCard((prevToggle) => !prevToggle);
    };

    return (
        <View style={styles.header}>
            <View style={styles.wrap}>
                {/* <Text style={styles.text}>SearchCoins</Text> */}
                <TextInput
                    placeholder='Coin search'
                    placeholderTextColor='#FFFFFF'
                    style={styles.search}
                    value={search}
                    onChangeText={text => setSearch(text)}
                />
                <View style={styles.row}>
                    <TouchableOpacity style={styles.btn} onPress={toggleNumColumns}>
                        <Image
                            resizeMode="contain"
                            style={styles.icon}
                            source={toggleCard
                                ? require('../../assets/img/btn-col.png')
                                : require('../../assets/img/btn-row.png')
                            }
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    header: {
        height: 70,
        justifyContent: 'center',
    },

    icon: {
        width: 30,
        height: 30,
    },

    btn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        color: '#FFFFFF',
        fontSize: 20
    },

    wrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    row: {
        flexDirection: 'row',
        gap: 10
    },

    search: {
        backgroundColor: '#3F4462',
        color: '#FFFFFF',
        fontSize: 18,
        width: '80%',
        borderRadius: 10,
        padding: 7
    },
})