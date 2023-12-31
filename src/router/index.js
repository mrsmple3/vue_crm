import { createRouter, createWebHistory } from "vue-router";
import { auth } from "@/firebase";

const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: "main", requiresAuth: true },
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "main", requiresAuth: true },
    component: () => import("@/views/CategoriesView.vue"),
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "main", requiresAuth: true },
    component: () => import("@/views/HistoryView.vue"),
  },
  {
    path: "/detail/:id",
    name: "detail",
    meta: { layout: "main", requiresAuth: true },
    component: () => import("@/views/DetailView.vue"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "main", requiresAuth: true },
    component: () => import("@/views/PlanningView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "main", requiresAuth: true },
    component: () => import("@/views/ProfileView.vue"),
  },
  {
    path: "/record",
    name: "record",
    meta: { layout: "main", requiresAuth: true },
    component: () => import("@/views/RecordView.vue"),
  },
  {
    path: "/registrate",
    name: "registrate",
    meta: { layout: "empty" },
    component: () => import("@/views/RegistrateView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser = auth.currentUser;
  if (requiresAuth && !currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
