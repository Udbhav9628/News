// src/components/Pagination.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Pagination = ({ currentPage, onPageChange }: { currentPage: any; onPageChange: any; }) => {
    return (
        <View style={styles.paginationContainer}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => onPageChange(index + 1)}
                        style={[styles.pageButton, currentPage === index + 1 && styles.activePageButton]}
                    >
                        <Text style={[styles.pageText, currentPage === index + 1 && styles.activePageText]}>
                            {index + 1}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    pageButton: {
        marginHorizontal: 4,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        backgroundColor: '#f0f0f0',
    },
    activePageButton: {
        backgroundColor: '#007bff',
    },
    pageText: {
        fontSize: 16,
        color: '#666',
    },
    activePageText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});