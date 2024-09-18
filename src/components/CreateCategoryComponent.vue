<script setup>
import axios from 'axios';
import { ref, defineEmits } from 'vue';

const event = ref(null);
const emit = defineEmits(['fetchedEvent']);
const categoryName = ref('');
const errorMessage = ref('');

function clickHandler(item) {
    event.value = item;

    if (event.value) {
        emit('fetchedEvent', event.value);
    }
}
async function createCategoryHandler() {
    await axios({
        url: '/create-category',
        method: 'post',
        baseURL: 'http://localhost:8080/api/content',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: {
            name: categoryName.value
        }
    }).then(function(response) {
        event.value = response.data;
        emit('fetchedEvent', event.value);
    }).catch(function(error) {
        if (error.response.status === 400) {
            categoryName.value = '';
            errorMessage.value = error.response.data.message;
        }
    });
}
</script>

<template>
    <div class="category-container">
        <h3 class="title">create category:</h3>
        <form @submit.prevent="createCategoryHandler" class="create-category-form">
            <div class="form-group">
                <label for="name">name ></label>
                <input type="text" id="name" v-model="categoryName" :class="{ 'isInvalid': errorMessage }" required />
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            </div>
            <button type="submit" class="create-button">create</button>
        </form>
        <div class="menu-buttons">
            <button class="menu-button" @click="clickHandler('back from create category')">back</button>
        </div>
    </div>
</template>

<style scoped></style>