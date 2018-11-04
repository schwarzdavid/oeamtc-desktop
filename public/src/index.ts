import Oeamtc from 'core/Core.vue';
import Vue from 'vue';
import './routes';
import './config';
import store from './core/store';

Promise.resolve()
    .then(() => {
        const localUser = JSON.parse(localStorage.getItem('user'));
        return store.dispatch('user/login', localUser);
    })
    .catch(err => {
        console.error('Cannot load user');
    })
    .then(() => {
        new Oeamtc().$mount('#app');
    });