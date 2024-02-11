import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import StudentHomeView from "../views/StudentViews/StudentHomeView.vue";
import AdminHomeView from "../views/AdminViews/AdminHomeView.vue";

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
	},
	{
		path: "/adminHomePage",
		name: "AdminHomePage",
		component: AdminHomeView,
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;