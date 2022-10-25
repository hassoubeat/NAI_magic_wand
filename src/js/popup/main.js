import { createApp } from 'vue';
import App from "~/js/popup/components/app.vue";
import store from "~/js/popup/store";

import "~/sass/common.scss";

var app = createApp(App);
app.use(store);
app.mount('#vue-mount-position');