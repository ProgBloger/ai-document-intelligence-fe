import axios from 'axios';
import { PassportListItem } from '../models/PassportListItem';
import { Passport } from '../models/Passport';
import { PassportData } from "../models/PassportData";
import { RefinedPassportDataItem } from '../models/RefinedPassportDataItem';

console.log('API base URL:', process.env.REACT_APP_API_BASE_URL);

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/',
    timeout: 10000,
});

export const getPassports = async (): Promise<PassportListItem[]> => {
    try {
        const response = await apiClient.get<PassportListItem[]>('/passports');

        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const getPassportById = async (id: string) => {
    try {
        const encodedId = encodeURIComponent(id);
        const response = await apiClient.get<Passport>(`/passports/${encodedId}`);

        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export const uploadPassport = async (formData: FormData): Promise<void> => {
    try {
        await apiClient.post('/passports', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        console.error('Error uploading passport:', error);
        throw error;
    }
};

export const getPassportDataVerification = async (passportData: PassportData): Promise<RefinedPassportDataItem[]> => {
    try {
        const response = await apiClient.post<RefinedPassportDataItem[]>('/passportsData', passportData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error verifying passport data:', error);
        throw error;
    }
};

export const putPassportData = async (passportData: PassportData): Promise<void> => {
    try {
        const response = await apiClient.put('/passportsData', passportData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch(error) {
        console.error('Error saving passport data:', error);

        throw error;
    }
};

export const getPassportData = async (partitionKey: string, rowKey: string): Promise<RefinedPassportDataItem[]> => {
    try {
        const response = await apiClient.get<RefinedPassportDataItem[]>(`/passportsData/${partitionKey}/${rowKey}`);

        return response.data;
    } catch(error) {
        console.error('Error saving passport data:', error);

        throw error;
    }
};

export const getPassportSearch = async (query: string): Promise<string> => {
    try {
        const response = await apiClient.get<string>(`/passportsSearch?userQuery=${query}`, { timeout: 50000 });

        return response.data;
    } catch(error) {
        console.error('Error searching passport data:', error);

        throw error;
    }
};