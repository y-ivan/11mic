
import Vue from "vue"
import Router from "vue-router"
import storage from "good-storage"
import store from "../store"

Vue.use(Router)

const SignIn = resolve =>
    import("../pages/sign/sign-in").then(module => resolve(module))

const SignUp = resolve =>
    import("../pages/sign/sign-up").then(module => resolve(module))

const SignUpCompany = resolve =>
    import("../pages/sign/sign-up-company").then(module => resolve(module))

const Message = resolve =>
    import("../pages/message").then(module => resolve(module))

const MessageSearch = resolve =>
    import("../pages/message/search").then(module => resolve(module))

const Email = resolve =>
    import("../pages/message/email").then(module => resolve(module))

const MailList = resolve =>
    import("../pages/mail/index.vue").then(module => resolve(module))

const MailSign = resolve =>
    import("../pages/mail/sign-in").then(module => resolve(module))

const Manage = resolve =>
    import("../pages/manage").then(module => resolve(module))

const Chat = resolve =>
    import("../pages/chat").then(module => resolve(module))

const ChatEmail = resolve =>
    import("../pages/chat/email").then(module => resolve(module))

const Notify = resolve =>
    import("../pages/notify").then(module => resolve(module))

const Contact = resolve =>
    import("../pages/contact").then(module => resolve(module))

const ContactDetail = resolve =>
    import("../pages/contact/detail").then(module => resolve(module))

const Mine = resolve =>
    import("../pages/mine").then(module => resolve(module))

const Company = resolve =>
    import("../pages/mine/company-list").then(module => resolve(module))

const CompanyInvite = resolve =>
    import("../pages/mine/company-invite").then(module => resolve(module))

const CompanyJoin = resolve =>
    import("../pages/mine/company-join").then(module => resolve(module))

const Avatar = resolve =>
    import("../pages/mine/avatar").then(module => resolve(module))

const MineField = resolve =>
    import("../pages/mine/field").then(module => resolve(module))

const Setting = resolve =>
    import("../pages/mine/setting").then(module => resolve(module))

const Profile = resolve =>
    import("../pages/mine/profile").then(module => resolve(module))

const Contract = resolve =>
    import("../pages/contract").then(module => resolve(module))

const ContractCreate = resolve =>
    import("../pages/contract/create").then(module => resolve(module))

const ContractDetail = resolve =>
    import("../pages/contract/detail").then(module => resolve(module))

const WorkPlace = resolve =>
    import("../pages/work-place").then(module => resolve(module))

const router = new Router({
    // mode: "history",
    linkActiveClass: "avtive",
    routes: [{
        path: "/",
        redirect: "/sign-in"
    }, {
        path: "/message",
        name: "message",
        component: Message,
        meta: {
            keepAlive: true,
            requireAuth: true
        },
        children: [{
            path: "/message/search",
            name: "message-search",
            component: MessageSearch,
            meta: {
                keepAlive: true,
                requireAuth: true
            }
        }]
    }, {
        path: "/email",
        name: "email",
        component: Email,
        meta: {
            keepAlive: false,
            requireAuth: true
        }
    }, {
        path: "/mail-list",
        name: "mail-list",
        component: MailList,
        meta: {
            keepAlive: false,
            requireAuth: true
        }
    }, {
        path: "/mail-sign/:type",
        name: "mail-sign",
        component: MailSign,
        meta: {
            keepAlive: false,
            requireAuth: true
        }
    }, {
        path: "/chat/:id",
        name: "chat",
        component: Chat,
        meta: {
            keepAlive: true,
            requireAuth: true
        }
    }, {
        path: "/email/:id",
        name: "chat-email",
        component: ChatEmail,
        meta: {
            keepAlive: true,
            requireAuth: true
        }
    }, {
        path: "/manage",
        name: "manage",
        component: Manage,
        meta: {
            keepAlive: true,
            requireAuth: true
        }
    }, {
        path: "/work-place",
        name: "work-place",
        component: WorkPlace,
        meta: {
            keepAlive: true,
            requireAuth: true
        }
    },

    // 联系人
    {
        path: "/contact/:type",
        name: "contact",
        component: Contact,
        meta: {
            keepAlive: true,
            requireAuth: true
        }
    }, {
        path: "/contact/:type/:id",
        name: "contact-detail",
        component: ContactDetail,
        meta: {
            keepAlive: false,
            requireAuth: true
        }
    }, {
        path: "/contract",
        name: "contract",
        component: Contract,
        meta: {
            keepAlive: false,
            requireAuth: true
        }
    }, {
        path: "/contract/create",
        name: "contract-create",
        component: ContractCreate,
        meta: {
            keepAlive: false,
            requireAuth: true
        }
    }, {
        path: "/contract/detail/:id",
        name: "contract-detail",
        component: ContractDetail,
        meta: {
            keepAlive: false,
            requireAuth: true
        }
    }, {
        path: "/notify/:id",
        name: "notify",
        component: Notify,
        meta: {
            keepAlive: true,
            requireAuth: true
        }
    }, {
        path: "/mine",
        name: "mine",
        component: Mine,
        meta: {
            requireAuth: true
        }
    }, {
        path: "/mine/avatar",
        name: "mine-avatar",
        component: Avatar,
        meta: {
            requireAuth: true
        }
    }, {
        path: "/mine/field/:key",
        name: "mine-field",
        component: MineField,
        meta: {
            requireAuth: true
        }
    }, {
        path: "/mine/profile",
        name: "profile",
        component: Profile,
        meta: {
            requireAuth: true
        }
    }, {
        path: "/mine/company",
        name: "company",
        component: Company,
        meta: {
            requireAuth: true
        }
    }, {
        path: "/mine/company-invite",
        name: "company-invite",
        component: CompanyInvite,
        meta: {
            requireAuth: true
        }
    }, {
        path: "/mine/company-join",
        name: "company-join",
        component: CompanyJoin,
        meta: {
            requireAuth: true
        }
    }, {
        path: "/setting",
        name: "setting",
        component: Setting
    }, {
        path: "/sign-in",
        name: "sign-in",
        component: SignIn
    }, {
        path: "/sign-up",
        name: "sign-up",
        component: SignUp
    }, {
        path: "/sign-up-company",
        name: "sign-up-company",
        component: SignUpCompany
    }]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {
        // 如果是 需要登录的 判断是否有登录权限 是否过期
        const nowTime = new Date().getTime()
        const token = storage.get("api_token")
        const lifeTime = storage.get("lifetime")

        if (token && lifeTime && nowTime < lifeTime) {
            // 页面跳转
            next()
        } else {
            router.replace({
                name: "sign-in",
                query: { redirect: to.fullPath } // 登陆成功跳转 到 目标页面
            })
        }
    } else next()
})

router.afterEach(to => {
    // 隐藏 indicator
    store.commit("Indicator/toggleIndicator", { show: false })
})

export default router
