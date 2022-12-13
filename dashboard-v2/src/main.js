import { createApp } from "vue";
import App from "./App.vue";

import o4s from "@original4sure/o4s-ui";
import "@original4sure/o4s-ui/style.css";
import "./styles/style.scss";
import router from "./router";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(o4s);

app.mount("#app");
