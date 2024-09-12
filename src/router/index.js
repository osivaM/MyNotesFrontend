import { createRouter, createWebHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import HomePage from '@/views/HomePage.vue'
import AdminDashboard from '@/admin/AdminDashboard.vue'
import DashboardPage from '@/views/DashboardPage.vue'

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
        meta: { requiresAuth: true, role: 'USER' }
    },
    {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true, role: 'ADMIN' }
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
            next({ name: 'HomePage' });
        } else {
            try {
                const decodedToken = jwtDecode(token);
                const rolesName = decodedToken.roles.map(item => item.authority);
                const currentTime = Date.now() / 1000;
                
                if ((to.meta.role && !rolesName.includes(to.meta.role)) || (decodedToken.exp < currentTime)) {
                    localStorage.removeItem('token');
                    next({ name: 'HomePage' });
                } else {
                    next();
                }
            } catch (error) {
                localStorage.removeItem('token');
                next({ name: 'HomePage' });
            }
        }
    } else {
        next();
    }
});

export default router
