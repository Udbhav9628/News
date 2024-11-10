// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Pagination from './pagination';

const API_KEY = '3f7580c038a841da8454a6c8eb1d1dca';
const PAGE_SIZE = 10; // Number of news articles per page

// News item component
const NewsItem = ({ title, description, imageUrl }) => (
  <TouchableOpacity style={styles.newsItem}>
    <Image source={{ uri: imageUrl || 'https://via.placeholder.com/150' }} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchNews();
  }, [page]);

  const fetchNews = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything`, {
        params: {
          q: 'tech', // Replace 'keyword' with any search term
          apiKey: API_KEY,
          page,
          pageSize: PAGE_SIZE,
        },
      });

      // Update news articles and manage pagination
      if (response.data.articles.length > 0) {
        setNews([...response.data.articles]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreNews = (selectedPage: any) => {
    console.log('hasMore ==', hasMore, ' loading', loading)
    if (hasMore && !loading) {
      setPage(selectedPage);
    }
  };

  const refreshNews = () => {
    setRefreshing(true);
    setPage(1);
    setNews([]);
    setHasMore(true);
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>News App</Text>
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <NewsItem title={item.title} description={item.description} imageUrl={item.urlToImage} />
        )}
        refreshing={refreshing}
        onRefresh={refreshNews}
      />
      <Pagination currentPage={page} onPageChange={(page: any) => loadMoreNews(page)} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  newsItem: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
