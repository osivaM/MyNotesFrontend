import { createRouter, createWebHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
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
        component: DashboardPage,
        meta: {requiresAuth: true, role: 'USER'}
    },
    {
        path: '/category',
        name: 'Category',
        component: CategoryPage,
        meta: {requiresAuth: true, role: 'USER'}
    },
    {
        path: '/note',
        name: 'Note',
        component: NotePage,
        meta: {requiresAuth: true, role: 'USER'}
    },
    {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: {requiresAuth: true, role: 'ADMIN'}
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next({name: 'HomePage'});
        } else {
            const decodedToken = jwtDecode(token);
            const rolesName = decodedToken.roles.map(item => item.authority);

            if (to.meta.role && !rolesName.includes(to.meta.role)) {
                next({name: 'HomePage'});
            } else {
                next();
            }
        }
    } else {
        next();
    }
});

export default router
