<script setup>
import axios from 'axios';
import { ref, defineEmits, defineModel } from 'vue';

const event = ref(null);
const emit = defineEmits(['fetchedEvent']);
const note = defineModel();
const errorMessage = ref('');

async function clickHandler(item) {
    event.value = item;

    if (event.value === 'delete note') {
        const isConfirmed = confirm('Confirm the deletion of the note');

        if (isConfirmed) {
            await axios({
                url: '/delete-note',
                baseURL: 'http://localhost:7070/api/content',
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    id: note.value.id
                }
            }).then(function () {
                event.value = 'back from note';
            })
        } else {
            return;
        }
    }

    if (event.value) {
        emit('fetchedEvent', event.value);
    }
}
function formatDate(dateStr) {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
function editNote() {
    axios({
        url: '/edit-note',
        baseURL: 'http://localhost:7070/api/content',
        method: 'patch',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: {
            id: note.value.id,
            name: note.value.name,
            link: note.value.link,
            content: note.value.content
        }
    }).catch(function (error) {
        if (error.response.status === 400) {
            errorMessage.value = error.response.data.message;
        }
    });
}
</script>

<template>
    <div class="note-container">
        <h3 class="title">note: {{ note.name }}</h3>
        <div class="note-content">
            <p>{{ formatDate(note.createDate) }}</p>
            <form @submit.prevent="editNote" class="edit-note-form">
                <div class="form-group">
                    <label for="name">link ></label>
                    <input type="text" id="name" v-model="note.name" />
                    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
                </div>
                <div v-if="note.link" style="margin: 20px;">
                    <a :href="note.link" target="_blank">{{ note.link }}</a>
                </div>
                <div class="form-group">
                    <label for="link">link ></label>
                    <input type="text" id="link" v-model="note.link" />
                </div>
                <div class="form-group">
                    <label for="content">content ></label>
                    <textarea rows="10" id="content" v-model="note.content" style="margin-bottom: 20px;"></textarea>
                </div>
                <button type="submit" class="create-button">save</button>
            </form>
        </div>
        <div class="menu-buttons">
            <button class="menu-button" @click="clickHandler('delete note')">delete note</button>
            <button class="menu-button" @click="clickHandler('back from note')">back</button>
        </div>
    </div>
</template>

<style scoped></style>