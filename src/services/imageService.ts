import axios from 'axios';
import { ImageDatatype } from '../interfaces';

// setting base URL for API
const API_URL = import.meta.env.VITE_BASE_URL + '/api/images';

// fetch the list of images (GET)
export const getImages = async (): Promise<ImageDatatype[]> => {
  try {
    const response = await axios.get(API_URL + '/get');
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
        throw new Error(`Error: ${error.message}`);
    } else {
        throw new Error('Error fetching images');
    }
  }
};

// update positions of images (PATCH)
export const updateImagePosition = async (imageData: ImageDatatype[]): Promise<ImageDatatype[]> => {
  try {
    const response = await axios.patch(API_URL + '/update', imageData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
        throw new Error(`Error: ${error.message}`);
    } else {
        throw new Error(`Error updating image`);
    }
  }
};
