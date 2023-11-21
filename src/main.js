import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import components from "@/components/index";
import messagePlugin from "./utils/message.plugin";
import currency from "./filters/currency.filter";
import tooltipDirective from "./directives/tooltip.directives";
import "materialize-css/dist/js/materialize.min";

const app = createApp(App);
components.forEach((component) => {
  app.component(component.name, component);
});

app.config.globalProperties.$filters = { currency: currency };

app.config.globalProperties.$directives = { tooltip: tooltipDirective };
app.directive("tooltip", tooltipDirective);
store.dispatch("initAuth");
app.use(messagePlugin);
app.use(store).use(router).mount("#app");
