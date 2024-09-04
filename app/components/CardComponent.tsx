import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, IconButton } from 'react-native-paper'; // Correct import for IconButton
import { PixabayImage } from '../../utils/api'; // Adjust the path
import { useUserContext } from '../../context/UserContext'; // Adjust the path

interface CardComponentProps {
  item: PixabayImage;
  onPress: (index: number) => void;
  index: number;
}

const CardComponent: React.FC<CardComponentProps> = ({ item, onPress, index }) => {
  const { theme } = useUserContext();

  const isDarkMode = theme === 'dark';
  const textColor = isDarkMode ? '#fff' : '#000';
  const backgroundColor = isDarkMode ? '#222' : '#fff';

  return (
    <TouchableOpacity onPress={() => onPress(index)} style={styles.cardContainer}>
      <View style={[styles.cardWrapper, { backgroundColor }]}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: item.previewURL }} style={styles.image} />
        </Card>
        <View style={styles.contentContainer}>
          <View style={styles.tagsContainer}>
            <IconButton
              icon="tag"
              size={12}
              iconColor={textColor}
              style={styles.icon}
              onPress={() => {}}
            />
            <Text style={[styles.tagsText, { color: textColor }]}>
              {item.tags}
            </Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.infoContainer}>
              <IconButton
                icon="eye"
                size={12}
                iconColor={textColor}
                style={styles.icon}
                onPress={() => {}}
              />
              <Text style={[styles.infoText, { color: textColor }]}>
                {item.views}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <IconButton
                icon="heart"
                size={12}
                iconColor={textColor}
                style={styles.icon}
                onPress={() => {}}
              />
              <Text style={[styles.infoText, { color: textColor }]}>
                {item.likes}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 4, // Reduced margin to make the cards more compact
  },
  cardWrapper: {
    borderRadius: 6,
    overflow: 'hidden',
  },
  card: {
    borderRadius: 6, // Reduced border-radius for a sharper look
    padding: 0,
  },
  image: {
    height: 140, // Slightly reduced image height for a more compact look
    transform: [{ scale: 1.05 }], // Zoom in the image by 5%
  },
  contentContainer: {
    padding: 8, // Adding padding for the content inside the wrapper
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1, // Adjusted margin for spacing
    marginLeft: -15, // Reduced the left margin to bring the icon closer to the edge
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align items to the start
    marginTop: -15, // Adjusted margin for spacing
    marginLeft: -15,
    marginBottom: -10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10, // Reduced space between view count and heart icon
  },
  icon: {
    marginRight: 2, // Further reduced space between icon and text
    padding: 0,
  },
  tagsText: {
    flexWrap: 'wrap',
    fontFamily: 'FrankRuhlLibre', // Changed font family
    fontSize: 13, // Reduced font size for a more compact design
    fontWeight: '600', // Adjusted font weight
    flex: 1,
    marginLeft: -3,
  },
  infoText: {
    fontSize: 12, // Reduced font size to match tagsText
    marginLeft: -3,
    fontFamily: 'FrankRuhlLibre', // Changed font family
    fontWeight: '600', // Adjusted font weight
  },
});

export default CardComponent;