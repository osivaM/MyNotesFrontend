<script setup>
import axios from 'axios';
import { defineEmits, ref } from 'vue';

const event = ref(null);
const emit = defineEmits(['fetchedEvent']);
const userId = ref('');
const userUsername = ref('');
const userFirstName = ref('');
const userLastName = ref('');
const userPassword = ref('');
const errorMessage = ref('');

await axios({
    url: '/user-data',
    method: 'get',
    baseURL: 'http://mynotesproject.freemyip.com/api/user',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}).then(function (response) {
    const data = response.data;

    userId.value = data.id;
    userUsername.value = data.username;
    userFirstName.value = data.firstName;
    userLastName.value = data.lastName;
});

function clickHandler(item) {
    event.value = item;

    if (event.value) {
        emit('fetchedEvent', event.value);
    }
}

async function editData() {
    await axios({
        url: '/edit-user-data',
        method: 'patch',
        baseURL: 'http://mynotesproject.freemyip.com/api/user',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: {
            id: userId.value,
            username: userUsername.value,
            firstName: userFirstName.value,
            lastName: userLastName.value,
            password: userPassword.value
        }
    }).then(async function () {
        await axios({
            url: '/login',
            method: 'post',
            baseURL: 'http://mynotesproject.freemyip.com/api/authentication',
            data: {
                username: userUsername.value,
                password: userPassword.value
            }
        }).then(function(response) {
            localStorage.setItem('token', response.data.token);
        });
        userPassword.value = '';
    }).catch(function (error) {
        const response = error.response;

        if (response.status === 400) {
            errorMessage.value = response.data.message;
        }
    });
}
</script>

<template>
    <div class="edit-user-container">
        <h3 class="title">edit your data:</h3>
        <div class="menu-buttons">
            <form @submit.prevent="editData" class="edit-user-data-form">
                <div class="form-group">
                    <label for="name">name: </label>
                    <input type="text" id="name" v-model="userUsername" />
                    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
                </div>
                <div class="form-group">
                    <label for="firstName">first name: </label>
                    <input type="text" id="firstName" v-model="userFirstName" />
                </div>
                <div class="form-group">
                    <label for="lastName">last name: </label>
                    <input type="text" id="lastName" v-model="userLastName" />
                </div>
                <div class="form-group">
                    <label for="password">password: </label>
                    <input type="password" id="password" v-model="userPassword" required />
                </div>
                <button type="submit" class="save-button">save</button>
            </form>
            <button class="menu-button" @click="clickHandler('back from edit user data')">back</button>
        </div>
    </div>
</template>

<style scoped></style>