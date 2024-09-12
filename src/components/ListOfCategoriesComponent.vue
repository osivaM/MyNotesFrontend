<script setup>
import axios from 'axios';
import { ref, defineEmits } from 'vue';

const response = await axios({
    url: '/categories',
    baseURL: 'http://localhost:8080/api/content',
    method: 'get',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
const categories = response.data;
const event = ref(null);
const emit = defineEmits(['fetchedEvent']);

function clickHandler(item) {
    event.value = item;

    if (event.value) {
        emit('fetchedEvent', event.value);
    }
}
</script>

<template>
    <div class="list-of-categories-container">
        <h3 class="title">list of categories:</h3>
        <div class="list-of-categories-content">
            <div v-for="item in categories" :key="item">
                <button class="select-category-button" @click="clickHandler(item)">/{{ item.name }}</button>
            </div>
        </div>
        <div class="menu-buttons">
            <button class="menu-button" @click="clickHandler('create category')">create category</button>
        </div>
    </div>
</template>

<style scoped>
.list-of-categories-content {
    margin-bottom: 20px;
}

/* .select-category-button {
    width: 70%;
    margin: 10px;
    padding: 10px;
    background-color: #384c61;
    color: #dbdee4;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 1.3em;
    cursor: pointer;
    font-family: 'better-vcr-5.4', sans-serif;
} */

/* .menu-button {
    width: 90%;
    margin: 10px;
    padding: 10px;
    background-color: #3368a1;
    color: #dbdee4;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 1.3em;
    cursor: pointer;
    font-family: 'better-vcr-5.4', sans-serif;
} */
</style>