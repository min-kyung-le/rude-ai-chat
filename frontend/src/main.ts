import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
import axios from "axios";

loadFonts();

const app = createApp(App);
app.use(router).use(vuetify).mount("#app");

app.config.globalProperties.$http = axios;
