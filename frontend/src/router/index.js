import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import CodyView from "../views/CodyView.vue";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import FindCreView from "../views/FindCreView.vue";
import EditinfView from "../views/EditinfView.vue";
import DeleteView from "../views/DeleteView.vue";
import MeminfView from "../views/MeminfView.vue";
import InformationView from "@/views/InformationView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/cody",
    name: "cody",
    component: CodyView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
  },
  {
    path: "/findCredentials",
    name: "findCredentials",
    component: FindCreView,
  },
  {
    path: "/updateProfile",
    name: "updateProfile",
    component: EditinfView,
  },
  {
    path: "/deleteProfile",
    name: "deleteProfile",
    component: DeleteView,
  },
  {
    path: "/Memin",
    name: "Memin",
    component: MeminfView,
  },
  {
    path: "/Information",
    name: "Information",
    component: InformationView,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;