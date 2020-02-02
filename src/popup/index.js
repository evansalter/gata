import Vue from 'vue';
import Popup from './popup.vue';
import '@mdi/font/css/materialdesignicons.min.css';

new Vue({
    render: h => h(Popup),
}).$mount("#popup");
