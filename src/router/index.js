import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/profile',
            name: 'profile',
            component: () =>
                import ('../views/Profile.vue')
        },
        {
            path: '/table',
            name: 'table',
            component: () =>
                import ('../components/Tables.vue')
        },
        {
            path: '/role',
            name: 'role',
            component: () =>
                import ('../components/Role.vue')
        },
        {
            path: '/user',
            name: 'user',
            component: () =>
                import ('../components/User.vue')
        },
        {
            path: '/task',
            name: 'task',
            component: () =>
                import ('../components/Task.vue')
        },
        {
            path: '/note',
            name: 'note',
            component: () =>
                import ('../components/Note.vue')
        },
        {
            path: '/bug',
            name: 'bug',
            component: () =>
                import ('../components/Bug.vue')
        },
        {
            path: '/testcase',
            name: 'testcase',
            component: () =>
                import ('../components/TestCase.vue')
        },
        {
            path: '/release',
            name: 'release',
            component: () =>
                import ('../components/Release.vue')
        },
        {
            path: '/userrole',
            name: 'userRole',
            component: () =>
                import ('../components/UserRole.vue')
        },
        {
            path: '/release',
            name: 'release',
            component: () =>
                import ('../components/Release.vue')
        },
        {
            path: '/release',
            name: 'release',
            component: () =>
                import ('../components/Release.vue')
        },
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;