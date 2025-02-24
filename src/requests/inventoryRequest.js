import axios from "axios";
const API_URL = 'https://6712a5e16c5f5ced662443cb.mockapi.io/api/v2';

export default {
    async getAllInventory() {
        try {
            const response = await axios.get(`${API_URL}/inventories`,);
            return response
        } catch (error) {
            console.log('Ошибка', error)
        }
    },
    async getById(id) {
        try {
            const response = await axios.get(`${API_URL}/inventories/${id}`,);
            console.log(response.data, 'inventary')
            return response;

        } catch (error) {
            console.log('Ошибка', error)
        }
    },
    async addInventory() {
        try {
            const response = await axios.post(`${API_URL}/inventories`);
            console.log(response.data, 'inventary')
            return response
        } catch (error) {
            console.log('Ошибка', error)
        }
    },
    async updateInventory(id, inventoryData) {
        try {
            console.log(inventoryData, 'request')
            const response = await axios.put(`${API_URL}/inventories/${id}`, inventoryData);
            console.log(response.data, 'inventaryUpdate')
            return response
        } catch (error) {
            console.log('Ошибка', error)
        }
    },
    async removeInventory(id) {
        try {
            const response = await axios.delete(`${API_URL}/inventories/${id}`);
            console.log(response.data, 'inventary')
            return response
        } catch (error) {
            console.log('Ошибка', error)
        }
    },
    async getAllCategories() {
        try {
            const response = await axios.get(`${API_URL}/categories`);
            console.log(response.data, 'categories')
            return response
        } catch (error) {
            console.log('Ошибка', error)
        }
    },
};

