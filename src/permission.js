import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
// import {Dictionary, RouteRecord} from "vue-router/types/router";

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/middlepage', '/api/getToken'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)
    // determine whether the user has logged in
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            next({path: '/'})
            NProgress.done()
        } else {
            const hasRoleName = store.getters.name && store.getters.name.length > 0
            if (hasRoleName) {
                next()
            } else {
                try {
                    await store.dispatch('user/getUserInfo')
                    next({...to, replace: true})
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    // Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
