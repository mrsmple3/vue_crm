import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
import components from "@/components/index";

const app = createApp(App);
components.forEach((component) => {
  app.component(component.name, component);
});

app.use(store).use(router).mount("#app");
