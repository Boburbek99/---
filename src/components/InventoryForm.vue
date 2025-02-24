<template>
  <main class="container mx-auto">
    <div class="card flex justify-center mt-10">
      <Select v-model="selectedTitle" :options="inventoryData" option-label="title"
        placeholder="Выберите инвентарияй для редактирование" class="w-full md:w-56">
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex items-center">
            <div>{{ slotProps.value.title }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex items-center">
            <div>{{ slotProps.option.title }}</div>
          </div>
        </template>
      </Select>
    </div>
    <fieldset class="border w-full max-w-2xl h-full mt-8 mx-auto rounded-2xl">
      <Form class="m-5" :model="formData" @submit="handleSubmit">
        <div class="item-form flex flex-col gap-8">
          <div class="field">
            <div class="flex flex-col gap-2">
              <label for="title">Title</label>
              <InputText id="title" v-model="formData.title" placeholder="Title" class="w-full" />
            </div>
          </div>
          <div class="field">
            <div class="flex flex-col gap-2">
              <label for="category">Category</label>
              <Select v-model="formData.category" :options="categories.map(item => item.title)"
                placeholder="Select a City" class="w-full md:w-56" />
            </div>
          </div>
          <div class="field">
            <div class="flex flex-col gap-2">
              <label for="price">Price</label>
              <InputText id="price" v-model="formData.price" placeholder="Price" type="number" class="w-full" />
            </div>
          </div>
          <div class="field">
            <div class="flex flex-col gap-2">
              <label for="count">Count</label>
              <InputText id="count" v-model="formData.count" placeholder="Count" type="number" class="w-full" />
            </div>
          </div>
          <div class="field flex flex-col gap-2">
            <label>Аватар</label>
            <div class="gallery-preview flex flex-wrap gap-4">
              <InputText id="count" v-model="formData.avatar" placeholder="Вставьте URL Аватар" type="text"
                class="w-full" />
              <label>Фото галерея</label>
              <InputText v-model="newPhotoUrl.photos" placeholder="Вставьте URL фото" class="w-full " />
              <Button label=" Добавить" @click="addPhoto" class="mt-2" />
            </div>
          </div>
          <div v-if="formData.photos" class="w-full">
            <h3 class="text-lg font-semibold mb-2">Галерея:</h3>
            <div class="flex flex-wrap gap-4">
              <div v-for="(photo, index) in formData.photos" :key="index" class="relative w-30   h-30">
                <img :src="photo" alt="Фото" class="w-24 h-24 ms-3 mt-3  object-cover rounded-lg absolute" />
                <Button icon="pi pi-times text-xs" v-if="photo" severity="danger" @click="removePhoto(index)" rounded
                  aria-label="Cancel" />
              </div>
            </div>
          </div>
          <div class="field">
            <div class="flex flex-col gap-2">
              <label for="over_label">Over Label</label>
              <Textarea id="over_label" v-model="formData.description" rows="5" cols="30" placeholder="Description"
                style="resize: none" class="w-full" />
            </div>
          </div>
          <div class="info text-center" v-if="message">
            {{ message }}
          </div>
          <div class="buttons flex justify-start gap-4">
            <Button type="submit" label="Save" />
            <Button label="Delete" severity="danger" @click="deleteInventory(formData.id)" />
          </div>
        </div>
      </Form>
    </fieldset>
  </main>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import Select from 'primevue/select';

import FileUpload from 'primevue/fileupload';

import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

import Button from 'primevue/button';
import { Form } from '@primevue/forms';
import { useInventoryStore } from '@/stores/inventory';
import { tint } from '@primevue/themes';

const newPhotoUrl = ref([]);
const stores = useInventoryStore();
let message = ref('')

defineProps({
  inventoryData: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true
  }
});

const selectedTitle = ref(null);
const formData = ref({});

watch(selectedTitle, (newValue) => {
  if (newValue) {
    formData.value = { ...newValue };
  } else {
    formData.value = {};
  }
});

watch(stores.inventories, (newValue) => {
  if (newValue) {
    message.value = "Данный успешно изменен!"
  }
  else {
    message.value = "Ошибка при изменеия данные"
  }
})

const deleteInventory = (id) => {
  stores.deleteInventory(id);
  message.value = "Данные удалено!"
  console.log(stores.inventories)
  formData.value = {}
}
const handleSubmit = async () => {
  await stores.updateInventory(selectedTitle.value.id, formData.value);
  formData.value = {};
};

const addPhoto = () => {
  if (newPhotoUrl.value.photos) {
    if (!formData.value.photos) {
      formData.value.photos = [];
    }
    formData.value.photos.push(newPhotoUrl.value.photos);
    newPhotoUrl.value.photos = '';
  }
};

const removePhoto = (index) => {
  if (formData.value.photos && formData.value.photos.length > index) {
    formData.value.photos.splice(index, 1);
  }
};
</script>
