<script setup>
import ListOfCategories from '../components/ListOfCategoriesComponent.vue'
import Category from '../components/CategoryComponent.vue'
import CreateCategory from '../components/CreateCategoryComponent.vue'
import Note from '../components/NoteComponent.vue'
import CreateNote from '../components/CreateNoteComponent.vue'
import EditUserData from '../components/EditUserDataComponent.vue'
import { ref } from 'vue';

const event = ref(null);
let activeComponent = ref('ListOfCategories');
let currentCategory = ref(null);

function eventHandler(select) {
    event.value = select;

    if (typeof event.value === 'string') {
        switch (event.value) {
            case 'edit user data':
                activeComponent.value = 'EditUserData';
                break;
            case 'create category':
                activeComponent.value = 'CreateCategory';
                break;
            case 'back from edit user data':
            case 'back from create category':
            case 'back from category':
                activeComponent.value = 'ListOfCategories';
                break;
            case 'back from create note':
            case 'back from note':
                event.value = currentCategory.value;
                activeComponent.value = 'Category';
                break;
            case 'create note':
                event.value = currentCategory.value;
                activeComponent.value = 'CreateNote';
                break;
        }
    } else {
        switch (event.value.type) {
            case 'category':
                currentCategory.value = event.value;
                activeComponent.value = 'Category';
                break;
            case 'note':
                activeComponent.value = 'Note';
                break;
        }
    }
}
</script>

<template>
    <div class="dashboard-container">
        <h1 class="title">dashboard</h1>
        <div class="component-container">
            <Suspense v-if="activeComponent === 'ListOfCategories'">
                <template #default>
                    <ListOfCategories @fetchedEvent="eventHandler" />
                </template>
                <template #fallback>
                    Loading...
                </template>
            </Suspense>
            <Suspense v-else-if="activeComponent === 'Category'">
                <template #default>
                    <Category v-model="event" @fetchedEvent="eventHandler" />
                </template>
                <template #fallback>
                    Loading...
                </template>
            </Suspense>
            <CreateCategory v-else-if="activeComponent === 'CreateCategory'" @fetchedEvent="eventHandler" />
            <Note v-else-if="activeComponent === 'Note'" v-model="event" @fetchedEvent="eventHandler" />
            <CreateNote v-else-if="activeComponent === 'CreateNote'" v-model="event" @fetchedEvent="eventHandler" />
            <Suspense v-else-if="activeComponent === 'EditUserData'">
                <template #default>
                    <EditUserData v-model="event" @fetchedEvent="eventHandler" />
                </template>
                <template #fallback>
                    Loading...
                </template>
            </Suspense>
            <div v-if="activeComponent === 'ListOfCategories'" class="menu-buttons">
                <button class="menu-button" @click="eventHandler('edit user data')">edit user data</button>
            </div>
            <div class="logout-button">
                <button type="button">logout</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dashboard-container {
    padding-top: 4vh;
    padding-left: 2vw;
    max-width: 400px;
}

.title {
    margin-bottom: 30px;
}
</style>