import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { fetchPopularImages, PixabayImage } from '../../utils/api';
import { useNavigation } from '@react-navigation/native';
import { Searchbar ,ActivityIndicator} from 'react-native-paper';
import { useUserContext } from '../../context/UserContext';
import { GalleryScreenNavigationProp, SearchScreenNavigationProp } from '../../types';
import { useFonts } from 'expo-font';
import CardComponent from '../components/CardComponent';

const HomeScreen = () => {
  const { theme } = useUserContext();
  const [images, setImages] = useState<PixabayImage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1); // Current page
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<SearchScreenNavigationProp | GalleryScreenNavigationProp>();

  const [fontsLoaded] = useFonts({
    Montserrat: require('../../assets/fonts/Montserrat-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    loadImages(page);
  }, [page]);

  const loadImages = async (page: number) => {
    if (loading) return;

    setLoading(true);
    const popularImages = await fetchPopularImages(page);
    setImages((prevImages) => [...prevImages, ...popularImages]); // Append new images
    setLoading(false);
  };

  const handleEndReached = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1); // Increment the page number to load more images
    }
  };

  const handleImagePress = (index: number) => {
    navigation.navigate('GalleryScreen', { images, initialIndex: index });
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigation.navigate('SearchScreen', { query: searchQuery });
    }
  };

  const renderItem = ({ item, index }: { item: PixabayImage; index: number }) => (
    <CardComponent item={item} onPress={handleImagePress} index={index} />
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : '#fff' }]}>
      <Text style={[styles.title, { color: theme === 'dark' ? '#fff' : '#000' }]}>
        Pixabay Gallery
      </Text>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearchSubmit}
        style={[styles.searchbar, { backgroundColor: theme === 'dark' ? '#555' : '#eee' }]}
      />
       <FlatList
      data={images}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? (
          <View style={styles.footerContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : null
      }
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 30,
  },
  listContent: {
    paddingBottom: 20,
  },
  searchbar: {
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    fontFamily: 'FrankRuhlLibre',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#FF6347',
  },
});

export default HomeScreen;