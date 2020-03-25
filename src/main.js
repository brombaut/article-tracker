import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
// eslint-disable-next-line import/prefer-default-export
export const bus = new Vue();

// Vue.use(VueFire);

new Vue({
    render: (h) => h(App),
}).$mount('#app');
