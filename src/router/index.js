import {h, resolveComponent} from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import store from '../store'
import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: DefaultLayout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                meta: {
                    requiresAuth: true,
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
            },
            {
                path: 'login',
                name: 'Login',
                meta: {
                    title: 'login',
                    requiresAuth: false,
                },
                component: () => import('@/views/auth/Login.vue'),
            },
            {
                path: 'users',
                name: 'Users',
                component: () => import('@/views/users/Users.vue'),
            },
            {
                path: 'live',
                name: 'Live',
                component: () => import('@/views/core/pages/Demo.vue'),
            },
            {
                path: 'sites',
                name: 'Sites',
                component: () => import('@/views/sites/ManageSites'),
            },
            {
                path: 'reports',
                name: 'Reports',
                component: {
                    render() {
                        return h(resolveComponent('router-view'))
                    },
                },
                redirect: '/reports/traffic',
                children: [
                    {
                        path: '/reports/traffic',
                        name: 'Traffic',
                        component: () => import('@/views/reports/Traffic.vue'),
                    },
                    {
                        path: '/reports/violations',
                        name: 'violations',
                        component: () => import('@/views/core/pages/Demo.vue'),
                    },
                ],
            },
            {
                path: '/theme/colors',
                name: 'Colors',
                component: () => import('@/views/core/theme/Colors.vue'),
            },
            {
                path: '/theme/typography',
                name: 'Typography',
                component: () => import('@/views/core/theme/Typography.vue'),
            },
            {
                path: '/base',
                name: 'Base',
                component: {
                    render() {
                        return h(resolveComponent('router-view'))
                    },
                },
                redirect: '/base/breadcrumbs',
                children: [
                    {
                        path: '/base/accordion',
                        name: 'Accordion',
                        component: () => import('@/views/core/base/Accordion.vue'),
                    },
                    {
                        path: '/base/breadcrumbs',
                        name: 'Breadcrumbs',
                        component: () => import('@/views/core/base/Breadcrumbs.vue'),
                    },
                    {
                        path: '/base/cards',
                        name: 'Cards',
                        component: () => import('@/views/core/base/Cards.vue'),
                    },
                    {
                        path: '/base/carousels',
                        name: 'Carousels',
                        component: () => import('@/views/core/base/Carousels.vue'),
                    },
                    {
                        path: '/base/collapses',
                        name: 'Collapses',
                        component: () => import('@/views/core/base/Collapses.vue'),
                    },
                    {
                        path: '/base/list-groups',
                        name: 'List Groups',
                        component: () => import('@/views/core/base/ListGroups.vue'),
                    },
                    {
                        path: '/base/navs',
                        name: 'Navs',
                        component: () => import('@/views/core/base/Navs.vue'),
                    },
                    {
                        path: '/base/paginations',
                        name: 'Paginations',
                        component: () => import('@/views/core/base/Paginations.vue'),
                    },
                    {
                        path: '/base/placeholders',
                        name: 'Placeholders',
                        component: () => import('@/views/core/base/Placeholders.vue'),
                    },
                    {
                        path: '/base/popovers',
                        name: 'Popovers',
                        component: () => import('@/views/core/base/Popovers.vue'),
                    },
                    {
                        path: '/base/progress',
                        name: 'Progress',
                        component: () => import('@/views/core/base/Progress.vue'),
                    },
                    {
                        path: '/base/spinners',
                        name: 'Spinners',
                        component: () => import('@/views/core/base/Spinners.vue'),
                    },
                    {
                        path: '/base/tables',
                        name: 'Tables',
                        component: () => import('@/views/core/base/Tables.vue'),
                    },
                    {
                        path: '/base/tooltips',
                        name: 'Tooltips',
                        component: () => import('@/views/core/base/Tooltips.vue'),
                    },
                ],
            },
            {
                path: '/buttons',
                name: 'Buttons',
                component: {
                    render() {
                        return h(resolveComponent('router-view'))
                    },
                },
                redirect: '/buttons/standard-buttons',
                children: [
                    {
                        path: '/buttons/standard-buttons',
                        name: 'Buttons',
                        component: () => import('@/views/core/buttons/Buttons.vue'),
                    },
                    {
                        path: '/buttons/dropdowns',
                        name: 'Dropdowns',
                        component: () => import('@/views/core/buttons/Dropdowns.vue'),
                    },
                    {
                        path: '/buttons/button-groups',
                        name: 'Button Groups',
                        component: () => import('@/views/core/buttons/ButtonGroups.vue'),
                    },
                ],
            },
            {
                path: '/forms',
                name: 'Forms',
                component: {
                    render() {
                        return h(resolveComponent('router-view'))
                    },
                },
                redirect: '/forms/form-control',
                children: [
                    {
                        path: '/forms/form-control',
                        name: 'Form Control',
                        component: () => import('@/views/core/forms/FormControl.vue'),
                    },
                    {
                        path: '/forms/select',
                        name: 'Select',
                        component: () => import('@/views/core/forms/Select.vue'),
                    },
                    {
                        path: '/forms/checks-radios',
                        name: 'Checks & Radios',
                        component: () => import('@/views/core/forms/ChecksRadios.vue'),
                    },
                    {
                        path: '/forms/range',
                        name: 'Range',
                        component: () => import('@/views/core/forms/Range.vue'),
                    },
                    {
                        path: '/forms/input-group',
                        name: 'Input Group',
                        component: () => import('@/views/core/forms/InputGroup.vue'),
                    },
                    {
                        path: '/forms/floating-labels',
                        name: 'Floating Labels',
                        component: () => import('@/views/core/forms/FloatingLabels.vue'),
                    },
                    {
                        path: '/forms/layout',
                        name: 'Layout',
                        component: () => import('@/views/core/forms/Layout.vue'),
                    },
                    {
                        path: '/forms/validation',
                        name: 'Validation',
                        component: () => import('@/views/core/forms/Validation.vue'),
                    },
                ],
            },
            {
                path: '/charts',
                name: 'Charts',
                component: () => import('@/views/core/charts/Charts.vue'),
            },
            {
                path: '/icons',
                name: 'Icons',
                component: {
                    render() {
                        return h(resolveComponent('router-view'))
                    },
                },
                redirect: '/icons/coreui-icons',
                children: [
                    {
                        path: '/icons/coreui-icons',
                        name: 'CoreUI Icons',
                        component: () => import('@/views/core/icons/CoreUIIcons.vue'),
                    },
                    {
                        path: '/icons/brands',
                        name: 'Brands',
                        component: () => import('@/views/core/icons/Brands.vue'),
                    },
                    {
                        path: '/icons/flags',
                        name: 'Flags',
                        component: () => import('@/views/core/icons/Flags.vue'),
                    },
                ],
            },
            {
                path: '/notifications',
                name: 'Notifications',
                component: {
                    render() {
                        return h(resolveComponent('router-view'))
                    },
                },
                redirect: '/notifications/alerts',
                children: [
                    {
                        path: '/notifications/alerts',
                        name: 'Alerts',
                        component: () => import('@/views/core/notifications/Alerts.vue'),
                    },
                    {
                        path: '/notifications/badges',
                        name: 'Badges',
                        component: () => import('@/views/core/notifications/Badges.vue'),
                    },
                    {
                        path: '/notifications/modals',
                        name: 'Modals',
                        component: () => import('@/views/core/notifications/Modals.vue'),
                    },
                ],
            },
            {
                path: '/widgets',
                name: 'Widgets',
                component: () => import('@/views/widgets/Widgets.vue'),
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Page404',
        component: () => import('@/views/core/pages/Page404.vue'),
    },
    {
        path: '/pages',
        redirect: '/pages/500',
        name: 'Pages',
        component: {
            render() {
                return h(resolveComponent('router-view'))
            },
        },
        children: [
            {
                path: '500',
                name: 'Page500',
                component: () => import('@/views/core/pages/Page500'),
            },
            {
                path: 'register',
                name: 'Register',
                component: () => import('@/views/auth/Register'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
    scrollBehavior() {
        // always scroll to top
        return {top: 0}
    },
})

router.beforeEach((to, from, next) => {
    let auth_not_required = to.hasOwnProperty('meta') && to.meta.requiresAuth == false;
    // console.log(auth_not_required ? 'auth is not required for' : 'auth is required for', to.href)

    const DEFAULT_TITLE = 'Genius-Eye';
    const nearestWithTitle = to.hasOwnProperty('meta') && to.meta.hasOwnProperty('title') ? to.meta.title : to.name;
    document.title = (nearestWithTitle) ? nearestWithTitle + ' | ' + DEFAULT_TITLE : DEFAULT_TITLE;

    if (store.getters.isLoggedIn && to.path === '/login') {
        next('/')
        return;
    }

    if (auth_not_required) {
        next()
    } else {
        if (store.getters['auth/isAuthenticated']) {
            next()
            return;
        }
        next('/login')
    }
})

export default router
