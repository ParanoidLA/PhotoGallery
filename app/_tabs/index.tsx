import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { fetchPopularImages, Image as PixabayImage } from '../../utils/api';

const HomeScreen = () => {
    const [images, setImages] = useState<PixabayImage[]>([]);

    useEffect(() => {
        const loadImages = async () => {
            const fetchedImages = await fetchPopularImages();
            setImages(fetchedImages);
        };

        loadImages();
    }, []);

    return (
        <View>
            <FlatList
                data={images}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Image source={{ uri: item.previewURL }} style={{ width: 100, height: 100 }} />
                        <Text>{item.user}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default HomeScreen;
