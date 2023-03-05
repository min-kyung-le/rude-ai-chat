import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Chat",
    component: () => import("./pages/Chat.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
