import { createApp } from "vue";
import App from "./App.vue";

import o4s from "o4s-ui";
import "o4s-ui/style.css";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(o4s);

app.mount("#app");
