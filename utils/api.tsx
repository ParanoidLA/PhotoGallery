// api.tsx
import axios from 'axios';

// Your Pixabay API key
const PIXABAY_API_KEY = '45430984-1e98cf0c2b6388b4c52cf8123';
const BASE_URL = 'https://pixabay.com/api/';

// Define the types for the API response
export interface Image {
    id: number;
    pageURL: string;
    type: string;
    tags: string;
    previewURL: string;
    largeImageURL: string;
    user: string;
    userImageURL: string;
}

export interface PixabayResponse {
    total: number;
    totalHits: number;
    hits: Image[];
}

// Function to fetch popular images (for Home screen)
export const fetchPopularImages = async (): Promise<Image[]> => {
    try {
        const response = await axios.get<PixabayResponse>(`${BASE_URL}?key=${PIXABAY_API_KEY}&order=popular`);
        return response.data.hits;
    } catch (error) {
        console.error('Error fetching popular images:', error);
        return [];
    }
};

// Function to fetch images based on a search query (for Search screen)
export const searchImages = async (query: string, filters?: string): Promise<Image[]> => {
    try {
        const response = await axios.get<PixabayResponse>(`${BASE_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}${filters ? `&${filters}` : ''}`);
        return response.data.hits;
    } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
    }
};

// Function to fetch images based on category (for Categories screen)
export const fetchImagesByCategory = async (category: string): Promise<Image[]> => {
    try {
        const response = await axios.get<PixabayResponse>(`${BASE_URL}?key=${PIXABAY_API_KEY}&category=${category}`);
        return response.data.hits;
    } catch (error) {
        console.error('Error fetching images by category:', error);
        return [];
    }
};
