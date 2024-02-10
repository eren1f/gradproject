import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import path from "path";

const routes = [
	{
		path: "/",
		name: "Login",
		component: LoginPage,
	},
	{
		path: "/studentHomePage",
		name: "StudentHomePage",
		component: () => import("../views/StudentViews/StudentHomeView.vue"),
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;