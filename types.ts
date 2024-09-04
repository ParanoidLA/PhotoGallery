import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { PixabayImage } from './utils/api'; // Adjust the path as needed

// Define the parameter list for the stack navigator
export type RootStackParamList = {
  Main: undefined;
  Search: { category: string }; // Parameter for SearchScreen
  GalleryScreen: { images: PixabayImage[]; initialIndex: number }; // Parameters for GalleryScreen
};

// Define the navigation prop types for each screen
export type GalleryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GalleryScreen'>;
export type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

// Define the route prop types for each screen
export type GalleryScreenRouteProp = RouteProp<RootStackParamList, 'GalleryScreen'>;
export type SearchScreenRouteProp = RouteProp<RootStackParamList, 'Search'>;