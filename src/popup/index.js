import Vue from 'vue';
import Popup from './popup.vue';
import '@mdi/font/css/materialdesignicons.min.css';

Vue.directive('focus', {
    inserted: function(el) {
        el.focus();
    }
});

new Vue({
    render: h => h(Popup),
}).$mount("#popup");