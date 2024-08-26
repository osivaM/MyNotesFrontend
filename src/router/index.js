import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CategoryPage from '@/views/CategoryPage.vue'
import AdminDashboard from '@/admin/AdminDashboard.vue'
import DashboardPage from '@/views/DashboardPage.vue'
import NotePage from '@/views/NotePage.vue'

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardPage
    },
    {
        path: '/category',
        name: 'Category',
        component: CategoryPage
    },
    {
        path: '/note',
        name: 'Note',
        component: NotePage
    },
    {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
