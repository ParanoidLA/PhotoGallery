import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for the context
interface UserContextProps {
  username: string;
  theme: 'light' | 'dark';
  likedPhotos: string[]; // Array of photo URLs
  setUsername: (name: string) => void;
  toggleTheme: () => void;
  addLikedPhoto: (photoUrl: string) => void;
  removeLikedPhoto: (photoUrl: string) => void;
}

// Create the context with default values
const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>('User');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [likedPhotos, setLikedPhotos] = useState<string[]>([]);

  useEffect(() => {
    // Load context from AsyncStorage on mount
    const loadContext = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedTheme = await AsyncStorage.getItem('theme');
        const storedLikedPhotos = await AsyncStorage.getItem('likedPhotos');

        if (storedUsername) setUsername(storedUsername);
        if (storedTheme) setTheme(storedTheme as 'light' | 'dark');
        if (storedLikedPhotos) setLikedPhotos(JSON.parse(storedLikedPhotos));
      } catch (error) {
        console.error('Failed to load context from storage:', error);
      }
    };

    loadContext();
  }, []);

  useEffect(() => {
    // Save context to AsyncStorage on update
    const saveContext = async () => {
      try {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('theme', theme);
        await AsyncStorage.setItem('likedPhotos', JSON.stringify(likedPhotos));
      } catch (error) {
        console.error('Failed to save context to storage:', error);
      }
    };

    saveContext();
  }, [username, theme, likedPhotos]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const addLikedPhoto = (photoUrl: string) => {
    setLikedPhotos((prevPhotos) => [...prevPhotos, photoUrl]);
  };

  const removeLikedPhoto = (photoUrl: string) => {
    setLikedPhotos((prevPhotos) => prevPhotos.filter(p => p !== photoUrl));
  };

  return (
    <UserContext.Provider
      value={{
        username,
        theme,
        likedPhotos,
        setUsername,
        toggleTheme,
        addLikedPhoto,
        removeLikedPhoto,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the context
export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};