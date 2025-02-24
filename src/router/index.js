import { createRouter, createWebHistory } from 'vue-router';
import InventoryListViews from '@/views/InventoryListViews.vue';
import InventoryEditViews from '@/views/InventoryEditViews.vue';
import InventoryDetailViews from '@/views/InventoryDetailViews.vue';
import InventoryCreateViews from '@/views/InventoryCreateViews.vue';

const routes = [
  { path: '/', name: "inventoryList", component: InventoryListViews },
  { path: '/inventoryCreate', name: "inventoryCreate", component: InventoryCreateViews },
  { path: '/edit', name: "editInventory", component: InventoryEditViews },
  { path: '/detail/:id', name: "detailInventory", component: InventoryDetailViews },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;