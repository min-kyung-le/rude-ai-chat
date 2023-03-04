import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Movies",
    component: () => import("./pages/Movies.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
