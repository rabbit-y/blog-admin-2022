import { createApp } from "vue";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";

import router from "./utils/router";
import App from "./App.vue";

import "./utils/interceptor";
import "./services";
import "~/assets/css/index.scss";

API.other.getUserInfo.request({});

const app = createApp(App);

app.use(createPinia());
app.use(ElementPlus);
app.use(router);
app.mount("#app");
