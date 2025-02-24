<template>
  <main class="container mx-auto">
    <div v-if="route.name !== 'inventoryCreate'" class="card flex justify-center gap-5 mt-10">
      <label for="">Выберите инвентарь для редактирования:</label>
      <Select v-model="selectedTitle" :options="inventoryData" option-label="title"
        placeholder="Выберите инвентарь для редактирования" class="w-full md:w-56">
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

    <fieldset class="shadow border max-w-6xl h-full mt-8 mx-auto rounded-2xl">
      <Form class="mt-5" :model="formData" @submit="handleSubmit">
        <div class="item flex justify-around ">
          <div class="item-first-block w-full mx-5">
            <div class="field flex flex-col gap-4">
              <label for="title">Название</label>
              <InputText id="title" v-model="formData.title" placeholder="Название" class="w-full"
                :class="{ 'p-invalid text-red-600': v$.title.$error }" />
              <small class="field-error text-red-600 text-sm" v-if="v$.title.$error">
                {{ v$.title.$errors[0].$message }}
              </small>

              <label for="category">Категория</label>
              <Select v-model="formData.category" :options="categories.map(item => item.title)"
                placeholder="Выберите категорию" class="w-full md:w-56"
                :class="{ 'p-invalid  text-red-600 ': v$.category.$error }" />
              <small class="field-error  text-red-600 text-sm" v-if="v$.category.$error">
                {{ v$.category.$errors[0].$message }}
              </small>
            </div>

            <div class="field flex flex-col gap-4 mt-4">
              <label for="price">Цена</label>
              <InputText id="price" v-model="formData.price" placeholder="Цена" type="number" class="w-full"
                :class="{ 'p-invalid  text-red-600 ': v$.price.$error }" />
              <small class="field-error" v-if="v$.price.$error">
                {{ v$.price.$errors[0].$message }}
              </small>

              <label for="count">Количество</label>
              <InputText id="count" v-model="formData.count" placeholder="Количество" type="number" class="w-full"
                :class="{ 'p-invalid text-red-600': v$.count.$error }" />
              <small class="field-error text-red-600 text-sm" v-if="v$.count.$error">
                {{ v$.count.$errors[0].$message }}
              </small>
            </div>
          </div>

          <div class="item-block-gallery w-full mx-5">
            <div class="field flex flex-col gap-4">
              <label>Аватар</label>
              <InputText id="avatar" v-model="formData.avatar" placeholder="Вставьте URL аватара" type="text"
                class="w-full" :class="{ 'p-invalid text-red-600': v$.avatar.$error }" />
              <small class="field-error  text-red-600 text-sm" v-if="v$.avatar.$error">
                {{ v$.avatar.$errors[0].$message }}
              </small>

              <label>Фотогалерея</label>
              <InputText v-model="newPhotoUrl.gallery" placeholder="Вставьте URL фото" class="w-full" />
              <Button label="Добавить" @click="addPhoto" class="my-2" />
            </div>

            <div v-if="formData.gallery" class="w-full mt-4">
              <h3 class="text-lg font-semibold mb-2">Галерея:</h3>
              <div class="flex flex-wrap gap-4">
                <div v-for="(photo, index) in formData.gallery" :key="index" class="relative w-30 h-30">
                  <img :src="photo" alt="Фото" class="w-24 h-24 ms-3 mt-3 object-cover rounded-lg absolute" />
                  <Button icon="pi pi-times text-xs" v-if="photo" severity="danger" @click="removePhoto(index)" rounded
                    aria-label="Отмена" />
                </div>
              </div>
              <small class="field-error  text-red-600 text-sm" v-if="v$.gallery.$error">
                {{ v$.gallery.$errors[0].$message }}
              </small>
            </div>

            <div class="field mt-4">
              <div class="flex flex-col gap-2">
                <label for="description">Описание</label>
                <Textarea id="description" v-model="formData.description" rows="5" cols="30" placeholder="Описание"
                  style="resize: none" class="w-full" :class="{ 'p-invalid text-red-600': v$.description.$error }" />
                <small class="field-error text-red-600 text-sm" v-if="v$.description.$error">
                  {{ v$.description.$errors[0].$message }}
                </small>
              </div>
            </div>
          </div>
        </div>

        <div class="info text-center my-3" v-if="message">
          {{ message }}
        </div>

        <div class="buttons flex justify-start gap-4 m-5">
          <Button type="submit" label="Сохранить" />
          <Button v-if="route.name !== 'inventoryCreate'" label="Удалить" severity="danger"
            @click="deleteInventory(formData.id)" />
        </div>
      </Form>
    </fieldset>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { useInventoryValidation } from '@/validation/validation';
import { useInventoryStore } from '@/stores/inventory';
import Select from 'primevue/select';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { Form } from '@primevue/forms';
import { useRoute } from 'vue-router';


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

const stores = useInventoryStore();
const selectedTitle = ref(null);
const newPhotoUrl = ref({ gallery: '' });
const message = ref('');
const formData = ref({});

const rules = useInventoryValidation(formData, stores);
const v$ = useVuelidate(rules, formData);

const route = useRoute();

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    message.value = 'Пожалуйста, исправьте ошибки в форме';
    return;
  }
  try {
    if (route.name === "inventoryCreate") {
      await stores.addInventory(formData.value);
      message.value = 'Данные успешно сохранены!';
    }
    else {
      await stores.updateInventory(selectedTitle.value.id, formData.value);
      message.value = 'Данные успешно изменены!';
    }
    resetForm();

  } catch (error) {
    message.value = 'Ошибка при сохранении данных';
  }
};

const addPhoto = () => {
  if (newPhotoUrl.value.gallery) {
    if (!formData.value.gallery) {
      formData.value.gallery = [];
    }
    formData.value.gallery.push(newPhotoUrl.value.gallery);
    newPhotoUrl.value.gallery = '';
    v$.value.gallery.$touch();
  }
};

const removePhoto = (index) => {
  formData.value.gallery.splice(index, 1);
  v$.value.gallery.$touch();
};

const deleteInventory = async (id) => {
  try {
    await stores.deleteInventory(id);
    message.value = 'Данные успешно удалены!';
    resetForm();
  } catch (error) {
    message.value = 'Ошибка при удалении';
  }
};

const resetForm = () => {
  formData.value = {};
  v$.value.$reset();
};

watch(selectedTitle, (newValue) => {
  if (newValue) {
    formData.value = { ...newValue };
    v$.value.$reset();
  } else {
    resetForm();
  }
});
</script>

<style scoped></style>