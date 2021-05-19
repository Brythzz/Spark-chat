import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';


//////////////////////////////////////////////////
//  PAGES
//////////////////////////////////////////////////


import App from './pages/App';
import Login from './pages/Login';
import Register from './pages/Register';


//////////////////////////////////////////////////
//  ROUTES
//////////////////////////////////////////////////


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login'},
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/:pathMatch(.*)*', redirect: '/login' }
    ]
});


//////////////////////////////////////////////////
//  MAIN
//////////////////////////////////////////////////


const app = createApp(App).use(router);

router.isReady().then(() => {
    app.mount('body');
});
