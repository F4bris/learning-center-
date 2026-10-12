import {createRouter, createWebHistory} from "vue-router";
import Home from "@/shared/presentation/views/home.vue";
import cellaringRoutes from "@/cellaring/presentation/cellaring-routes.js";

const pageNotFound = () => import("@/shared/presentation/views/page-not-found.vue")

const routes = [
    {path:'/home', name:'home', component:Home , meta:{title:'Home'}},
    {path: '/storage', name: 'storage', children: cellaringRoutes},
    {path:'/', redirect:'/home'},
    { path: '/:pathMatch(.*)*', name: 'not-found', component: pageNotFound, meta: { title: 'Page Not Found' } },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

router.beforeEach((to, from) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    document.title = `Custom Wine Cellars Manufacturers - ${to.meta['title']}`;
    return true;
});

export default router;

