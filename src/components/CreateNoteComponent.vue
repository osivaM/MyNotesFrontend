<script setup>
import axios from 'axios';
import { ref, defineModel, defineEmits } from 'vue';

const category = defineModel();
const noteName = ref('');
const noteLink = ref('https://');
const noteContent = ref('');
const event = ref(null);
const errorMessage = ref('');
const emit = defineEmits(['fetchedEvent']);

function clickHandler(item) {
    event.value = item;
    
    if (event.value) {
        emit('fetchedEvent', event.value);
    }
}
async function createNoteHandler() {
    await axios({
        url: '/create-note',
        method: 'post',
        baseURL: `${process.env.VUE_APP_API_URL}/api/content`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: {
            name: noteName.value,
            link: noteLink.value,
            content: noteContent.value,
            categoryId: category.value.id
        }
    }).then(function(response) {
        event.value = response.data;

        if (event.value) {
            emit('fetchedEvent', event.value);    
        }
    }).catch(function(error) {
        if (error.response.status === 400) {
            errorMessage.value = error.response.data.message;
        }
    })
}
</script>

<template>
    <div class="create-note-container">
        <h3 class="title">create note:</h3>
        <form @submit.prevent="createNoteHandler" class="create-note-form">
            <div class="form-group">
                <label for="name">name ></label>
                <input type="text" id="name" v-model="noteName" required />
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            </div>
            <div class="form-group">
                <label for="link">link ></label>
                <input type="text" id="link" v-model="noteLink" />
            </div>
            <div class="form-group">
                <label for="content">content ></label>
                <textarea rows="10" id="content" v-model="noteContent" style="margin-bottom: 20px;"></textarea>
            </div>
            <button type="submit" class="create-button">create</button>
        </form>
        <div class="menu-buttons">
            <button @click="clickHandler('back from create note')" class="menu-button">back</button>
        </div>
    </div>
</template>

<style scoped></style>