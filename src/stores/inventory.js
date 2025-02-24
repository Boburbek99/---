import { defineStore } from 'pinia';
import { ref } from 'vue';
import inventoryRequest from '@/requests/inventoryRequest';

export const useInventoryStore = defineStore('inventory', () => {
  const inventories = ref([]);
  const categories = ref([]);

  const fetchInventories = async () => {
    const response = await inventoryRequest.getAllInventory();
    inventories.value = response.data;
  };
  const getByIdInventories = async (id) => {
    const response = await inventoryRequest.getById(id);
    inventories.value = response.data;
  };
  const fetchCategories = async () => {
    const response = await inventoryRequest.getAllCategories();
    categories.value = await response.data;
  };

  const addInventory = async (inventory) => {
    const response = await inventoryRequest.addInventory(inventory)
    inventories.value.push(await response.data);
  };

  const updateInventory = async (id, inventory) => {
    const response = await inventoryRequest.updateInventory(id, inventory)
    const updatedInventory = response.data;
    const index = inventories.value.findIndex((item) => item.id === id);
    inventories.value[index] = updatedInventory;
  };

  const deleteInventory = async (id) => {
    const response = await inventoryRequest.updateInventory(id)
    inventories.value = inventories.value.filter((item) => item.id !== id);
  };

  return {
    inventories,
    categories,
    fetchInventories,
    fetchCategories,
    addInventory,
    updateInventory,
    deleteInventory,
    getByIdInventories
  };
});