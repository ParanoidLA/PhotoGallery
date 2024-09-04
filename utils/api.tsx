import axios from 'axios';

// Your Pixabay API key
const PIXABAY_API_KEY = '45430984-1e98cf0c2b6388b4c52cf8123';
const BASE_URL = 'https://pixabay.com/api/';

// Define the types for the API response
export interface PixabayImage {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  largeImageURL: string;
  user: string;
  userImageURL: string;
  views: number;  // Ensure this is available in the API response
  likes: number;  // Ensure this is available in the API response
}

interface PixabayResponse {
  hits: PixabayImage[];
}


// Function to fetch popular images with pagination
export const fetchPopularImages = async (page: number = 1): Promise<PixabayImage[]> => {
    try {
      const response = await axios.get<PixabayResponse>(`${BASE_URL}?key=${PIXABAY_API_KEY}&order=popular&page=${page}`);
      return response.data.hits;
    } catch (error) {
      console.error('Error fetching popular images:', error);
      return [];
    }
  };

// Function to fetch images based on a search query
export const searchImages = async (query: string, filters?: string): Promise<PixabayImage[]> => {
  try {
    const response = await axios.get<PixabayResponse>(`${BASE_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}${filters ? `&${filters}` : ''}`);
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};

// Function to fetch images by query
export const fetchImagesByQuery = async (query: string): Promise<PixabayImage[]> => {
  try {
    const response = await axios.get<PixabayResponse>(`${BASE_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}`);
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching images by query:', error);
    return [];
  }
};

// Function to fetch images based on category
export const fetchImagesByCategory = async (category: string): Promise<PixabayImage[]> => {
  try {
    const response = await axios.get<PixabayResponse>(`${BASE_URL}?key=${PIXABAY_API_KEY}&category=${category}`);
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching images by category:', error);
    return [];
  }
};