import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import StudentHomeView from "../views/StudentViews/StudentHomeView.vue";
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
		component: StudentHomeView,
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;