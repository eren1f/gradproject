import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import StudentHomeView from "../views/StudentViews/StudentHomeView.vue";
import AdminHomeView from "../views/AdminViews/AdminHomeView.vue";
import TeachingStaffHomeView from "../views/TeachingStaffViews/TeachingStaffHomeView.vue";
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
	},
	{
		path: "/adminHomePage",
		name: "AdminHomePage",
		component: AdminHomeView,
	},
	{
		path: "/teachingStaffHomePage",
		name: "TeachingStaffHomePage",
		component: TeachingStaffHomeView,
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;