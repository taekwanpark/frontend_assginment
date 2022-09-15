import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';

const app = createApp(App);
library.add(faUserSecret);
library.add(faCheck);
library.add(faHourglass);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store).use(router).mount('#app');
