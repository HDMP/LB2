import { createRouter, createWebHistory } from "vue-router";
import Auth from "../src/pages/Auth.vue";
import Dashboard from "../src/pages/Dashboard.vue";

const routes = [
  {
    path: "/",
    redirect: "/auth", // Redirect root path to auth
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard for Protected Routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem("token"); // Check if token exists
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/auth"); // Redirect to auth if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router;
