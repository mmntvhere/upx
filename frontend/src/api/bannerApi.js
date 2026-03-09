import axios from './axiosInstance';

/**
 * Fetches all active banners from the backend.
 * Returns an array of banner objects.
 */
export const fetchBanners = async () => {
    try {
        const response = await axios.get('/banners');
        return response.data;
    } catch (error) {
        console.error('Error fetching banners:', error);
        return [];
    }
};
