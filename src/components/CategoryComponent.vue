<script setup>
import axios from 'axios';
import { ref, defineEmits, defineModel } from 'vue';

const category = defineModel();
const response = await axios({
    url: '/category',
    baseURL: `${process.env.VUE_APP_API_URL}/api/content`,
    method: 'get',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    params: {
        id: category.value.id
    }
});
const notes = response.data;
const event = ref(null);
const emit = defineEmits(['fetchedEvent']);

async function clickHandler(item) {
    event.value = item;

    if (event.value === 'delete category') {
        const isConfirmed = confirm('Confirm the deletion of the category');

        if (isConfirmed) {
            await axios({
                url: '/delete-category',
                baseURL: '${process.env.VUE_APP_API_URL}/api/content',
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    id: category.value.id
                }
            }).then(function () {
                event.value = 'back from category';
            });
        } else {
            return;
        }
    }

    if (event.value) {
        emit('fetchedEvent', event.value);
    }
}
</script>

<template>
    <div class="category-container">
        <h3 class="title">category: {{ category.name }}</h3>
        <div class="list-of-notes-content">
            <div v-for="item in notes" :key="item">
                <button class="select-note-button" @click="clickHandler(item)">{{ item.name }}</button>
            </div>
        </div>
        <div class="menu-buttons">
            <button class="menu-button" @click="clickHandler('create note')">create note</button>
            <button class="menu-button" @click="clickHandler('delete category')">delete category</button>
            <button class="menu-button" @click="clickHandler('back from category')">back</button>
        </div>
    </div>
</template>

<style scoped>
.list-of-notes-content {
    margin-bottom: 20px;
}
</style>