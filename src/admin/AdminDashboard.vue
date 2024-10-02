<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router';

const users = ref();
const countUniqueUsers = ref();
const showApplyButton = ref(false);
const listOfIds = ref([]);

axios({
    url: '/users',
    baseURL: 'http://localhost:7070/api/admin',
    method: 'get',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}).then(function (response) {
    users.value = response.data;
});
axios({
    url: '/unique-users',
    baseURL: 'http://localhost:7070/api/admin',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}).then(function(response) {
    countUniqueUsers.value = response.data.count;
});

function formatDate(dateStr) {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
function deleteUser(userId) {
    const isConfirmed = confirm('Confirm the deletion of the user');

    if (isConfirmed) {
        axios({
            url: '/delete-user',
            baseURL: 'http://localhost:7070/api/admin',
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: {
                id: userId
            }
        }).then(function (response) {
            console.log('The deletion was successful');
            console.log('response staus ', response.status);
            users.value = users.value.filter(user => user.id !== userId);
        }).catch(function (error) {
            console.log('Deletion error');
            console.log('response status ', error.response.status);
        });
    }
}
function setDeletionStatus(id, status) {
    showApplyButton.value = true;
    listOfIds.value.push({ id: id, notDeletion: status });
}
function saveChanges() {
    showApplyButton.value = false;
    axios({
        url: '/set-deletion-status',
        baseURL: 'http://localhost:7070/api/admin',
        method: 'patch',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: listOfIds.value
    }).then(function() {
        listOfIds.value = [];
    });
}
function logout() {
    localStorage.removeItem('token');
    router.push('/');
}
</script>

<template>
    <div class="admin-container">
        <h1 class="title">AdminPage</h1>
        <p>Number of users: {{ users ? users.length : 0 }}</p>
        <p>Number of unique users: {{ countUniqueUsers }}</p>
        <hr />
        <div class="user-list">
            <div v-for="item in users" :key="item.id">
                <div class="user-item">
                    <span class="user-info">
                        id:{{ item.id }} {{ formatDate(item.registrationDate) }} : {{ item.username }} : {{
                            item.firstName }} {{ item.lastName }}
                    </span>
                    <button type="button" @click="deleteUser(item.id)" class="delete-button">delete</button>
                    <span style="margin-right: 10px;"> :</span>
                    <label for="not-deletion" style="flex: auto;">Not deletion</label>
                    <input type="checkbox" id="not-deletion" v-model="item.notDeletion"
                        @change="setDeletionStatus(item.id, item.notDeletion)" />
                </div>
            </div>
        </div>
        <div v-if="showApplyButton" class="apply-button">
            <button type="button" @click="saveChanges">apply</button>
        </div>
        <hr />
        <div class="logut-button-container">
            <button type="button" class="logut-button" @click="logout">logout</button>
        </div>
    </div>
</template>

<style scoped>
.user-list {
    max-height: 300px;
    overflow-y: auto;
}

.user-item {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
}

.user-info {
    margin-right: 10px;
    flex-grow: 1;
}

.delete-button {
    background-color: #a52525;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    display: inline-block;
    margin-right: 10px;
}
</style>