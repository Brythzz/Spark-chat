import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { get } from 'axios';


//////////////////////////////////////////////////
//  PAGES
//////////////////////////////////////////////////


import App from './pages/App';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import AdminPanel from './pages/AdminPanel';


//////////////////////////////////////////////////
//  ROUTES
//////////////////////////////////////////////////


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login'},
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/app', component: Chat },
        { path: '/admin', component: AdminPanel },
        { path: '/:pathMatch(.*)*', redirect: '/login' }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.path === '/app')
        get('/api/v1/user')
            .then(() => next())
            .catch(() => next({ path: '/login' }));

    else if (to.path === '/admin')
        get('/api/v1/user')
            .then(res => res.data.admin ? next() : next({ path: '/login' }))
            .catch(() => next({ path: '/login' }));

    else next();
});


//////////////////////////////////////////////////
//  MAIN
//////////////////////////////////////////////////


const app = createApp(App).use(router);

router.isReady().then(() => {
    app.mount('body');
});
