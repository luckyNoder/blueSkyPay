import Main from "@/components/main";
import parentView from "@/components/parent-view";

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
    {
        path: "/login",
        name: "login",
        meta: {
            title: "Login - 登录",
            hideInMenu: true,
        },
        component: () => import("@/view/login/login.vue")
    },
    {
        path: "/",
        name: "_home",
        redirect: "/home",
        component: Main,
        meta: {
            hideInMenu: true,
            notCache: true
        },
        children: [
            {
                path: "/home",
                name: "home",
                meta: {
                    hideInMenu: true,
                    title: "首页",
                    notCache: true,
                    icon: "md-home"
                },
                component: () => import("@/view/home/home.vue")
            }
        ]
    },
    {
        path: "/adminList",
        name: "adminList",
        meta: {
            hideInBread: true,
            access: ['admin'],
            notCache: true,
        },
        component: Main,
        children: [
            {
                path: "adminList",
                name: "adminList",
                meta: {
                    icon: "logo-chrome",
                    title: "管理员用户",
                    notCache: true,
                    // access: ['admin']
                },
                component: () => import("@/view/adminList/adminList.vue")
            }
        ]
    },
    {
        path: "/commercialer",
        name: "commercialer",
        meta: {
            hideInBread: true,
            access: ['admin']
        },
        component: Main,
        children: [
            {
                path: "commercialer",
                name: "commercialer",
                meta: {
                    icon: "md-snow", //<Icon type="md-snow" />
                    title: "商户中心"
                },
                component: () => import("@/view/commercialer/commercialer.vue")
            }
        ]
    },
    {
        path: "/adminOrderList",
        name: "adminOrderList",
        meta: {
            hideInBread: true,
            access: ['admin']
        },
        component: Main,
        children: [
            {
                path: "adminOrderList",
                name: "adminOrderList",
                meta: {
                    icon: "md-laptop",
                    title: "所有订单列表",
                    notCache: true
                },
                component: () => import("@/view/adminOrderList/adminOrderList.vue")
            }
        ]
    },
    {
        path: "/userCenter",
        name: "userCenter",
        meta: {
            hideInBread: true,
            access: ['busniess']
        },
        component: Main,
        children: [
            {
                path: "userCenter",
                name: "userCenter",
                meta: {
                    icon: "md-person",
                    title: "个人中心"
                },
                component: () => import("@/view/userCenter/userCenter.vue")
            }
        ]
    },
    {
        path: "/equipment",
        name: "equipment",
        meta: {
            hideInBread: true,
            access: ['busniess']
        },
        component: Main,
        children: [
            {
                path: "equipment",
                name: "equipment",
                meta: {
                    icon: "md-laptop",
                    title: "设备管理"
                },
                component: () => import("@/view/equipment/equipment.vue")
            }
        ]
    },
    {
        path: "/apiDocument",
        name: "apiDocument",
        meta: {
            hideInBread: true,
            access: ['busniess']
        },
        component: Main,
        children: [
            {
                path: "apiDocument",
                name: "apiDocument",
                meta: {
                    icon: "md-copy",
                    title: "我的接口文档"
                },
                component: () => import("@/view/apiDocument/apiDocument.vue")
            }
        ]
    },
    {
        path: "/i18n",
        name: "i18n",
        meta: {
            hideInBread: true,
            access: ['admin']
        },
        component: Main,
        children: [
            {
                path: "i18n_page",
                name: "i18n_page",
                meta: {
                    icon: "md-alert",
                    title: "错误日志"
                },
                component: () => import("@/view/i18n/i18n-page.vue")
            }
        ]
    }
];
