import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/middlepage',
        component: () => import('@/views/middlepage/index'),
        hidden: true
    },

    // {
    //     path: '/',
    //     component: Layout,
    //     redirect: '/dashboard',
    // },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: {title: '主页', icon: 'dashboard', affix: true}
        }]
    },
    {
        path: '/dataStructure',
        component: Layout,
        redirect: '/dataStructure/autoCreateAccount',
        meta: {
            title: '数据构造',
            icon: 'form',
        },
        children: [
            {
                path: 'index',
                name: 'CreateAccount',
                component: () => import('@/views/dataStructure/index'),
                meta: {title: '自动建号', icon: 'form'}
            },
            {
                path: 'fcashOrder',
                name: 'FcashOrder',
                component: () => import('@/views/dataStructure/fcashOrder/index'),
                meta: {title: '创建海外金融订单', icon: 'form'}
            }
        ]
    },
    {
        path: '/qualityStat',
        component: Layout,
        redirect: '/qualityStat',
        children: [
            {
                path: 'index',
                name: 'QualityStat',
                component: () => import('@/views/qualityStat/index'),
                meta: {title: '质量统计', icon: 'eye'}
            }
        ]
    },
    {
        path: '/testTools',
        component: Layout,
        redirect: '/testTools',
        alwaysShow: true, // will always show the root menu
        name: 'testTool',
        meta: {
            title: '测试工具集',
            icon: 'el-icon-s-tools',
        },
        children: [
            {
                path: 'channelTools',
                component: () => import('@/views/testTools/channelSet/index'),
                name: 'ChannelSet',
                meta: {
                    title: '渠道配置'
                }
            },
            {
                path: 'dataCreate',
                component: () => import('@/views/testTools/dataCreate/index'),
                name: 'dataCreate',
                meta: {
                    title: '批量造数据工具'
                }
            },
            {
                path: 'checkTranslate',
                component: () => import('@/views/testTools/checkTranslate/index'),
                name: 'checkTranslate',
                meta: {
                    title: '翻译检测'
                }
            },
            {
                path: 'filterLog',
                component: () => import('@/views/testTools/filterLog/index'),
                name: 'filterLog',
                meta: {
                    title: '日志过滤'
                }
            },
            {
                path: 'rankData',
                component: () => import('@/views/testTools/rankData/index'),
                name: 'rankData',
                meta: {
                    title: '海外榜单活动修改'
                }
            },

            {
                path: 'trackTest',
                component: () => import('@/views/testTools/trackTest/index'),
                name: 'trackTest',
                meta: {
                    title: '埋点测试工具'
                }
            },

            {
                path: 'tgTool',
                component: () => import('@/views/testTools/tgTool/index'),
                name: 'tgTool',
                meta: {
                    title: '推广测试场景自动化'
                }
            },
            {
                path: 'chatroomScript',
                component: () => import('@/views/testTools/chatroomScript/index'),
                name: 'chatroomScript',
                meta: {
                    title: '聊天室脚本'
                }
            },
            {
                path: 'propCard',
                component: () => import('@/views/testTools/propCard/index'),
                name: 'propCard',
                meta: {
                    title: '海外道具卡'
                }
            },
            {
                path: 'createData',
                component: () => import('@/views/testTools/createData/index'),
                name: 'createData',
                meta: {
                    title: '数据场景构造'
                }
            },
            {
                path: 'fkCommonData',
                component: () => import('@/views/testTools/fkCommonData/index'),
                name: 'fkCommonData',
                meta: {
                    title: '通用造数据场景'
                }
            },
            {
                path: 'simulaterPay',
                component: () => import('@/views/testTools/simulatedPayment/index'),
                name: 'simulaterPay',
                meta: {
                    title: '模拟支付工具'
                }
            },
            {
                path: 'tgDataDiff',
                component: () => import('@/views/testTools/tgDataDiff/index'),
                name: 'tgDataDiff',
                meta: {
                    title: '推广数据diff工具'
                }
            },
            {
                path: 'hwTool',
                component:() => import('@/views/testTools/hwTool/index'),
                name: 'hwTool',
                meta:{
                    title: '海外小工具'
                }
            },
        ]
    },
    {
        path: '/toolStat',
        component: Layout,
        redirect: '/toolStat',
        children: [
            {
                path: 'index',
                name: 'ToolStat',
                component: () => import('@/views/toolStat/index'),
                meta: {title: '工具统计', icon: 'el-icon-tickets'}
            }
        ]
    },
    {
        path: '/testData',
        component: Layout,
        redirect: '/testData',
        alwaysShow: true, // will always show the root menu
        name: 'testData',
        meta: {
            title: '迭代数据',
            icon: 'el-icon-document',
        },
        children: [
            {
                path: 'reviewResult',
                component: () => import('@/views/testData/reviewResult/index'),
                name: 'reviewResult',
                meta: {
                    title: '用例评审报告'
                }
            },
            {
                path: 'getCase',
                component: () => import('@/views/testData/getCase/index'),
                name: 'getCase',
                meta: {
                    title: '用例数据查询'
                }
            }
        ]
    },
    {
        path: '/accurateTest',
        component: Layout,
        redirect: '/accurateTest',
        alwaysShow: true, // will always show the root menu
        name: 'accurateTest',
        meta: {
            title: '精准测试',
            icon: 'el-icon-search',
        },
        children: [
            {
                path: 'codeDiff',
                component: () => import('@/views/accurateTest/codeDiff/index'),
                name: 'codeDiff',
                meta: {
                    title: '代码比对'
                }
            },
            {
                path: 'accurateReport',
                component: () => import('@/views/accurateTest/accurateReport/index'),
                name: 'accurateReport',
                meta: {
                    title: '精准测试报告'
                }
            },
        ]
    },
    {
        path: '/BDEventTrackingTool',
        component: Layout,
        redirect: '/BDEventTrackingTool',
        alwaysShow: true, // will always show the root menu
        name: 'BDEventTrackingTool',
        meta: {
            title: '大数据巡检工具',
            icon: 'el-icon-monitor',
        },
        children: [
            {
                path: 'eventTrackingAssert',
                component: () => import('@/views/BDEventTrackingTool/eventTrackingAssert/index'),
                name: 'eventTrackingAssert',
                meta: {
                    title: '埋点数据校验'
                }
            },
            {
                path: 'dataAssertAll',
                component: () => import('@/views/BDEventTrackingTool/dataAssertAll/index'),
                name: 'dataAssertAll',
                meta: {
                    title: '大数据质量巡检工具'
                }
            }
        ]
    },
    {
        path: '/performanceTest',
        component: Layout,
        redirect: '/performanceTest',
        alwaysShow: true, // will always show the root menu
        name: 'PerformanceTest',
        meta: {
            title: '压测工具',
            icon: 'el-icon-odometer',
        },
        children: [
            {
                path: 'scriptManage',
                component: () => import('@/views/performanceTest/scriptManage/index'),
                name: 'scriptManage',
                meta: {
                    title: '脚本管理'
                }
            },
            {
                path: 'testRecord',
                component: () => import('@/views/performanceTest/testRecord/index'),
                name: 'testRecord',
                meta: {
                    title: '测试执行记录'
                }
            },
            {
                path: 'viewReport',
                component: () => import('@/views/performanceTest/viewReport'),
                name: 'ViewReport',
                meta: {title: 'ViewReport', noCache: true, activeMenu: '/performanceTest/testRecord'},
                hidden: true
            },
        ]
    },
    {
        path: '/automate',
        component: Layout,
        redirect: '/automate',
        alwaysShow: true, // will always show the root menu
        name: 'Automate',
        meta: {
            title: '自动化',
            icon: 'el-icon-odometer',
        },
        children: [
            {
                path: 'apiAutomateReport',
                component: () => import('@/views/automate/apiAutomateReport/index'),
                name: 'apiAutomateReport',
                meta: {
                    title: '接口自动化报告'
                }
            }
        ]
    }
]

const createRouter = () => new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
